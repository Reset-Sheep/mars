<template>
  <el-dialog
    v-bind="$attrs"
    class="login"
    width="660"
    align-center
    destroy-on-close
    :show-close="false"
  >
    <div class="flex w-[85%] h-full items-center pl-[50px] pt-[30px]">
      <el-tabs v-model="activeName" class="demo-tabs w-[77%]">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" label-width="auto">
            <el-form-item label="邮箱">
              <el-input v-model="loginForm.email" class="h-[5vh]" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="loginForm.password"
                class="h-[5vh]"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <div class="flex justify-center w-full">
                <ShimmerButton
                  class="shadow-2xl"
                  shimmer-size="2px"
                  background="#3d7af9"
                  @click="handleLogin"
                >
                  <span
                    style="font-family: 'zhengkuBold'"
                    class="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg dark:from-white dark:to-slate-900/10"
                  >
                    立即登录
                  </span>
                </ShimmerButton>
              </div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">
          <el-form :model="loginForm" label-width="auto">
            <el-form-item label="邮箱">
              <el-input v-model="loginForm.email" class="h-[5vh]" />
            </el-form-item>
            <el-form-item label="密码">
              <el-input
                v-model="loginForm.password"
                class="h-[5vh]"
                show-password
              />
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input
                v-model="loginForm.password"
                class="h-[5vh]"
                show-password
              />
            </el-form-item>
            <el-form-item>
              <div class="flex justify-center w-full">
                <ShimmerButton
                  class="shadow-2xl"
                  shimmer-size="2px"
                  background="#3d7af9"
                  @click="handleRegister"
                >
                  <span
                    style="font-family: 'zhengkuBold'"
                    class="whitespace-pre-wrap text-center text-sm font-medium leading-none tracking-tight text-white lg:text-lg dark:from-white dark:to-slate-900/10"
                  >
                    注册并登录
                  </span>
                </ShimmerButton>
              </div>
            </el-form-item>
          </el-form>
          <div class="mt-[30px] ml-[45px]">
            亲耐滴黑煤球们：
            <ul>
              <!-- <li>请授予网站地理位置权限，以便提供附近煤球功能；</li> -->
              <li>为保证黑煤球们的信息安全，网站不会强制收集任何用户信息；</li>
              <li>相信各位黑煤球们不会恶意注册吧~</li>
              <li>
                注册后将获得闪卡一张哦~
                <span class="text-[#3d7af9] cursor-pointer" @click="card = true"
                  >查看闪卡样式</span
                >
              </li>
            </ul>
          </div>
        </el-tab-pane>
      </el-tabs>
      <!-- <div
        style="font-family: 'zhengkuHeavy'"
        class="text-[50px] text-[#3d7af9]"
      >
        登录
      </div> -->
    </div>
    <el-dialog
      v-model="card"
      width="300"
      align-center
      destroy-on-close
      :show-close="false"
    >
      <div class="text-[#fff] text-[20px]" style="font-family: 'zhengkuMedium'">
        悬浮有惊喜
      </div>
      <div class="flex items-center justify-center">
        <GlareCard class="flex flex-col items-center justify-center">
          <img src="../../assets/img/card/1.png" />
        </GlareCard>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import ShimmerButton from "~/components/Button/ShimmerButton.vue";
import Avatar from "~/assets/img/Snipaste_2025-11-17_09-54-03.png";
const { $pb } = useNuxtApp();

const handleRegister = async () => {
  try {
    const user = await $pb.collection("users").create({
      name: "test22",
      email: "323232@qq.com",
      password: "12345678",
      passwordConfirm: "12345678",
    });
    console.log("注册成功：", JSON.stringify(user));
  } catch (err) {
    console.error("注册失败：", err);
  }
};

// const dialogVisible = ref(false);
const card = ref(false);
const activeName = ref("login");

const loginForm = ref({
  email: "",
  password: "",
});

const handleLogin = async () => {
  try {
    console.log("👉 handleLogin start");
    console.log("loginForm.value:", loginForm.value);

    const identity = loginForm.value.email;
    const password = loginForm.value.password;

    console.log("准备登录 identity=", identity, " password=", password);

    const user = await $pb
      .collection("users")
      .authWithPassword(identity, password);

    console.log("登录成功：", user);
  } catch (err) {
    console.error("登录报错：", err);
  }
};



</script>

<style lang="scss">
.login {
  background-image: url("../../assets/img/loginbg.png");
  background-size: cover;
  &.el-dialog {
    --el-bg-color: transparent;
    --el-box-shadow: none;
    height: 700px;
  }
  .el-tabs__active-bar {
    display: none;
  }
  .el-tabs__nav-wrap:after {
    display: none;
  }
  .el-tabs__item {
    font-family: "zhengkuHeavy";
    font-size: 30px;
    color: #575757;
    &.is-active {
      font-family: "zhengkuHeavy";
      font-size: 50px;
      color: #3d7af9;
    }
  }
  .el-tabs__content {
    // padding-top: 30px;
    display: flex;
    justify-items: center;
    align-items: center;
    height: 50vh;
    .el-tab-pane {
      width: 100%;
    }
  }
  .el-form-item__label-wrap {
    margin: auto;
    label {
      font-size: 20px;
      color: #fff;
      font-family: "zhengkuHeavy";
    }
  }
  .el-input__wrapper {
    input {
      font-size: 18px;
      font-family: "zhengkuMedium";
    }
  }
}
</style>