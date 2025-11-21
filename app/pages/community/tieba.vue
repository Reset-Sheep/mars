<template>
  <div
    class="relative flex w-full h-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl"
  >
    <el-scrollbar class="w-full !z-[100]" :height="`calc(90vh - 70px)`">
      <div class="grid grid-cols-6 gap-4">
        <div class="flex flex-col gap-[10px]">
          <div
            class="bg-[#ff8331] flex-1 w-full p-[10px] flex items-center justify-center rounded-[16px] cursor-pointer text-[#fff] text-[30px]"
            style="font-family: 'zhengkuBold'"
            @click="newPost = true"
          >
            发布新帖子
          </div>
          <div
            class="bg-[#ffcc30] flex-1 w-full p-[10px] flex items-center justify-center rounded-[16px] cursor-pointer text-[#fff] text-[30px]"
            style="font-family: 'zhengkuBold'"
          >
            查看我的贴子
          </div>
        </div>

        <div
          class="bg-[#3d7af9] w-full p-[10px] rounded-[16px] cursor-pointer h-[170px]"
          v-for="(i, index) in posts"
          :key="index"
          @click="getInfoPosts(i)"
        >
          <div class="flex gap-[10px] items-center">
            <el-image
              alt=""
              :src="$pb.files.getUrl(i.expand.author, i.expand.author.avatar)"
              class="w-[40px] aspect-[1] rounded-[50%]"
            ></el-image>
            <div>
              <div class="text-[#fff]" style="font-family: 'zhengkuMedium'">
                {{ i.expand.author.name }}
              </div>
              <div class="text-[12px] text-[#cfcfcf]">
                发布于：{{ moment(i.created).format("YYYY-MM-DD HH:mm") }}
              </div>
            </div>
          </div>
          <div>
            <el-text
              line-clamp="2"
              class="!text-[#fff] !text-[20px] break-all"
              style="font-family: 'zhengkuBold'"
              tag="b"
              >{{ i.title }}</el-text
            >
          </div>
          <div>
            <el-text
              line-clamp="3"
              class="!text-[#fff] !text-[14px] break-all"
              >{{ i.content }}</el-text
            >
          </div>
        </div>
      </div>
      <a-modal v-model:open="open" centered :footer="null" width="60%">
        <template #title>
          <div class="flex items-center gap-2">
            <div class="flex gap-[10px] items-center">
              <el-image
                alt=""
                :src="
                  $pb.files.getUrl(
                    postDetail.expand.author,
                    postDetail.expand.author.avatar
                  )
                "
                class="w-[40px] aspect-[1] rounded-[50%]"
              ></el-image>
              <div>
                <div style="font-family: 'zhengkuMedium'; font-weight: 400">
                  {{ postDetail.expand.author.name }}
                </div>
                <div
                  class="text-[12px] text-[#818181]"
                  style="font-weight: 400"
                >
                  发布于：{{
                    moment(postDetail.created).format("YYYY-MM-DD HH:mm")
                  }}
                </div>
              </div>
            </div>
          </div>
        </template>
        <div class="flex gap-[20px]">
          <div class="flex-1">
            <div class="text-[30px]" style="font-family: 'zhengkuHeavy'">
              {{ postDetail.title }}
            </div>
            <el-scrollbar style="height: 75vh; padding: 0 24px 0 0">
              <div class="text-[18px]">
                {{ postDetail.content }}
              </div>
            </el-scrollbar>
          </div>
          <div style="width: 35%">
            <div class="mb-[20px] flex gap-[10px]">
              <a-input v-model:value="value" placeholder="写下你的评论..." />
              <a-button type="primary" @click="submitComment">发布</a-button>
            </div>
            <a-card :bodyStyle="{ padding: 0 }">
              <div class="pl-[20px] pt-[20px]">
                {{ beforeComments.length }} 条评论
              </div>
              <el-scrollbar style="height: 70vh; padding: 0 24px">
                <div>
                  <Comments :post-id="postDetail.id" :comments="comments" />
                </div>
              </el-scrollbar>
            </a-card>
          </div>
        </div>
      </a-modal>
      <a-modal
        v-model:open="newPost"
        title="创建新帖子"
        centered
        :footer="null"
        width="600px"
      >
        <a-form
          :model="newPostFormState"
          name="basic"
          layout="vertical"
          autocomplete="off"
          ref="formRef"
        >
          <a-form-item
            label="标题"
            name="title"
            :rules="[{ required: true, message: '请输入标题' }]"
          >
            <a-input
              v-model:value="newPostFormState.title"
              placeholder="请输入标题"
            />
          </a-form-item>

          <a-form-item
            label="内容"
            name="content"
            :rules="[{ required: true, message: '请输入内容' }]"
          >
            <a-textarea
              v-model:value="newPostFormState.content"
              placeholder="请输入内容"
              allow-clear
            />
          </a-form-item>
          <a-form-item>
            <div class="flex justify-center w-full">
              <a-button type="primary" html-type="submit" @click="submitNewPost"
                >发布</a-button
              >
            </div>
          </a-form-item>
        </a-form>
      </a-modal>
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
import moment from "moment";
import { message } from "ant-design-vue";
import Comments from "~/components/Comment/Comments.vue";
const { $pb } = useNuxtApp();
const comments = ref([]);
const formRef = ref();
const newPost = ref(false);
const posts = ref<any>([]);
const open = ref(false);
const value = ref("");
const beforeComments = ref<any>([]);

const newPostFormState = ref({
  title: "",
  content: "",
});

const submitNewPost = async () => {
  await $pb
    .collection("posts")
    .create({
      title: newPostFormState.value.title,
      content: newPostFormState.value.content,
      author: $pb.authStore.model?.id,
    })
    .then((res: any) => {
      if (res?.id) {
        loadAllComments();
        message.success("创建成功");
        newPost.value = false;
        formRef.value?.resetFields();
      } else {
        message.error("创建失败");
      }
    });
};
const submitComment = async () => {
  await $pb.collection("comments").create({
    author: $pb.authStore.model?.id,
    post: postDetail.value.id,
    content: value.value,
  });
  value.value = "";
  loadComments();
};
async function loadComments() {
  beforeComments.value = await $pb.collection("comments").getFullList({
    filter: `post="${postDetail.value.id}"`,
    expand: "author,parent,parent.author",
    sort: "-created",
  });
  comments.value = buildCommentTree(beforeComments.value);
  console.log(comments.value);
}
function buildCommentTree(items: any) {
  const map: any = {};

  // 先建立 map
  items.forEach((item: any) => {
    map[item.id] = {
      ...item,
      author: item.expand?.author,
      children: [],
    };
  });

  const roots: any = [];

  items.forEach((item: any) => {
    // 如果没有 parent → 一级评论
    if (!item.parent) {
      roots.push(map[item.id]);
    } else {
      const parent = map[item.parent];

      if (!parent) {
        // 找不到 parent，当一级处理
        roots.push(map[item.id]);
      } else {
        // 只要 parent 有 parent → 说明 parent 不是一级 → 强制加入到一级评论的 children
        if (parent.parent) {
          // ------------ 关键逻辑：把三级、四级……全部塞到顶级父亲的 children ------------
          const rootParent = map[parent.parent] ?? parent;
          rootParent.children.push(map[item.id]);
        } else {
          // parent 是一级评论 → 正常作为二级
          parent.children.push(map[item.id]);
        }
      }
    }
  });

  return roots;
}

async function loadAllComments() {
  posts.value = await $pb.collection("posts").getFullList({
    expand: "author",
    sort: "-created",
  });
}

const postDetail = ref<any>({});
const getInfoPosts = async (i: any) => {
  postDetail.value = i;
  await loadComments();
  open.value = true;
};

onMounted(() => {
  loadAllComments();
});
</script>