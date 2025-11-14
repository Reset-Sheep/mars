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
    <div class="w-full overflow-hidden bg-black">
      <div class="flex animate-scroll">
        <img v-for="i in 6" :key="i" src="../assets/img/-logo1-ezgif.com-gif-to-avif-converter (1).avif" alt=""
          class="h-[15vh] shrink-0" />
      </div>
    </div>
    <!-- 第二屏 -->
    <div class="h-[85vh] w-full relative">
      <div>
        <div class="huachenyu-text text-[#ff8331] text-[3.5vw]">【2016】MAMA(Mnet亚洲音乐大奖)亚洲最佳艺人（中国）</div>
        <div class="huachenyu-text text-[#fff] text-[2.7vw] top-[80px] right-[20px]">【2018】首位在鸟巢连开两场演唱会的90后歌手</div>
        <div class="huachenyu-text text-[#fff] text-[2.4vw] top-[80px]">【2020】《歌手·当打之年》歌王</div>
        <div class="huachenyu-text text-[#fff] text-[2.6vw] top-[150px]">【2021】火星演唱会总导演</div>
        <div class="huachenyu-text text-[#ff8331] text-[3.7vw] top-[150px] right-[20px]">【2024】举办万人海边日出演唱会</div>
        <div class="huachenyu-text text-[#ff8331] text-[2.7vw] top-[230px]">【2014】首登央视春晚舞台</div>
        <div class="huachenyu-text text-[#ff8331] text-[2.5vw] top-[300px] w-[26vw]">【2016】亚洲新歌榜最佳男歌手奖</div>
      </div>
      <div>
        <img src="../assets/img/huachenyu.png" alt="" class="w-full">
      </div>
    </div>
    <!-- 第三屏 -->
     <!-- <div class="flex items-center justify-center">
      <div class="w-[20vw] aspect-[.76] bg-[url('@/assets/img/cover.png')] bg-cover"></div>
     </div> -->
     <div><Picture/></div>
    <div>
      <client-only>
        <ConcertMap />
      </client-only>
    </div>
    
    <!-- <div class="translate-y-[-50%]"><img src="../assets/img/—Pngtree—ripped paper edge element set_8988019.png" alt="" class="w-full"></div> -->
    <div class="h-[100vh] overflow-x-hidden"></div>
  </div>

</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";

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

.huachenyu-text {
  font-family: 'zhengkuMedium';
  position: absolute;
}
</style>