<template>
  <div class="flex justify-between w-full gap-[20px] p-[20px] bg-[#000]">
    <li v-for="i in menu" :key="i.subTitle"
      class="py-[20px] w-[170px] list-none flex-[1] rounded-[10px] border-[1px] border-solid transition-all duration-300"
      :style="{
        borderColor: i.color,
        backgroundColor: hovered === i.subTitle ? i.color : 'transparent'
      }"
      @mouseenter="hovered = i.subTitle"
      @mouseleave="hovered = ''"
      @click="hanldeClick(i)"
    >
      <div
        class="flex flex-col items-center justify-center cursor-pointer text-[#fff] menu-item"
      >
        <div class="text-[30px]" style="font-family: 'zhengkuHeavy'">{{ i.name }}</div>
        <div class="text-[14px]" style="font-family: 'zhengkuMedium'" :style="{
          opacity: hovered === i.subTitle ? '1' : '.35'
        }">{{ hovered === i.subTitle ? i.subTitle2 : i.subTitle }}</div>
      </div>
    </li>
  </div>
  <Login v-model="openLogin"></Login>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Login from "~/components/Login/Index.vue";

const openLogin = ref(false);
const hovered = ref("");

const menu = [
  { name: "首页", subTitle: "HOME", subTitle2: "想过离开，以这种方式存在", color: "#ffcc30" },
  { name: "火星乌托邦", subTitle: "VILLAGE", subTitle2: "戴上礼帽，可笑，看谁露出马脚", color: "#ff8331" },
  { name: "活动", subTitle: "ACTIVITY", subTitle2: "他是我奢侈的愿望，也是我抹杀的童话", color: "#3d7af9" },
  { name: "小游戏", subTitle: "CULTURE", subTitle2: "It's ok!不需要指点我进退", color: "#22bbee",path:"/games" },
  { name: "登录", subTitle: "LOGIN", subTitle2: "摘一片云朵，踏在脚下看日落", color: "#02ff8b" },
];

const hanldeClick = (item: any) => {
  if (item.name === "登录") {
    openLogin.value = true;
    return;
  }
  navigateTo(item.path || "/");
};
</script>
