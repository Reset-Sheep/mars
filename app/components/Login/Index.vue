<template>
  <el-dialog v-bind="$attrs" class="login" width="660" align-center destroy-on-close :show-close="false">
    <div class="flex w-[85%] h-full items-center pl-[50px] pt-[30px]">
      <el-tabs v-model="activeName" class="demo-tabs w-[77%]">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" label-width="auto">
            <el-form-item label="用户名">
              <el-input v-model="loginForm.userName" class="h-[5vh]" />
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
            <el-form-item label="用户名">
              <el-input v-model="loginForm.userName" class="h-[5vh]" />
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
        </el-tab-pane>
      </el-tabs>
      <!-- <div
        style="font-family: 'zhengkuHeavy'"
        class="text-[50px] text-[#3d7af9]"
      >
        登录
      </div> -->
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import ShimmerButton from "~/components/Button/ShimmerButton.vue";
// const dialogVisible = ref(false);

const activeName = ref("login");

const loginForm = ref({
  userName: "",
  password: "",
});
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
    height: 40vh;
    .el-tab-pane{
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