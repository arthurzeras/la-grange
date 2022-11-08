<template>
  <article class="grid grid-cols-4 gap-10 w-full">
    <card-cluster
      v-for="cluster in clusters"
      :key="cluster.id"
      :cluster="cluster"
      class="group"
    />
  </article>
</template>

<script setup lang="ts">
import { useHttp } from '@/composables';
import { computed, onMounted } from 'vue';
import CardCluster from './card-cluster.vue';

const { execute, response } = useHttp();

onMounted(() => execute({ url: '/v3/clusters' }));

const clusters = computed(() => {
  const list = response.value?.data?.data;

  if (!list?.length) {
    return [];
  }

  return list.map((cluster: any) => ({
    id: cluster.id,
    name: cluster.name,
    limits: cluster.limits,
    requested: cluster.requested,
  }));
});
</script>
