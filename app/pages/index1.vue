<template>
  <div
    v-loading="false"
    class="absolute top-0 left-0 w-[100vw] h-[100vh] overflow-hidden"
  >
    <div class="screen-first" ref="screenFirst">
      <!-- 第1屏 -->
      <div class="w-[100vw] h-[100vh] overflow-hidden bg-[rgb(134,5,0)]">
        <div class="w-full h-full bg-[url('@/assets/img/WaveLine.svg')] bg-cover bg-no-repeat">
          <div
            class="w-full h-full bg-[url('@/assets/img/1.png')] bg-[length:auto_100vh] bg-[position:-100px_0] bg-no-repeat"
          >
            <div
              class="bg-gradient-to-b from-[rgba(0,0,0,.7)] to-[rgba(0,0,0,.1)] w-full h-full"
            >
              <div
                class="flex flex-col justify-center items-end h-full w-full pr-[40px]"
              >
              <div
                  class="text-[60px] text-[#fff]"
                  style="font-family: 'zhengkuLight'"
                >
                  welcome home
                </div>
                <div
                  class="text-[180px] text-[#fff] leading-[180px]"
                  style="font-family: 'zhengkuHeavy'"
                >
                 {{ '<<' }} 欢迎回家
                </div>
                <div class="text-[30px] text-[#fff]">
                  11.28-30 文昌站 · 火星撞地球，晨宇你最牛 
                </div>
                <div class="flex gap-5 mt-5">
                  <Button>了解更多</Button>
                  <ButtonBg color="#fff">了解更多</ButtonBg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 第2屏 -->
      <div class="w-[100vw] h-[100vh] bg-[#fff] overflow-scroll">
        <div class="w-[100vw] h-[100vh] bg-[#faa]"></div>
        <div class="w-[100vw] h-[100vh] bg-[#lgg]"></div>
      </div>
    </div>
    <!-- <img src="../assets/1.jpg" alt=""> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useEventListener, useThrottleFn } from "@vueuse/core";
import ButtonBg from "~/components/Button/ButtonBg.vue";
import Button from "~/components/Button/Button.vue";

const screenFirst = ref<HTMLElement | null>(null);
let wheelNumber = 0;
// 原始滚轮处理函数
const onWheel = (event: WheelEvent) => {
  if (screenFirst.value) {
    // 使用 transform 平移元素
    if (event.deltaY > 0&&wheelNumber==0) {
      wheelNumber++;
      screenFirst.value.style.transform = `translateY(-${
        event.deltaY * wheelNumber
      }vh)`;
    } else if (event.deltaY < 0&&wheelNumber==1) {
      wheelNumber--;
      screenFirst.value.style.transform = `translateY(${
        event.deltaY * wheelNumber
      }vh)`;
    }
    console.log(wheelNumber);
    
  }
};

// 节流函数，100ms 触发一次
const throttledWheel = useThrottleFn(onWheel, 500);

onMounted(() => {
  // 绑定全局滚轮事件
  useEventListener(window, "wheel", throttledWheel);
});
</script>

<style scoped lang="scss">
.screen-first {
  transition: all 1s;
}
</style>