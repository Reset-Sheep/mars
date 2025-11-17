<template>
    <div class="relative flex flex-col gap-2 w-full aspect-[1640/278] rounded-lg">
        <!-- 背景层 -->
        <div class="absolute inset-0 bg-[url('@/assets/img/ph.png')] bg-no-repeat bg-[length:contain] blur-[10px] scale-110"></div>
        <span class="absolute inset-0 flex items-center justify-center text-[40px] text-[#fff]" style="font-family: 'zhengkuBold'">鼠标悬浮至此</span>
        <!-- 前景内容 -->
        <div class="relative z-10 w-full flex items-center justify-center h-full">
            <ImageTrailCursor :key="selectedVariant" :images="images" :variant="selectedVariant" />
        </div>
    </div>

</template>

<script lang="ts" setup>
import type { VariantType } from "./ImageTrailCursor/ImageTrailCursor.vue";

const images = [
    "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/16245254/pexels-photo-16245254/free-photo-of-chatgpt-a-chatbot-for-your-website.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2832382/pexels-photo-2832382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/2333293/pexels-photo-2333293.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/604684/pexels-photo-604684.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    "https://images.pexels.com/photos/3308588/pexels-photo-3308588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
];

const selectedVariant = ref<VariantType>("type2");
</script>