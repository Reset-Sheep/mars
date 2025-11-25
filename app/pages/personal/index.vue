<template>
  <div
    class="w-full h-[75vh] rounded-[20px] p-[20px]"
    style="
      background: linear-gradient(
        90deg,
        #ffcc30,
        #ff8331,
        #02ff8b,
        #22bbee,
        #3d7af9
      );
    "
  >
    <div>
      <el-image
        v-if="$pb.authStore.model?.avatar"
        :src="$pb.files.getUrl($pb.authStore.model, $pb.authStore.model.avatar)"
        alt="avatar"
        class="w-[10vw] aspect-[1] rounded-[50%]"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: "personal",
});

const { $pb } = useNuxtApp();
const user = $pb.authStore.model;
</script>