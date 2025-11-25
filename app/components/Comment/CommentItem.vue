<script setup>
import { defineProps, defineEmits } from "vue";
// import { AComment, AAvatar, AButton, AInput } from 'ant-design-vue'
import moment from "moment";
import "moment/dist/locale/zh-cn";

moment.locale("zh-cn");

const props = defineProps({
  comment: Object,
  activeReplyId: Number,
  replyText: String,
});

const replyConetnt = ref("");
const { $pb } = useNuxtApp();
const emit = defineEmits(["reply-click", "submit-reply"]);
const reply = (comment) => {
  emit("reply-click", comment.id);
};

const postComment = (comment) => {
  emit("submit-reply", {
    replyToId: comment.id,
    replyText: replyConetnt.value,
  });
  replyConetnt.value = "";
};
</script>

<template>
  <a-comment>
    <template #actions>
      <a-tooltip :title="moment(comment.created).format('YYYY-MM-DD HH:mm')">
        <span>{{ moment(comment.created).fromNow() }}</span>
      </a-tooltip>
      <span @click="reply(comment)">回复</span>
    </template>

    <template #author>
      <a>{{ comment?.expand?.author?.name }}</a>
      <span class="ml-[10px]" v-if="comment?.parent != ''"
        >回复：<a>{{ comment?.expand?.parent?.expand?.author?.name }}</a></span
      >
    </template>
    <!-- <template #datetime>
      <a-tooltip :title="comment.created">
        <span>{{ moment(comment.created).fromNow() }}</span>
      </a-tooltip>
    </template> -->
    <template #avatar>
      <a-avatar
        :src="
          $pb.files.getUrl(comment.expand.author, comment.expand.author.avatar)
        "
      />
    </template>

    <template #content>
      <p>{{ comment.content }}</p>
    </template>

    <!-- 回复输入框（只显示在当前 active 的评论下面） -->
    <div v-if="activeReplyId === comment.id" style="margin-top: 12px">
      <a-input
        v-model:value="replyConetnt"
        :placeholder="`回复 @${comment.expand.author.name}`"
        style="margin-bottom: 8px"
      />

      <a-button type="primary" size="small" @click="postComment(comment)">
        发布回复
      </a-button>
    </div>

    <!-- 子评论 -->
    <CommentItem
      v-for="child in comment.children || []"
      :key="child.id"
      :comment="child"
      :active-reply-id="activeReplyId"
      :reply-text="replyText"
      @reply-click="emit('reply-click', $event)"
      @submit-reply="emit('submit-reply', $event)"
    />
  </a-comment>
</template>
