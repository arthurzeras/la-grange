<template>
  <article class="flex flex-row gap-10 w-full justify-center">
    <card-cluster
      v-for="cluster in clusters"
      :key="cluster.name"
      :cluster="cluster"
      class="basis-1/4"
    />
  </article>
</template>

<script setup lang="ts">
import { useHttp } from '@/composables';
import { computed, onMounted } from 'vue';
import CardCluster from './card-cluster.vue';

const { execute, response } = useHttp();

onMounted(() => execute({ url: 'cluster' }));

const clusters = computed(() => {
  const list = response.value?.data;

  if (!list?.length) {
    return [];
  }

  return list.map((cluster: any) => ({
    url: cluster.url,
    name: cluster.name,
  }));
});
</script>
