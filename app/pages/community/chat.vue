<template>
  <ChatHall
    room-title="MARS 聊天大厅"
    :messages="messages"
    :current-user-id="$pb.authStore.model.id"
    :online-count="3"
    @send="handleSend"
  />
</template>

<script setup>
import ChatHall from "@/components/ChatHall.vue";
import { ref } from "vue";
const { $pb } = useNuxtApp();
const messages = ref([]);
const loadHistory = async () => {
  const res = await $pb.collection("messages").getList(1, 200, {
    sort: "created",
    expand: "sender",
  });
  return res.items;
};

onMounted(async() => {
  messages.value = await loadHistory()
  subscribeMessages();
});

onUnmounted(() => {
  $pb.collection("messages").unsubscribe("*");
});

const subscribeMessages = () => {
  $pb.collection("messages").subscribe("*", async (e) => {
    if (e.action === "create") {
      // 获取完整消息含用户信息
    const full = await $pb.collection("messages").getOne(e.record.id, {
      expand: "sender"
    });
    messages.value.push(full);
    }
  });
};


function handleSend(text) {
  // messages.value.push({
  //   userId: 1,
  //   name: "我",
  //   text,
  //   avatar: "https://i.pravatar.cc/40?img=1",
  // });
  sendMessage(text);
}

const sendMessage = async (text) => {
  if (!text.trim()) return;

  await $pb.collection("messages").create({
    sender: $pb.authStore.model.id,
    content: text,
    type: "text"
  });
};


definePageMeta({
  layout: "community",
});
</script>
