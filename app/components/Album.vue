<template>
  <div
    class="w-full h-[200px] relative album"
    :style="{ backgroundColor: albumOption[selectAlbum]?.color }"
  >
    <div class="absolute bottom-0 left-0">
      <img src="@/assets/img/1.png" alt="" class="w-[550px]" />
    </div>

    <!-- 专辑 -->
    <div class="flex gap-[50px] absolute bottom-[-30px] left-[35vw]">
      <div
        v-for="(cover, index) in albumOption"
        :key="index"
        class="relative cursor-pointer flex items-center justify-center"
        @click="handleClick(index)"
      >
        <div
          :class="[
            'bg-no-repeat bg-cover w-[90px] aspect-[1] z-[1] rounded-[50%] transition-transform duration-300',
            selectAlbum === index ? 'rotate-album' : '',
          ]"
          :style="{ backgroundImage: `url(${cover.cover})` }"
        ></div>

        <div
          :class="[
            'bg-[url(@/assets/img/album/bg.png)] bg-no-repeat bg-cover w-[120px] h-[120px] absolute z-[2] transition-transform duration-300',
          ]"
        ></div>
      </div>
    </div>
    <!-- 专辑名 -->
    <div class="w-[70vw] absolute top-[-80px] left-[25vw]">
      <div class="relative">
        <div
          class="text-[100px] absolute top-0 left-0 z-[1]"
          style="font-family: 'zhengkuHeavy'"
        >
          <span
            class="text-[#005feb]"
            style="
              text-shadow: -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff,
                3px 3px 0 #fff, -3px 0px 0 #fff, 3px 0px 0 #fff, 0px -3px 0 #fff,
                0px 3px 0 #fff;
            "
            >{{ albumOption[selectAlbum]?.name1 }}</span
          >
          <span
            class="text-[#ffb202]"
            style="
              text-shadow: -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff,
                3px 3px 0 #fff, -3px 0px 0 #fff, 3px 0px 0 #fff, 0px -3px 0 #fff,
                0px 3px 0 #fff;
            "
            >{{ albumOption[selectAlbum]?.name2 }}</span
          >
        </div>
        <div
          class="text-[100px] absolute top-[10px] left-0 z-[0]"
          style="font-family: 'zhengkuHeavy'"
        >
          <span
            class="text-[#47f3ff]"
            style="
              text-shadow: -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff,
                3px 3px 0 #fff, -3px 0px 0 #fff, 3px 0px 0 #fff, 0px -3px 0 #fff,
                0px 3px 0 #fff;
            "
            >{{ albumOption[selectAlbum]?.name1 }}</span
          >
          <span
            class="text-[#fa7c2f]"
            style="
              text-shadow: -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff,
                3px 3px 0 #fff, -3px 0px 0 #fff, 3px 0px 0 #fff, 0px -3px 0 #fff,
                0px 3px 0 #fff;
            "
            >{{ albumOption[selectAlbum]?.name2 }}</span
          >
          <el-button type="danger" size="large" 
          @click="handleClickAlbum"
          class="!text-[20px] mt-[40px] ml-[20px] !bg-red-700">前往网易云购买</el-button>
        </div>
      </div>
    </div>

    <!-- 唱片 -->
    <div class="flex gap-[50px] absolute top-[100px] right-[150px]">
      <div class="relative flex items-center justify-center">
        <div
          :class="[
            'bg-no-repeat bg-cover w-[150px] aspect-[1] rotate-album z-[2] rounded-[50%] transition-transform duration-300',
          ]"
          :style="{
            backgroundImage: `url(${albumOption[selectAlbum]?.cover})`,
          }"
        ></div>

        <div
          :class="[
            'bg-[url(@/assets/img/album/bg2.png)] bg-no-repeat bg-cover w-[250px] aspect-[1] absolute z-[1] transition-transform duration-300',
          ]"
        ></div>
      </div>
    </div>

    <!-- 数据 -->
    <div class="absolute top-[70px] left-[25vw]">
      <div class="flex gap-[20px]">
        <el-statistic v-if="albumOption[selectAlbum]?.volume" :value="Number(albumOption[selectAlbum]?.volume)">
          <template #title>
            <span
              class="text-[#fff] text-[20px]"
              style="font-family: 'zhengkuMedium'"
              >销量</span
            >
          </template>
        </el-statistic>
        <el-statistic v-if="albumOption[selectAlbum]?.sales" :value="Number(albumOption[selectAlbum]?.sales)">
          <template #title>
            <span
              class="text-[#fff] text-[20px]"
              style="font-family: 'zhengkuMedium'"
              >销售额</span
            >
          </template>
        </el-statistic>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import img1 from "@/assets/img/album/1.jpg";
import img2 from "@/assets/img/album/2.jpg";
import img3 from "@/assets/img/album/3.jpg";
import img4 from "@/assets/img/album/4.jpg";
import img5 from "@/assets/img/album/5.jpg";
import img6 from "@/assets/img/album/6.jpg";
import { time } from "echarts";

// 保持不变，数组索引从 0 到 5
const albumOption = [
  {
    name1: "量变",
    name2: "临界点",
    cover: img6,
    volume: "1115677",
    sales: "30120000",
    color: "#477688",
    time: "2025.12.20",
    href: "https://music.163.com/#/album?id=258512180"
  },
  {
    name1: "希忘",
    name2: "HOPE",
    cover: img5,
    volume: "1500000",
    sales: "40500000",
    color: "#c092ae",
    time: "2022.12.20",
    href: "https://music.163.com/#/album?id=156507145"
  },
  {
    name1: "新世界",
    name2: "NEW WORLD",
    cover: img4,
    volume: "2000000",
    sales: "40000000",
    color: "#3d3d3d",
    time: "2020.4.8",
    href:"https://music.163.com/#/album?id=86286082"
  },
  {
    name1: "H",
    name2: "",
    cover: img3,
    time: "2017.3.7",
    color: "#232323",
    href:"https://music.163.com/#/album?id=181037071"
  },
  {
    name1: "异",
    name2: "类",
    cover: img2,
    color: "#6a0105",
    time: "2015.12.18",
    href: "https://music.163.com/#/album?id=3292678"
  },
  {
    name1: "卡西莫多",
    name2: "的礼物",
    cover: img1,
    color: "#afcf8e",
    time: "2014.9.12",
    href: "https://music.163.com/#/album?id=3010205"
  },
];

const selectAlbum = ref<number>(0);

const handleClick = (index: number) => {
  selectAlbum.value = index;
};

const handleClickAlbum = () =>{
    window.open(albumOption[selectAlbum.value]?.href)
}
</script>

<style lang="scss">
@keyframes spinAlbum {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.rotate-album {
  animation: spinAlbum 8s linear infinite;
}

.album {
  .el-statistic__number {
    font-family: 'zhengkuBold';
    font-size: 30px;
  }
}
</style>
