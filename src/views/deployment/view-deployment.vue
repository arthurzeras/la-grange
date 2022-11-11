<template>
  <h1>Deployments view</h1>

  <div v-for="(_deployments, name) in byNamespace" :key="name">
    <h1>{{ name }}</h1>

    <table>
      <thead>
        <tr>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="deployment in _deployments" :key="deployment.metadata.uid">
          {{
            deployment.metadata.name
          }}
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useHttp } from '@/composables';
import { computed, onMounted } from 'vue';

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

const byNamespace = computed(() => {
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
