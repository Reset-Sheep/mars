<template>
  <div class="corner-box bg-[rgba(255,255,255,0.2)] p-[10px_50px] text-white font-zhengkuMedium relative cursor-pointer">
    <slot></slot>
  </div>
</template>

<style scoped>
.corner-box::before,
.corner-box::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid #fff;
}
.corner-box::before {
  top: 0;
  left: 0;
  border-right: none;
  border-bottom: none;
}
.corner-box::after {
  bottom: 0;
  right: 0;
  border-left: none;
  border-top: none;
}
</style>
