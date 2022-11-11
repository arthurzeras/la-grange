<template>
  <h1>Deployments view</h1>

  <card-namespace
    v-for="(_deployments, name) in byNamespace"
    :key="name"
    :name="name"
    :deployments="_deployments"
  />
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useHttp } from '@/composables';
import { computed, onMounted } from 'vue';
import CardNamespace from './components/card-namespace.vue';

const route = useRoute();
const { execute, response } = useHttp();

onMounted(() => execute({ url: `${route.params.cluster}/deployment` }));

const deployments = computed(() => {
  const data = response.value?.data;

  if (!data?.items?.length) {
    return [];
  }

  return data.items;
});

const byNamespace = computed<Record<string, any[]>>(() => {
  return deployments.value.reduce(
    (namespaces: Record<string, any[]>, deployment: Record<string, any>) => {
      if (!(deployment.metadata.namespace in namespaces)) {
        namespaces[deployment.metadata.namespace] = [];
      }

      namespaces[deployment.metadata.namespace].push(deployment);
      return namespaces;
    },
    {},
  );
});
</script>
