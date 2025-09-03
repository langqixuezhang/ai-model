<template>
  <div class="ai-chat">
    <div class="chat-container">
      <div class="chat-messages" ref="messagesContainer">
        <div v-for="(message, index) in messages" :key="index" :class="['message', message.type]">
          <div class="message-avatar">
            {{ message.type === 'user' ? '👤' : '🤖' }}
          </div>
          <div class="message-content">
            <div class="message-text">{{ message.content }}</div>
            <div class="message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>
      </div>

      <div class="chat-input">
        <div class="input-container">
          <textarea
            v-model="inputMessage"
            @keydown.enter.prevent="sendMessage"
            placeholder="输入你的问题..."
            class="message-input"
            rows="3"
          ></textarea>
          <button @click="sendMessage" :disabled="!inputMessage.trim() || loading" class="send-btn">
            {{ loading ? '发送中...' : '发送' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, nextTick, onMounted } from 'vue'

  export default {
    name: 'AiChatPage',
    setup() {
      const messages = ref([
        {
          type: 'ai',
          content: '你好！我是AI助手，有什么可以帮助你的吗？',
          timestamp: new Date(),
        },
      ])

      const inputMessage = ref('')
      const loading = ref(false)
      const messagesContainer = ref(null)

      const sendMessage = async () => {
        if (!inputMessage.value.trim() || loading.value) return

        const userMessage = {
          type: 'user',
          content: inputMessage.value.trim(),
          timestamp: new Date(),
        }

        messages.value.push(userMessage)
        inputMessage.value = ''
        loading.value = true

        // 模拟AI回复
        setTimeout(() => {
          const aiMessage = {
            type: 'ai',
            content: `我收到了你的消息："${userMessage.content}"`,
            timestamp: new Date(),
          }
          messages.value.push(aiMessage)
          loading.value = false
          scrollToBottom()
        }, 1000)
      }

      const scrollToBottom = () => {
        nextTick(() => {
          if (messagesContainer.value) {
            messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
          }
        })
      }

      const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleTimeString('zh-CN', {
          hour: '2-digit',
          minute: '2-digit',
        })
      }

      onMounted(() => {
        scrollToBottom()
      })

      return {
        messages,
        inputMessage,
        loading,
        messagesContainer,
        sendMessage,
        formatTime,
      }
    },
  }
</script>

<style scoped>
  .ai-chat {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .chat-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    overflow: hidden;
  }

  .chat-messages {
    flex: 1;
    padding: 20px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .message {
    display: flex;
    gap: 12px;
    align-items: flex-start;
  }

  .message.user {
    flex-direction: row-reverse;
  }

  .message-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background: #f1f5f9;
    flex-shrink: 0;
  }

  .message.user .message-avatar {
    background: #3b82f6;
    color: white;
  }

  .message-content {
    max-width: 70%;
  }

  .message.user .message-content {
    text-align: right;
  }

  .message-text {
    background: #f8fafc;
    padding: 12px 16px;
    border-radius: 18px;
    line-height: 1.5;
    word-wrap: break-word;
  }

  .message.user .message-text {
    background: #3b82f6;
    color: white;
  }

  .message-time {
    font-size: 12px;
    color: #94a3b8;
    margin-top: 4px;
  }

  .chat-input {
    padding: 20px;
    border-top: 1px solid #e2e8f0;
    background: #f8fafc;
  }

  .input-container {
    display: flex;
    gap: 12px;
    align-items: flex-end;
  }

  .message-input {
    flex: 1;
    border: 1px solid #d1d5db;
    border-radius: 8px;
    padding: 12px;
    font-size: 14px;
    resize: none;
    font-family: inherit;
  }

  .message-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .send-btn {
    padding: 12px 24px;
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
  }

  .send-btn:hover:not(:disabled) {
    background: #2563eb;
  }

  .send-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
</style>
