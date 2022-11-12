<template>
  <svg
    fill="none"
    stroke="currentColor"
    class="w-6 h-6 inline-block"
    :viewBox="`0 0 ${icon.size} ${icon.size}`"
  >
    <path
      v-for="(path, i) in icon.paths"
      :key="i"
      :d="path"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import icons, { IconNames } from './icons';

const props = defineProps<{
  name: IconNames;
}>();

const icon = computed(() => icons[props.name]);
</script>
