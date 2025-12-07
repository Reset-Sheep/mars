<template>
  <div>
    <div class="relative w-full">
      <div class="text-[100px] absolute top-0 left-0 z-[1] w-full flex justify-center"
        style="font-family: 'zhengkuHeavy'">
        <span class="text-[#005feb]" style="
              text-shadow: -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff,
                3px 3px 0 #fff, -3px 0px 0 #fff, 3px 0px 0 #fff, 0px -3px 0 #fff,
                0px 3px 0 #fff;
            ">2025年造型</span>
        <span class="text-[#ffb202]" style="
              text-shadow: -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff,
                3px 3px 0 #fff, -3px 0px 0 #fff, 3px 0px 0 #fff, 0px -3px 0 #fff,
                0px 3px 0 #fff;
            ">十佳投票</span>
      </div>
      <div class="text-[100px] absolute top-[10px] left-0 z-[0]  w-full flex justify-center"
        style="font-family: 'zhengkuHeavy'">
        <span class="text-[#47f3ff]" style="
              text-shadow: -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff,
                3px 3px 0 #fff, -3px 0px 0 #fff, 3px 0px 0 #fff, 0px -3px 0 #fff,
                0px 3px 0 #fff;
            ">2025年造型</span>
        <span class="text-[#fa7c2f]" style="
              text-shadow: -3px -3px 0 #fff, 3px -3px 0 #fff, -3px 3px 0 #fff,
                3px 3px 0 #fff, -3px 0px 0 #fff, 3px 0px 0 #fff, 0px -3px 0 #fff,
                0px 3px 0 #fff;
            ">十佳投票</span>
      </div>
    </div>
    <div class=" mt-[200px]">
      <div class="text-[#fff] text-[12px] mb-[20px]">图片来源于“华晨宇工作室”官方微博</div>
      <div class="grid grid-cols-8 gap-4 w-max">
        <div v-for="(item, index) in list" :key="index" class="rounded-[10px] relative">
          <img :src="$pb.files.getUrl(item, item?.image, { thumb: '152x228' })" class="rounded-[10px]" />
          <!-- <div class="text-[#fff] text-[12px] mt-[4px]">编号:{{ item?.id }}</div> -->
          <div class="flex justify-between items-center">
            <div class="text-[#fff] text-[12px] mt-[4px]">票数：{{ item?.votes }}</div>
            <div><el-rate v-model="values[index]" :disabled="isDisabled" :max="1"
                @change="(val) => handleChange(val, index)" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $pb } = useNuxtApp();
const values = ref<number[]>([]);
const list = ref([]);
const isDisabled = computed(() => {
  if (values.value.filter(item => item === 1).length >= 3) {
    return true;
  }
  return false;
})
const handleChange = (val: number, index: number) => {
  values.value[index] = val ? 1 : 0;
}

async function getList() {
  const res = await $pb.collection("modeling2025").getFullList({
    sort: '-votes'
  });
  if (!res) {
    return;
  }
  list.value = res;
  // Initialize values array with 0s matching the list length
  values.value = new Array(res.length).fill(0);
}
onMounted(() => {
  getList();
});
</script>
