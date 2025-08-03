<template>
  <div :class="[$style.message, { [$style.your_message]: props.isYours }]">
    <div :class="$style.author">{{ props.author }}</div>
    <div :class="$style.text">{{ props.text }}</div>
    <div :class="$style.sent_at">{{ props.sentAt }}</div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isYours: boolean
  author: string
  text: string
  sentAt: string
}>()
</script>

<style lang="scss" module>
.message {
  padding: 4px 8px;
  background-color: #ff69b4;
  border-radius: 10px;
  color: var(--vt-c-white-soft);
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-bottom: 8px;
  min-width: 150px;

  &.your_message {
    align-self: flex-end;
  }

  .author {
    font-size: 10px;
    align-self: flex-start;
  }

  .text {
    align-self: flex-start;
  }

  .sent_at {
    align-self: flex-end;
  }
}
</style>
