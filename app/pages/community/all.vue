<template>
  <div class="w-full h-[95vh]">
    <client-only>
      <WorldMap :markers="points" :userLocation="userLocation" v-if="userLocation.length" />
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
    userLocation.value = [longitude, latitude];
    // PocketBase GeoPoint 需要 { lat, lon }
    await $pb.collection("users").update($pb.authStore.model.id, {
      location: {
        lat: latitude,
        lon: longitude,
      },
    });
  });
}

onMounted(() => {
  getIp();
})
const points = ref([
  {
    id: 1,
    lat: 39.9042,
    lng: 116.4074,
    title: "北京",
    description: "China — Beijing",
  },
  {
    id: 2,
    lat: 37.7749,
    lng: -122.4194,
    title: "San Francisco",
    description: "USA — SF",
  },
  {
    id: 3,
    lat: 51.5074,
    lng: -0.1278,
    title: "London",
    description: "UK — London",
  },
  {
    id: 4,
    lat: -33.8688,
    lng: 151.2093,
    title: "Sydney",
    description: "Australia — Sydney",
  },
  {
    id: 5,
    lat: -22.9068,
    lng: -43.1729,
    title: "Rio de Janeiro",
    description: "Brazil — Rio",
  },
]);
</script>