import PocketBase from "pocketbase";

export default defineNuxtPlugin((nuxtApp) => {
  const pb = new PocketBase("http://localhost:8090");

  // 恢复本地 token
  const token = localStorage.getItem("pb_token");
  const model = localStorage.getItem("pb_model");

  if (token && model) {
    pb.authStore.save(token, JSON.parse(model));
  }

  // 保存 token
  pb.authStore.onChange(() => {
    localStorage.setItem("pb_token", pb.authStore.token);
    localStorage.setItem("pb_model", JSON.stringify(pb.authStore.model));
  });

  /**
   * -------------------------------
   * 全局请求拦截器（覆盖 $fetch）
   * -------------------------------
   */
  const originalFetch = globalThis.$fetch;

  globalThis.$fetch = async (request, options = {}) => {
    // 自动带上 PocketBase Token
    if (pb.authStore.token) {
      options.headers = {
        ...(options.headers || {}),
        Authorization: pb.authStore.token,
      };
    }

    try {
      return await originalFetch(request, options);
    } catch (err) {
      // token 过期 → 刷新
      if (err?.status === 401) {
        try {
          console.warn("🔄 token 过期，尝试刷新...");

          await pb.collection("users").authRefresh();

          // 刷新成功 → 保存新 token
          localStorage.setItem("pb_token", pb.authStore.token);
          localStorage.setItem("pb_model", JSON.stringify(pb.authStore.model));

          // 用新的 token 重试请求
          options.headers = {
            ...(options.headers || {}),
            Authorization: pb.authStore.token,
          };

          return await originalFetch(request, options);
        } catch (refreshErr) {
          console.warn("❌ 刷新 token 失败，自动登出");

          pb.authStore.clear();
          localStorage.removeItem("pb_token");
          localStorage.removeItem("pb_model");

          throw refreshErr;
        }
      }

      throw err;
    }
  };

  return {
    provide: {
      pb,
    },
  };
});
