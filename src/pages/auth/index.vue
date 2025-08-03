<!-- eslint-disable vue/attributes-order -->
<template>
  <div :class="$style.container">
    <NCard title="Log in">
      <NSpace vertical>
        <NInput
          v-model:value="name"
          autofocus
          placeholder="Enter your name"
        ></NInput>
        <NButton
          color="#8a2be2"
          @click="handleAuth"
          >Enter chat</NButton
        >
      </NSpace>
    </NCard>
  </div>
</template>

<script lang="ts" setup>
import { NButton, NCard, NInput, NSpace } from 'naive-ui'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const name = ref('')

const handleAuth = () => {
  sessionStorage.setItem('name', name.value)
  router.push('/chat')
}
</script>

<style lang="scss" module>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
</style>
