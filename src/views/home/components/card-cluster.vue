<template>
  <a href="#" class="border bg-blue-50 rounded-2xl px-6 py-4 hover:bg-blue-100">
    <strong class="font-bold block text-center">
      {{ props.cluster.name }}
    </strong>
  </a>
</template>

<script setup lang="ts">
const props = defineProps<{
  cluster: {
    id: string;
    name: string;
    limits: Record<string, string>;
    requested: Record<string, string>;
  };
}>();
</script>
