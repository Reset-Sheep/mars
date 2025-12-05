<template>
  <div class="w-full h-[95vh]">
    <client-only>
      <WorldMap
        :markers="points"
        :userLocation="userLocation"
        v-if="userLocation.length"
      />
    </client-only>
    <!-- <WorldMap :markers="points" /> -->
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "community",
});

import { ref } from "vue";
const { $pb } = useNuxtApp();
const userLocation = ref<any>([]);
function getIp() {
  navigator.geolocation.getCurrentPosition(async (pos) => {
    if (!$pb?.authStore?.model?.id) {
      return;
    }
    const { latitude, longitude } = pos.coords;
    // console.log("认证状态:", $pb.authStore.isValid);
    // console.log("认证模型:", $pb.authStore.model);
    // console.log("集合权限:", await $pb.collection("users").getList(1, 1));
    userLocation.value = [longitude, latitude];
    // PocketBase GeoPoint 需要 { lat, lon }
    try {
      // 3. 先检查用户是否存在
      const userId = $pb.authStore.model.id;
      const user = await $pb.collection("users").getOne(userId);

      // 4. 如果用户存在，更新位置
      if (user) {
        await $pb.collection("users").update(user.id, {
          location: {
            lat: latitude,
            lon: longitude,
          },
        });
      }
    } catch (error: any) {
      console.error("更新用户位置时出错:", error);
      if (error.status === 404) {
        console.error("错误：用户不存在于数据库中");
      }
    }
  });
}

// 分批次获取所有用户信息
async function getAllUsers() {
  const users = await $pb.collection("users").getFullList({
    fields: "id,location",
  });
  if (!users?.length) {
    return;
  }
  points.value = users.map((user: any) => {
    return {
      id: user.id,
      lat: user.location.lat,
      lng: user.location.lon,
    };
  });

  return users;
}

onMounted(() => {
  getIp();
  getAllUsers();
});
const points = ref<any>([]);
</script>