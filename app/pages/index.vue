<template>
  <div class="bg-[#000]">
    <div v-loading="false" class="bg-[#000] overflow-x-hidden">
      <!-- 第一屏 -->
      <div class="w-[100vw] h-[100vh] bg-[url('@/assets/svg/bg1.svg')] bg-no-repeat bg-cover overflow-y-hidden">
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
    <!-- 剪影 -->
    <div class="w-full overflow-hidden bg-black">
      <div class="flex animate-scroll">
        <img v-for="i in 6" :key="i" src="../assets/img/-logo1-ezgif.com-gif-to-avif-converter (1).avif" alt=""
          class="h-[15vh] shrink-0" />
      </div>
    </div>
    <!-- 第二屏 -->
     <div class="h-[100vh] w-full">
      <div>
        <img src="../assets/img/record.png" alt="" class="w-[500px] h-[500px]">
        <!-- <Border></Border> -->
      </div>

     </div>
    <div>
      <client-only>
        <ConcertMap />
      </client-only>
    </div>
    <div class="h-[100vh] overflow-x-hidden bg-[url('@/assets/img/bg2.png')] bg-no-repeat bg-cover">
      <div>
        <!-- <Border></Border> -->
      </div>
    </div>
    <div class="h-[100vh] overflow-x-hidden"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import Menu from "~/components/Menu/index.vue";
import Border from "~/components/Border/index.vue"
import ConcertMap from '~/components/ConcertMap.vue';
</script>

<style scoped lang="scss">
.screen-first {
  transition: all 1s;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}

.animate-scroll {
  display: flex;
  width: 200%;
  /* 两倍宽度实现无缝衔接 */
  animation: scroll 60s linear infinite;
}
</style>