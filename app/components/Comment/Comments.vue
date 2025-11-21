<script setup>
import { ref } from "vue";
import CommentItem from "./CommentItem.vue";
const { $pb } = useNuxtApp();
const props = defineProps({
  comments: Array,
  postId:String
});

const activeReplyId = ref(null);
const replyText = ref("");

function handleReplyClick(id) {
  activeReplyId.value = id;
  replyText.value = "";
}

// 🚀 用来递归找到目标评论
function findRootComment(list, id) {
  for (const c of list) {
    if (c.id === id) return c; // 点的本身就是一级
    if (c.children) {
      const found = findRootComment(c.children, id);
      if (found) return c; // 返回找到它的父级
    }
  }
  return null;
}

function findCommentById(list, id) {
  for (const c of list) {
    if (c.id === id) return c;
    if (c.children) {
      const found = findCommentById(c.children, id);
      if (found) return found;
    }
  }
  return null;
}

// 🚀 提交回复：这里负责把新的回复 append 到 children
async function submitReply({ replyToId, replyText }) {
  const user = $pb.authStore.model;
  // 找到顶级父级评论
  const root = findRootComment(props.comments, replyToId);
  //   console.log("最终应追加到一级评论:", root);
  const comment = findCommentById(props.comments, replyToId);

  await $pb.collection("comments").create({
    author: $pb.authStore.model?.id,
    post: props.postId,
    content: replyText,
    parent: replyToId,
  });

  if (root) {
    if (!root.children) root.children = [];

    root.children.unshift({
      id: Date.now(),
      content: replyText,
      parent: replyToId, // 保存回复目标
      expand: {
        author: {
          ...user
        },
        parent: {
          expand: {
            author: {
              name: comment.expand.author.name,
            },
          },
        },
      },
    });
  }

  //   replyText = "";
  activeReplyId.value = null;
}
</script>

<template>
  <div>
    <CommentItem
      v-for="c in comments"
      :key="c.id"
      :comment="c"
      :active-reply-id="activeReplyId"
      :reply-text="replyText"
      @reply-click="handleReplyClick"
      @submit-reply="submitReply"
    />
  </div>
</template>
