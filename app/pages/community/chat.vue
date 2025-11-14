<template>
  <ChatHall
    room-title="MARS 聊天大厅"
    :messages="messages"
    :current-user-id="1"
    :online-count="3"
    @send="handleSend"
  />
</template>

<script setup>
import ChatHall from '@/components/ChatHall.vue'
import { ref } from 'vue'

const messages = ref([
  { userId: 2, name: '小林', text: '大家好~', avatar: 'https://i.pravatar.cc/40?img=2' },
  { userId: 1, name: '我', text: '嗨，欢迎加入！', avatar: 'https://i.pravatar.cc/40?img=1' },
  { userId: 3, name: '火星粉', text: '好激动，今晚演唱会！', avatar: 'https://i.pravatar.cc/40?img=3' },
])

function handleSend(text) {
  messages.value.push({
    userId: 1,
    name: '我',
    text,
    avatar: 'https://i.pravatar.cc/40?img=1',
  })
}

definePageMeta({
  layout: 'community'
})
</script>
