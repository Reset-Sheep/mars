<template>
  <div class="w-full bg-[#1c1e1b] rounded-[16px] p-[10px]">
    <div class="border-[5px] border-[#22bbee] rounded-[16px] p-[20px]">
      <el-scrollbar class="w-full !z-[100]" :height="`calc(75vh - 70px)`">
        <div class="grid grid-cols-5 gap-4">
          
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "personal",
});
</script>