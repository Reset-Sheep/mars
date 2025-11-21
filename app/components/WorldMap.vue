<template>
  <div ref="chartRef" class="map-container h-[85vh]"></div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

// 世界地图 JSON 数据（重要）
import worldJson from "~/assets/json/world.json";
const { $pb } = useNuxtApp();
let chart;
const chartRef = ref(null);
const props = defineProps({
    userLocation: Array
})

onMounted(() => {
  initMap();
});

async function initMap() {
console.log(props.userLocation);

  const echarts = await import("echarts");

  // 注册世界地图
  echarts.registerMap("world", worldJson);

  chart = echarts.init(chartRef.value);

  chart.setOption({
    backgroundColor: "#000",
    geo: {
      map: "world",
      roam: true, // 支持缩放与拖拽
      itemStyle: {
        areaColor: "#22bbee",
        borderColor: "#3d7af9",
      },
    },

    // 点位
    series: [
      {
        name: "Users",
        type: "scatter",
        coordinateSystem: "geo",
        symbolSize: 10,
        itemStyle: { color: "#ff4d4f" },
        data: [
          // 示例点：北京、东京、纽约
          { name: "Beijing", value: [116.4074, 39.9042] },
          { name: "Tokyo", value: [139.6917, 35.6895] },
          { name: "New York", value: [-74.006, 40.7128] },
        ],
      },
      {
        type: "effectScatter",
        coordinateSystem: "geo",
        rippleEffect: {
          scale: 6,
          brushType: "stroke",
        },
        itemStyle: { color: "#ff0000" },
        symbolSize: 12,
        data: [
          {
            value: props.userLocation,
          },
        ],
      },
    ],
  });

  // 响应式大小
  window.addEventListener("resize", resizeChart);
}
onBeforeUnmount(() => {
  window.removeEventListener("resize", resizeChart);
  chart?.dispose();
});

function resizeChart() {
  chart?.resize();
}
</script>

<style scoped>
</style>
