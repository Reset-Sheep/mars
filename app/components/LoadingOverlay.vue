<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="absolute inset-0 flex items-center justify-center bg-black/40 z-50 rounded-2xl"
    >
      <div class="flex flex-col items-center justify-center">
        <img :src="loading" alt="" class="w-[7vw]" />
        <span class="text-[#fff]" style="font-family: 'zhengkuHeavy';">Loading……</span>
      </div>

      <!-- <div class="w-8 h-8 border-4 border-white/40 border-t-white rounded-full animate-spin"></div> -->
    </div>
  </transition>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import loading from "~/assets/loading.gif";
defineProps({
  visible: Boolean,
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
