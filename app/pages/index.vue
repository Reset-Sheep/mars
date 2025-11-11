<template>
  <div class="bg-[#000]">
    <div v-loading="false" class="bg-[#000] overflow-x-hidden">
      <!-- 第一屏 -->
      <div
        class="w-[100vw] h-[100vh] bg-[url('@/assets/svg/bg1.svg')] bg-no-repeat bg-cover overflow-y-hidden"
      >
        <div class="flex items-center justify-center">
          <img src="../assets/img/图片1.png" alt="" class="w-[95vw]" />
        </div>
      </div>
      <!-- 菜单 -->
    </div>

    <el-affix>
      <div>
        <Menu />
      </div>
    </el-affix>
    <div>
      <img src="../assets/img/huachenyu.png" alt="" class="w-full">
    </div>
    <!-- <div class="relative flex w-[300px] flex-col items-center justify-center p-8">
      <iPhone15ProMockup
        src="https://cdn.inspira-ui.com/images/inspira-ss-phone.png"
        class="size-full max-w-sm"
      />
    </div> -->
    <!-- 第二屏 -->
    <div class="h-[100vh] overflow-x-hidden"></div>
  </div>
  
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Menu from "~/components/Menu/index.vue";

</script>

<style scoped lang="scss">
.screen-first {
  transition: all 1s;
}
</style>