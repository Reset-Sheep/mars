<template>
    <div class="">
        <div class="bg-[#000] rounded-[10px] py-[10px] px-[20px] w-max award-border" v-for="i in awards" :key="i.title">
            <div class="border-[1px] border-solid rounded-[8px] p-[10px] w-max flex flex-col gap-[10px]" :style="{ borderColor: i.color }">
                <div class="flex justify-between items-center">
                    <div :style="{ backgroundColor: i.color }" style="font-family: 'zhengkuBold'"
                        class="text-[25px] py-[8px] px-[10px] leading-[25px] rounded-[4px] text-center">
                        {{ i.subTitle }}
                    </div>
                    <div class="py-10px px-20px text-[#fff] leading-[50px] ml-[10px]"
                    :class="i.text"
                        style="font-family: 'zhengkuBold'">
                        {{ i.subTitle2 }}
                    </div>
                </div>
                <div class="text-[#000] rounded-[8px] w-[330px] leading-[40px] py-[10px]" :style="{ backgroundColor: i.color2 }" style="font-family: 'zhengkuBold'">
                    <div class="text-center text-[30px]">
                        {{ i.engTitle }}
                    </div>
                    <div class="text-center text-[40px]">
                        {{ i.title }}
                    </div>
                </div>
                <div>
                    <div class="text-[#fff] text-[30px] leading-[30px]" style="font-family: 'zhengkuBold'">
                        {{ i.year }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
const awards = [
    {
        title: "美国缪斯设计奖",
        engTitle: "MUSE Design Awards",
        color: "#ffcc30",
        color2:"#fff",
        subTitle: "国际奖项协会",
        subTitle2: "铂金奖",
        text:"text-[50px]",
        year:"三年获奖"
    },
    {
        title: "美国好设计奖",
        engTitle: "American Good Design",
        color: "#22bbee",
        color2:"#3d7af9",
        subTitle: "国际奖项协会",
        subTitle2: "铂金奖",
        text:"text-[50px]",
        year:"三年获奖"
    },
    {
        title: "法国设计奖",
        engTitle: "French Design Awards",
        color: "#ff8331",
        color2: "#00e1e7",
        subTitle: "国际奖项协会",
        subTitle2: "金奖",
        text:"text-[50px]",
        year:"三年获奖"
    },
    {
        title: "iF设计奖",
        engTitle: "iF Design Awards",
        color: "#02ff8b",
        color2: "#ffcc30",
        subTitle: "汉诺威工业设计论坛",
        subTitle2: "双冠",
        text:"text-[35px]",
        year:"两年获奖"
    }
]
</script>

<style>
</style>