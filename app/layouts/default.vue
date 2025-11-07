<template>
  <div class="layout">
    <!-- <div class="header w-full h-12 text-[#fff]">
      <div></div>
      <div class="flex justify-between w-max">
        <li v-for="i in menu" :key="i.subTitle" class="py-[20px] w-[170px] list-none">
          <div class="flex flex-col items-center justify-center cursor-pointer hover:text-[#FFA550]">
            <div class="text-[16px]">{{ i.name }}</div>
            <div class="text-[12px] opacity-[.35]">{{ i.subTitle }}</div>
          </div>
        </li>
      </div>
      <div></div>
    </div> -->
    <div>
      <NuxtPage />
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";

const menu = ref([
  { name: "首页", subTitle: "HOME", path: "/blogs/list" },
  { name: "活动", subTitle: "ACTIVITY", childList: [{ name: "平台活动", path: "/blogs/list1" },{ name: "粉丝路演", path: "/blogs/list1" }] },
  { name: "火星村", subTitle: "VILLAGE", path: "/blogs/list3" },
  { name: "火星文化", subTitle: "CULTURE", path: "/blogs/list1" },
]);

const toggleTheme = (val: "dark" | "light") => {
  document.documentElement.setAttribute("data-theme", val);
};

</script>

<style scoped lang="scss">
.layout {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
  }
}
</style>
