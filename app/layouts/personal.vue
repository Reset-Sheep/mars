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
          <div class="w-[67vw]">
            <!-- <el-scrollbar class="w-full !z-[100]"> -->
            <div class="flex justify-center pt-[10px] pb-[20px]">
              <MorphingTabs
                :tabs="tabs.map((item) => item.label)"
                :active-tab="activeTab"
                @update:active-tab="handleClick"
              />
            </div>
            <NuxtPage />
            <!-- </el-scrollbar> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const route = useRoute();
const tabs = ref([
  {
    label: "主页",
    value: "主页",
    path: "/personal/" + route.params?.id,
  },
  {
    label: "帖子",
    value: "tieba",
    path: "/personal/" + route.params?.id + "/tieba",
  },
  {
    label: "卡片",
    value: "card",
    path: "/personal/" + route.params?.id + "/card",
  },
  {
    label: "认证",
    value: "auth",
    path: "/personal/" + route.params?.id + "/auth",
  },
  {
    label: "三句小说",
    value: "novel",
    path: "/personal/" + route.params?.id + "/novel",
  },
]);
const activeTab = ref(tabs.value[0].label);
const { $pb } = useNuxtApp();

const handleClick = (tab: any) => {
  activeTab.value = tab;
  tabs.value.forEach((item) => {
    if (item.label === tab) {
      navigateTo(item.path);
    }
  });
};

function init() {
  const id = route.params?.id;
  if (!id) return;
  console.log($pb?.authStore?.model?.id != id);
  if ($pb?.authStore?.model?.id != id) {
    tabs.value = tabs.value.slice(0, 1);
  }
  if (route.fullPath.split("/")[3]) {
    activeTab.value = tabs.value.find(
      (item) => item.value === route.fullPath.split("/")[3]
    )?.label;
  } else {
    
    activeTab.value = tabs.value[0].label;
  }
}
watch(
  () => route.params?.id,
  () => {
    init();
  }
);

onMounted(() => {
  init();
});
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
