<template>
    <div class="w-full bg-[url('@/assets/img/background.png')] bg-no-repeat bg-cover py-[60px]">
        <div class="w-full flex justify-center">
            <img src="@/assets/img/title1.png" alt="" class="h-[180px]">
        </div>
        <div class="flex w-full">
            <div ref="chartRef" class="w-full h-[600px] flex-1"></div>
            <div class="flex-1">
                213
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

// 注册ECharts组件
echarts.use([MapChart, LinesChart, EffectScatterChart, GeoComponent, TooltipComponent, CanvasRenderer]);

const chartRef = ref(null);
let chart;

const concerts = [
    { city: "北京", coords: [116.27475, 39.90983], venue: "五棵松体育馆", date: "" },       // :contentReference[oaicite:0]{index=0}
    { city: "南京", coords: [118.7969, 32.0603], venue: "汤山音乐谷", date: "" },            // 南京江宁区，稍估
    // 以下为你提供的其他场馆，坐标待确认或估算：
    { city: "上海", coords: [121.4737, 31.2304], venue: "上海大舞台", date: "" },
    { city: "深圳", coords: [114.0579, 22.5431], venue: "深圳春茧体育馆", date: "" },
    { city: "广州", coords: [113.2644, 23.1291], venue: "广州大学城体育场", date: "" },
    { city: "烟台", coords: [121.3877, 37.4638], venue: "烟台牟平区里蹦岛", date: "" },
    { city: "香港", coords: [114.1577, 22.2855], venue: "香港中环海滨活动中心", date: "" },
    { city: "合肥", coords: [117.2272, 31.8206], venue: "合肥体育中心体育场", date: "" },
    { city: "重庆", coords: [106.5516, 29.5630], venue: "重庆奥体中心体育场", date: "" },
    { city: "贵阳", coords: [106.7081, 26.6299], venue: "贵阳观山湖公园广场", date: "" },
    { city: "杭州", coords: [120.1551, 30.2741], venue: "杭州白马湖公园", date: "" },
    { city: "成都", coords: [104.0657, 30.6595], venue: "成都露天音乐公园", date: "" },
    { city: "武汉", coords: [114.3054, 30.5931], venue: "武汉园博园", date: "" },
    { city: "长沙", coords: [112.9388, 28.2282], venue: "长沙马栏山鸭嘴公园", date: "" },
    { city: "西安", coords: [108.9480, 34.2632], venue: "西安奥体中心体育场", date: "" },
    { city: "佛山", coords: [113.1340, 23.0355], venue: "佛山千灯湖音乐秀场", date: "" },
    { city: "青岛", coords: [120.3844, 36.1052], venue: "青岛市民健身中心体育场", date: "" },
    { city: "郑州", coords: [113.6496, 34.7566], venue: "郑州奥体中心体育场", date: "" },
    { city: "沈阳", coords: [123.4315, 41.8057], venue: "沈阳奥体中心体育场", date: "" },
    { city: "苏州", coords: [120.6196, 31.2990], venue: "苏州奥体中心体育场", date: "" },
    { city: "福州", coords: [119.2965, 26.0745], venue: "福州奥体中心体育场", date: "" },
];


// 排序并生成路径数据
const sorted = concerts.sort((a, b) => new Date(a.date) - new Date(b.date));
const lineData = sorted.map((item, i, arr) =>
    i < arr.length - 1
        ? [{ coord: item.coords, value: item.city }, { coord: arr[i + 1].coords }]
        : null
).filter(Boolean);

onMounted(() => {
    chart = echarts.init(chartRef.value);
    echarts.registerMap("china", chinaJson);

    const option = {
        geo: {
            map: 'china',
            roam: false,
            zoom: 1.2,
            label: { show: false },
            itemStyle: {
                areaColor: '#111', // 地图底色
                borderWidth: 2,
                borderColor: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                    { offset: 0, color: '#02ff8b' },
                    { offset: 1, color: '#3d7af9' },
                ]),
                shadowColor: 'rgba(255, 77, 79, 0.8)', // 发光颜色
                shadowBlur: 0, // 模糊范围
                shadowOffsetX: 0,
                shadowOffsetY: 0
            },
            emphasis: {
                itemStyle: {
                    areaColor: '#222'
                }
            }
        },
        tooltip: {
            show: false
        },
        series: [
            {
                name: "巡演城市",
                type: "effectScatter",
                coordinateSystem: "geo",
                data: sorted.map(item => ({
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
                    formatter: function (params) {
                        const { name, data } = params;
                        return `
            <div style="text-align:left;">
              <b>${name}</b><br/>
              场馆：${data.venue || '待定'}<br/>
              日期：${data.date || '待定'}
            </div>
          `;
                    }
                }
            },
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
        ],
    };

    chart.setOption(option);
    window.addEventListener("resize", () => chart.resize());
});

onBeforeUnmount(() => {
    chart?.dispose();
});
</script>
