<template>
  <div
    class="relative flex w-full h-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl"
  >
    <el-scrollbar class="w-full !z-[100]" :height="`calc(90vh - 70px)`">
      <div
        class="text-[#fff] w-full grid grid-cols-6 gap-4"
        v-my-loading="loading"
      >
        <div
          v-for="(i, index) in userList"
          :key="index"
          class="p-[10px] nearby-item h-max"
        >
          <div class="flex items-center gap-[10px] justify-between w-full">
            <div class="flex-1">
              <el-image
                alt=""
                :src="$pb.files.getUrl(i, i.avatar)"
                fit="cover"
                class="rounded-[50%] overflow-hidden w-[50px] aspect-[1]"
              ></el-image>
            </div>
            <div class="w-[80%]">
              <div>
                <el-text
                  line-clamp="1"
                  style="font-family: 'zhengkuMedium'"
                  class="!text-[40px] !text-[#fff] w-[100%]"
                  >{{ i.name }}</el-text
                >
              </div>
            </div>
          </div>
          <div>
            <!-- 溢出省略号 -->
            <el-text line-clamp="1" class="w-[100%] !text-[#fff]"
              >111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111</el-text
            >
          </div>
          <div
            class="text-[14px] bg-[#ffcc30] w-max p-[5px] rounded-[4px] text-[#000]"
            style="font-family: 'zhengkuBold'"
          >
            {{ i.distance }}
            km
          </div>
        </div>
      </div>
    </el-scrollbar>
    <ParticlesBg
      class="absolute inset-0"
      :quantity="100"
      :ease="100"
      color="#fff"
      :staticity="10"
      refresh
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "community",
});

import { ref, onMounted } from "vue";
import { getDistanceFromLatLonInKm } from "~/utils/tools";
const { $pb } = useNuxtApp();
const loading = ref(true); // 控制你的自定义 loading 指令

const userList = ref<any>([]);
async function getNearbyUsers(lat: any, lon: any) {
  const radius = 10000; // 10km
  const users = await $pb.collection("users").getFullList({
    filter: `geoDistance(location.lon, location.lat, ${lon}, ${lat}) < ${radius} && id != "${$pb.authStore.model.id}"`,
  });
  userList.value = users
    .map((u) => ({
      ...u,
      distance: getDistanceFromLatLonInKm(
        lat,
        lon,
        u.location.lat,
        u.location.lon
      ),
    }))
    .sort((a, b) => a.distance - b.distance);
  loading.value = false;
}

const userLat = ref<number[]>([]);
function getIp() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    if (!$pb?.authStore?.model?.id) {
      return;
    }
    const { latitude, longitude } = pos.coords;
    userLat.value = [latitude, longitude];
    getNearbyUsers(latitude, longitude);
    // PocketBase GeoPoint 需要 { lat, lon }
    await $pb.collection("users").update($pb.authStore.model.id, {
      location: {
        lat: latitude,
        lon: longitude,
      },
    });
  });
}

onMounted(async () => {
  await getIp();
});
</script>

<style lang="scss">
.nearby-item {
  width: 100%;
  // background-color: #ff8331;
  border: 1px solid #ffcc30;
  border-radius: 16px;
  cursor: pointer;
}
</style>