<template>
  <div class="w-full bg-[url('@/assets/img/background.png')] bg-no-repeat bg-cover pt-[100px] pb-[100px]">
    <div class="w-full flex justify-center">
      <img src="@/assets/img/title1.png" alt="" class="h-[180px]" />
    </div>
    <div class="flex w-full">
      <div ref="chartRef" class="w-full h-[600px] flex-1"></div>
      <div class="flex-1 flex flex-col justify-center">
        <div class="text-[#fff] text-[20px] my-[10px]" style="font-family: 'zhengkuMedium'">
          一只黑煤球提醒您：点击左边地点，查看演唱会卡片；点击下方卡片，了解更多哟~
        </div>
        <div class="radio grid grid-cols-3 gap-[10px] w-[40vw]">
          <div style="font-family: 'zhengkuMedium'"
            class="text-[#fff] text-[100px] w-[235px] leading-[120px] text-center">
            {{ selectConcerts.city }}
          </div>
          <div class="w-max p-3 border-[5px] border-solid border-[transparent] rounded-[12px] cursor-pointer"
            :class="activeIndex === index ? 'active' : ''" v-for="(i, index) in selectConcerts.date" :key="i"
            @click="handleClick(index)">
            <div class="bg-[url(@/assets/img/radio/b3.png)] w-[200px] aspect-[2.14] bg-cover relative">
              <div class="absolute right-[32px] top-[3px] text-[18px]" style="font-family: 'zhengkuMedium'">
                {{ i.venue }}
              </div>
              <div class="absolute bottom-[8px] left-[7px] text-[30px]" style="font-family: 'zhengkuBold'">
                {{ i.time }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import * as echarts from "echarts/core";
import { onMounted, ref, onBeforeUnmount } from "vue";
import { MapChart, LinesChart, EffectScatterChart } from "echarts/charts";
import { GeoComponent, TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import chinaJson from "@/assets/map/china.json"; // ✅ 需要中国地图JSON文件
import concerts from "@/assets/json/concerts.json";

// 注册ECharts组件
echarts.use([
  MapChart,
  LinesChart,
  EffectScatterChart,
  GeoComponent,
  TooltipComponent,
  CanvasRenderer,
]);

const chartRef = ref(null);
let chart;

const selectConcerts = ref(concerts[0]);

// 排序并生成路径数据
const sorted = concerts.sort((a, b) => new Date(a.date) - new Date(b.date));
const lineData = sorted
  .map((item, i, arr) =>
    i < arr.length - 1
      ? [{ coord: item.coords, value: item.city }, { coord: arr[i + 1].coords }]
      : null
  )
  .filter(Boolean);

onMounted(() => {
  chart = echarts.init(chartRef.value);
  echarts.registerMap("china", chinaJson);

  const option = {
    geo: {
      map: "china",
      roam: false,
      zoom: 1.2,
      label: { show: false },
      itemStyle: {
        areaColor: "#111", // 地图底色
        borderWidth: 2,
        borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
          { offset: 0, color: "#02ff8b" },
          { offset: 1, color: "#3d7af9" },
        ]),
        shadowColor: "rgba(255, 77, 79, 0.8)", // 发光颜色
        shadowBlur: 0, // 模糊范围
        shadowOffsetX: 0,
        shadowOffsetY: 0,
      },
      emphasis: {
        itemStyle: {
          areaColor: "#222",
        },
      },
    },
    tooltip: {
      show: false,
    },
    series: [
      {
        name: "巡演路线",
        type: "lines",
        coordinateSystem: "geo",
        zlevel: 1,
        effect: {
          show: true,
          period: 4,
          trailLength: 0.2,
          color: "#9a2a26",
          symbolSize: 6,
        },
        tooltip: { show: false },
        lineStyle: {
          color: "#9a2a26",
          width: 2,
          opacity: 0.8,
          curveness: 0.2,
        },
        data: lineData,
      },
      {
        name: "巡演城市",
        type: "effectScatter",
        zlevel: 2,
        coordinateSystem: "geo",
        data: sorted.map((item) => ({
          name: item.city,
          value: item.coords,
          venue: item.venue,
          date: item.date,
        })),

        rippleEffect: { brushType: "stroke" },
        symbolSize: 10,
        itemStyle: { color: "#ff2d55" },
        tooltip: {
          show: true, // ✅ 单独为这个 series 开启 tooltip
          backgroundColor: "#373738",
          borderColor: "#373738",
          textStyle: {
            color: "#ffc21e",
          },
          formatter: function (params) {
            const { name, data } = params;
            return `
            <div style="text-align:left;">
              <b>${name}</b><br/>
            </div>
          `;
          },
        },
      },
    ],
  };

  chart.setOption(option);
  // ✅ 添加点击事件
  chart.on("click", (params) => {
    if (params.seriesType === "effectScatter") {
      const { name, data } = params;
      const findConcerts = concerts.find((item) => item.city === name);
      if (!findConcerts) {
        return;
      }
      selectConcerts.value = findConcerts;
      console.log("点击城市：", name);
      console.log("详细信息：", data);
    }
  });
  window.addEventListener("resize", () => chart.resize());
});

onBeforeUnmount(() => {
  chart?.dispose();
});

const activeIndex = ref(null);
const handleClick = (index) => {
  activeIndex.value = index; // 更新选中项
};
</script>


<style lang="scss">
.radio {
  .active {
    background-color: rgba($color: #fff, $alpha: 0.6);
    border-color: rgb(0, 95, 235);
  }
}
</style>