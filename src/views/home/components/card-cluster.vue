<template>
  <router-link
    :to="routeLink"
    class="border bg-blue-50 rounded-2xl px-6 py-4 hover:bg-blue-100"
  >
    <strong class="font-bold block text-center">
      {{ props.cluster.name }}
    </strong>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  cluster: {
    url: string;
    name: string;
  };
}>();

const routeLink = computed(() => ({
  name: 'deployments.list',
  params: {
    cluster: props.cluster.name,
  },
}));
</script>
