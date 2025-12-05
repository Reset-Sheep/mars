<template>
  <div class="h-[100vh] bg-[#000] w-full flex justify-center items-center">
    <div class="w-[70vw]">
      <div
        class="bg-[#ffc21e] flex justify-center gap-[10px] pt-[10px] w-[calc(20vw+20px)]"
      >
        <div
          class="text-[34px] text-[#141415]"
          style="font-family: 'zhengkuHeavy'"
        >
          火星资讯
        </div>
        <div
          class="text-[30px] text-[#fff] bg-[#141415] leading-[30px] h-max px-[20px] py-[10px] cursor-pointer"
          style="font-family: 'zhengkuHeavy'"
        >
          查看更多
        </div>
      </div>
      <div class="bg-[#ffc21e] w-full flex gap-[10px] p-[10px]">
        <div>
          <div
            class="bg-[#141415] w-[20vw] h-[60vh] px-[30px] py-[20px]"
            v-my-loading="loading"
          >
            <div v-if="articles?.length" class="flex flex-col gap-[10px]">
              <div
                class="bg-[#1c1c1c] w-full py-[5px] px-[10px] cursor-pointer"
                v-for="(i, index) in articles"
                :key="index"
                @click="handleNews(index)"
              >
                <div
                  class="text-[#ffc21e] text-[20px] border-b-[3px] border-[#ffc21e] flex justify-between"
                  style="font-family: 'zhengkuMedium'"
                >
                  <div>{{ i.author }}</div>
                  <div>{{ moment(i.created).format("YYYY-MM-DD") }}</div>
                </div>
                <div class="mt-[3px]">
                  <el-text
                    class="w-full mb-2 !text-[#fff] !text-[25px] leading-[25px]"
                    truncated
                    style="font-family: 'zhengkuMedium'"
                  >
                    {{ i.title }}
                  </el-text>
                </div>
              </div>
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
                {{ selectArticle?.author }}
              </div>
              <div class="flex">
                <div
                  class="bg-[#ffc21e] w-max border-b-[3px] border-l-[3px] border-[#1c1c1c] px-[3px]"
                  style="font-family: 'zhengkuMedium'"
                >
                  {{ selectArticle?.type }}
                </div>
                <div
                  class="bg-[#ffc21e] w-max border-b-[3px] border-l-[3px] border-[#1c1c1c] px-[3px]"
                  style="font-family: 'zhengkuMedium'"
                >
                  {{ moment(selectArticle?.created).format("YYYY-MM-DD") }}
                </div>
              </div>
            </div>
            <div
              class="text-[#fff] w-full text-[30px] text-center"
              style="font-family: 'zhengkuHeavy'"
            >
              {{ selectArticle?.title }}
            </div>
            <el-scrollbar height="56vh" class="px-[10px]">
              <div class="text-[#fff]" v-html="selectArticle?.content"></div>
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
const articles = ref<any>([]);
const selectArticleIndex = ref<number>(0);

const selectArticle = computed(() => {
  return articles.value[selectArticleIndex.value];
});

const handleNews = (index: number) => {
  selectArticleIndex.value = index;
};

onMounted(async () => {
  const records = await $pb.collection("article").getList(1, 6, {
    sort: "-created",
  });
  articles.value = records.items;
  loading.value = false;
});
</script>