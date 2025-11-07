<template>
    <div :class="`bg-[${color}] p-[10px_50px] cursor-pointer`" style="font-family: 'zhengkuMedium';">
        <slot></slot>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    color: {
        type: String,
        default: '#fff'
    }
})
</script>