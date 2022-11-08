<template>
  <a href="#" class="border bg-blue-50 rounded-2xl px-6 py-4 hover:bg-blue-100">
    <strong class="font-bold block text-center">
      {{ props.cluster.name }}
    </strong>

    <!-- TODO: add some metadata -->
    <!-- <div class="flex gap-4">
      <small>CPU: 0.1/4 cores</small>
      <small>Mem: 70 MiB/7.79 GiB</small>
      <small>Pods: 10/1231</small>
    </div> -->
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
