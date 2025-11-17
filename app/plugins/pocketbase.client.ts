// plugins/pocketbase.client.ts
import PocketBase from "pocketbase";

export default defineNuxtPlugin(() => {
  // 用你能在浏览器访问的地址（用 IP 而不是 0.0.0.0）
  const pb = new PocketBase("http://localhost:8090");

  // 把实例注入 Nuxt
  return {
    provide: {
      pb
    }
  };
});
