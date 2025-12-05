<template>
  <div class="h-[100vh] bg-[#000] w-full flex justify-center items-center">
    <div class="w-[70vw]">
      <div
        class="bg-[#ffc21e] flex justify-center gap-[10px] pt-[10px] w-[calc(20vw+20px)]"
      >
        <div
          class="text-[30px] text-[#141415]"
          style="font-family: 'zhengkuHeavy'"
        >
          重生之成为李总的第三根腿毛
        </div>
      </div>
      <div class="bg-[#ffc21e] w-full flex gap-[10px] p-[10px]">
        <div>
          <div
            class="bg-[#141415] w-[20vw] h-[60vh] px-[30px] py-[20px]"
            v-my-loading="loading"
          >
            <div class="flex flex-col gap-[10px]">
            </div>
          </div>
          <div
            class="text-[#141415] text-[3.4vw] leading-[2vw] text-center"
            style="font-family: 'zhengkuHeavy'"
          >
            HUACHENYU
          </div>
        </div>
        <div class="flex-1">
          <div
            class="bg-[#0060eb] w-full h-full border-[3px] border-[#1c1c1c]"
            v-my-loading="loading"
          >
            <div class="w-full flex justify-between">
              <div
                class="bg-[#ffc21e] w-max border-b-[3px] border-r-[3px] border-[#1c1c1c] px-[3px]"
                style="font-family: 'zhengkuMedium'"
              >
                213
              </div>
              <div class="flex">
                <div
                  class="bg-[#ffc21e] w-max border-b-[3px] border-l-[3px] border-[#1c1c1c] px-[3px]"
                  style="font-family: 'zhengkuMedium'"
                >
                  123
                </div>
                <div
                  class="bg-[#ffc21e] w-max border-b-[3px] border-l-[3px] border-[#1c1c1c] px-[3px]"
                  style="font-family: 'zhengkuMedium'"
                >
                  123
                </div>
              </div>
            </div>
            <div
              class="text-[#fff] w-full text-[30px] text-center"
              style="font-family: 'zhengkuHeavy'"
            >
              213
            </div>
            <el-scrollbar height="56vh" class="px-[10px]">
              <!-- <div class="text-[#fff]" v-html="selectArticle?.content"></div> -->
            </el-scrollbar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import moment from "moment";
const { $pb } = useNuxtApp();

const loading = ref(true);
</script>