<template>
  <div class="personal">
    <a-carousel arrows dots-class="slick-dots slick-thumb" dot-position="right">
      <template #customPaging="{ i }">
        <a class="w-[90px] aspect-[4151/2391]">
          <img
            :src="images[i]"
            class="w-[90px] aspect-[4151/2391] object-cover rounded"
          />
        </a>
      </template>

      <!-- 每张轮播图 -->
      <a-carousel-item v-for="(img, index) in images" :key="index">
        <div
          class="w-[60vw] aspect-[4151/2391] rounded-[20px] p-[20px] bg-cover bg-no-repeat"
          :style="{ backgroundImage: `url(${img})` }"
          v-if="userInfo"
        >
          <div class="w-full h-full flex justify-end">
            <div class="w-[60%] h-full relative">
              <div class="flex gap-[10px]">
                <div
                  class="relative flex items-center justify-center w-[5vw] aspect-[1] rounded-[50%]"
                >
                  <el-image
                    v-if="userInfo?.avatar"
                    :src="$pb.files.getUrl(userInfo, userInfo.avatar)"
                    alt="avatar"
                    class="w-[4vw] aspect-[1] rounded-[50%] mt-[5px]"
                  />
                  <div
                    class="absolute top-[0] left-[0] bg-[url('@/assets/img/person/avatar.png')] bg-no-repeat bg-cover w-full aspect-[1] rounded-[50%]"
                  ></div>
                </div>
                <div>
                  <div class="bg-[#3d7af9] text-[#fff] px-[5px] py-[3px] rounded-[16px] text-[16px]" style="font-family: 'zhengkuBold';">
                    MBTI
                  </div>
                </div>
              </div>
              <div
                class="text-[#fff] text-[5vw] leading-[5vw] absolute top-0 right-0"
                style="font-family: 'zhengkuHeavy'"
              >
                <a-qrcode
                  error-level="H"
                  :size="140"
                  :iconSize="40"
                  color="#fff"
                  value="https://www.antdv.com"
                  :icon="$pb.files.getUrl(userInfo, userInfo.avatar)"
                />
              </div>
              <div
                class="text-[#fff] text-[5vw] leading-[5vw] absolute bottom-0 right-0"
                style="font-family: 'zhengkuHeavy'"
              >
                {{ userInfo.name }}
              </div>
            </div>
          </div>
        </div>
      </a-carousel-item>
    </a-carousel>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "personal",
});

// 导入图片（Nuxt 必须这样写才会处理资源）
import Img2 from "~/assets/img/person/图片2.avif";
import Img3 from "~/assets/img/person/图片3.avif";
import Img4 from "~/assets/img/person/图片4.avif";
const { $pb } = useNuxtApp();
// 轮播图片数组
const images = [Img3, Img2, Img4];

const route = useRoute();

const userInfo = ref();
// 获取用户信息
async function getUser() {
  const id = route.params?.id;
  if (!id) return;
  const user = await $pb.collection("users").getOne(id.toString(), {
    expand: "avatar",
  });
  if (!user?.id) return;
  console.log(user);
  userInfo.value = user;
}

onMounted(() => {
  getUser();
});
</script>


<style lang="scss">
.personal {
  .slick-dots,
  li {
    width: 90px !important;
    height: 100px !important;
  }
}
</style>