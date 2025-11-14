<template>
  <el-card class="chat-hall">
    <!-- 顶部标题栏 -->
    <div class="chat-header">
      <div class="online text-[#02ff8b]" v-if="onlineCount !== null">
        在线人数：{{ onlineCount }}
      </div>
    </div>

    <!-- 聊天内容 -->
    <div class="bg-[#242424] rounded-[20px] p-[20px]">
      <div class="message-area relative">
        <el-scrollbar ref="messageScroll" always>
          <div
            v-for="(msg, index) in messages"
            :key="index"
            class="message-item"
            :class="{ self: msg.userId === currentUserId }"
          >
            <el-avatar :size="36" :src="msg.avatar" />
            <div class="content">
              <div class="nickname">{{ msg.name }}</div>
              <div class="bubble">{{ msg.text }}</div>
            </div>
          </div>
        </el-scrollbar>
      </div>

      <!-- 输入框 -->
      <div class="chat-input">
        <el-input
          v-model="input"
          placeholder="输入消息..."
          type="textarea"
          :rows="2"
          @keyup.enter="sendMessage"
        />
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { ref, nextTick } from "vue";

const props = defineProps({
  roomTitle: { type: String, default: "聊天大厅" },
  currentUserId: { type: [String, Number], required: true },
  messages: { type: Array, default: () => [] },
  onlineCount: { type: Number, default: null },
});

const emit = defineEmits(["send"]);
const input = ref("");
const messageScroll = ref(null);

function sendMessage() {
  const text = input.value.trim();
  if (!text) return;
  emit("send", text);
  input.value = "";
  nextTick(() => {
    // 自动滚动到底部
    messageScroll.value?.setScrollTop(Number.MAX_SAFE_INTEGER);
  });
}

// onMounted(() => {
//     if (navigator.geolocation) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       const { latitude, longitude } = position.coords;
//       console.log(`当前位置：纬度 ${latitude}，经度 ${longitude}`);
//     },
//     (error) => {
//       console.error('获取地理位置失败：', error);
//     },
//     {
//       enableHighAccuracy: true, // 启用高精度（可能更慢）
//       timeout: 5000, // 超时时间
//       maximumAge: 0, // 不使用缓存
//     }
//   );
// } else {
//   console.error('当前浏览器不支持地理定位');
// }

// })
</script>

<style lang="scss">
.chat-hall {
  width: 100%;
  display: flex;
  flex-direction: column;
  &.el-card {
    background-color: #161616;
    border-radius: 20px;
    border: none;
  }
}

.chat-header {
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 20px;
  font-weight: 600;
}

.message-area {
  flex: 1;
  height: 60vh;
  overflow: hidden;
  padding: 12px 0;
  border-radius: 20px;
}

.message-item {
  display: flex;
  align-items: flex-start;
  margin: 10px 0;
  gap: 10px;
}

.message-item.self {
  flex-direction: row-reverse;
  text-align: right;
}

.message-item.self .content {
  align-items: flex-end;
}

.nickname {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin-bottom: 2px;
}

.bubble {
  background: #22bbee;
  border-radius: 8px;
  padding: 8px 12px;
  max-width: 70vw;
  word-wrap: break-word;
  white-space: pre-wrap;
  color: #fff;
}

.message-item.self .bubble {
  background: #3d7af9;
  color: #fff;
}

.chat-input {
  display: flex;
  gap: 8px;
  padding: 8px;
  align-items: center;
}
</style>
