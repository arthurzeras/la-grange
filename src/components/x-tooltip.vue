<template>
  <div class="tooltip relative">
    <div ref="content" :title="message" class="content">
      {{ message }}
    </div>

    <div ref="slot">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

onMounted(() => alignCenter());

defineProps<{ message: string }>();

const slot = ref<HTMLDivElement>();
const content = ref<HTMLDivElement>();

const alignCenter = () => {
  if (content.value && slot.value) {
    const w = Math.round(content.value.clientWidth) || 0;
    const halfWidth = Math.round(w / 2);
    const slotW = Math.round(slot.value.clientWidth) || 0;
    const slotWHalfWidth = Math.round(slotW / 2);
    const tooltipTranslate = halfWidth - slotWHalfWidth;

    content.value.style.transform = `translateX(-${tooltipTranslate}px)`;
  }
};
</script>

<style scoped>
.tooltip:hover .content {
  opacity: 1;
  z-index: 1;
}

.content {
  opacity: 0;
  z-index: -1;
  transition: all 0.4s;
}

@layer {
  .content {
    @apply absolute -top-8 whitespace-nowrap overflow-hidden
      text-ellipsis max-w-xl block bg-gray-900 rounded
      text-gray-50 px-2 py-1;
  }
}
</style>
