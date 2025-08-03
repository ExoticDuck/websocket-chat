<template>
  <div :class="$style.container">
    <div :class="$style.messages">
      <Message
        v-for="messageItem in messages"
        :key="messageItem.id"
        :author="messageItem.author"
        :isYours="messageItem.isYours"
        :text="messageItem.text"
        :sentAt="messageItem.sentAt"
      />
    </div>
    <div :class="$style.input_container">
      <NCard :contentClass="$style.n_card">
        <NInput
          v-model:value="newMessage"
          autofocus
          placeholder="Enter your message"
        />
        <NButton
          color="#8a2be2"
          @click="sendMessage"
          >Send</NButton
        >
      </NCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Message from '@/components/Message.vue'
import { formatUtcToLocalTime } from '@/utils'
import { NButton, NCard, NInput } from 'naive-ui'
import { io } from 'socket.io-client'
import { onMounted, ref } from 'vue'

const newMessage = ref('')

type MessageT = {
  id: string
  isYours: boolean
  author: string
  text: string
  sentAt: string
}
const messages = ref<MessageT[]>([])

let socket: any | null = null

const sendMessage = () => {
  const username = sessionStorage.getItem('name')
  if (newMessage.value.trim() !== '') {
    const message = {
      username: username,
      text: newMessage.value
    }
    socket.emit('message', message)
    newMessage.value = ''
  }
}

onMounted(() => {
  socket = io('http://localhost:3000')
  // eslint-disable-next-line no-console
  socket.on('connect', () => console.log('Connected', socket.id))
  socket.on('message', (data: { text: string; username: string; sentAt: string }) => {
    const isYours = data.username === sessionStorage.getItem('name')
    messages.value = [
      ...messages.value,
      {
        isYours: isYours,
        text: data.text,
        author: data.username,
        sentAt: formatUtcToLocalTime(data.sentAt),
        id: data.sentAt
      }
    ]
  })
  socket.emit('message', { username: sessionStorage.getItem('name'), text: 'привет' })
})
</script>

<style lang="scss" module>
.container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .messages {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    justify-content: flex-end;
  }

  .input_container {
    position: fixed;
    bottom: 0;
    left: 0;

    min-width: 100%;
    .n_card {
      display: flex;
      flex-direction: row;
      gap: 8px;
    }
  }
}
</style>
