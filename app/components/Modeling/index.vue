<template>
  <div class="grid grid-cols-8 gap-4 w-max">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="bg-[#3d7af9] p-[10px] rounded-[10px] relative"
    >
      <img
        :src="$pb.files.getUrl(item, item?.image, { thumb: '152x228' })"
        class="rounded-[10px]"
      />
      <!-- <div class="text-[#fff] text-[12px] mt-[4px]">编号:{{ item?.id }}</div> -->
      <div class="flex justify-between items-center">
        <div class="text-[#fff] text-[12px] mt-[4px]">票数：{{ item?.votes }}</div>
        <div><el-rate v-model="values[index]" :disabled="isDisabled" :max="1" @change="(val) => handleChange(val, index)" /></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $pb } = useNuxtApp();
const values = ref<number[]>([]);
const list = ref([]);
const isDisabled = computed(()=>{
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
