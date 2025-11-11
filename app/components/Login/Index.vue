<template>
  <el-dialog v-bind="$attrs" class="login" width="650">
    <div class="flex w-[85%] h-full items-center pl-[50px] pt-[30px]">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="登录" name="login">
          <el-form :model="loginForm" label-width="auto" style="max-width: 600px">
            <el-form-item label="用户名">
              <el-input v-model="loginForm.userName" />
            </el-form-item>
            <el-form-item label="密码">
              <el-select
                v-model="loginForm.password"
                placeholder="please select your zone"
              >
                <el-option label="Zone one" value="shanghai" />
                <el-option label="Zone two" value="beijing" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="register">Config</el-tab-pane>
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
}
</style>