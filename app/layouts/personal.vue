<template>
  <div class="w-[100vw] h-[100vh] overflow-hidden bg-[#000] community">
    <el-affix>
      <div>
        <Menu />
      </div>
    </el-affix>
    <div class="common-layout w-full h-full">
      <div class="relative flex h-full flex-col items-center justify-center">
        <FallingStarsBg class="bg-black dark:bg-black" color="#FFF" />
        <div class="w-full h-full flex justify-center z-[1]">
          <div class="w-[70vw] h-[83vh]">
            <el-scrollbar class="w-full !z-[100]">
              <div class="flex justify-center pt-[10px] pb-[20px]">
                <MorphingTabs
                  :tabs="tabs"
                  :active-tab="activeTab"
                  @update:active-tab="activeTab = $event"
                />
              </div>
              <NuxtPage />
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const tabs = ["主页", "帖子", "卡片", "认证", "三句小说"];
const activeTab = ref(tabs[0]);
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
