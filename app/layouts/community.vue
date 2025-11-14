<template>
  <div class="w-[100vw] h-[100vh] overflow-hidden bg-[#000] community">
    <el-affix>
      <div>
        <Menu />
      </div>
    </el-affix>
    <div class="common-layout w-full h-full">
      <el-container class="h-full">
        <el-aside width="200px" class="h-full">
          <el-menu :default-active="$route.path" router>
            <el-menu-item v-for="i in menu" :key="i.index" :index="i.index">
              <span>{{ i.title }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- 这里会动态渲染子页面 -->
          <NuxtPage />
        </el-main>
      </el-container>
    </div>
  </div>
</template>

<script setup lang="ts">
const menu = [
  { index: "/community/chat", title: "聊天大厅" },
  { index: "/community/nearby", title: "附近煤球" },
  { index: "/community/tieba", title: "煤球贴吧" },
];
</script>

<style lang="scss">
.community {
  .el-main {
    padding: 0 20px;
  }
  .el-menu {
    background-color: transparent;
    border-right: none;
    .el-menu-item {
      color: #494949;
      font-family: "zhengkuMedium";
      font-size: 18px;
      border-radius: 16px;
      span {
        text-align: center;
        width: 100%;
      }
    }
    .el-menu-item:hover {
      background-color: #3d7af9;
      color: #fff;
    }
    .el-menu-item.is-active {
      background-color: #3d7af9;
      color: #fff;
      font-size: 20px;
    }
  }
}
</style>
