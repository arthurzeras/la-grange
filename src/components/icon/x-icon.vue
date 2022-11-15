<template>
  <svg
    fill="none"
    stroke="currentColor"
    class="w-6 h-6 inline-block"
    :viewBox="`0 0 ${size} ${size}`"
    :class="{ 'animate-spin': props.spin }"
  >
    <path
      v-for="(path, i) in icon.paths"
      :key="i"
      :d="path"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke-width="icon.stroke || '2'"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import icons, { IconNames } from './icons';

const props = defineProps<{
  spin?: boolean;
  name: IconNames;
}>();

const icon = computed(() => icons[props.name]);
const size = computed(() => icon.value.size || '24');
</script>
