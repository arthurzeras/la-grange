<template>
  <section>
    <header class="bg-white shadow">
      <div class="mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Deployments
        </h1>
      </div>
    </header>

    <article class="container mx-auto my-4 gap-4 flex flex-col">
      <div class="block ml-auto">
        <input
          v-model="filter"
          type="text"
          class="w-96 border border-gray-200 rounded-lg px-4 py-2 shadow"
          placeholder="Search by namespace or deployment..."
        />
      </div>

      <card-namespace
        v-for="(_deployments, name) in byNamespace"
        :key="name"
        :name="name"
        :deployments="_deployments"
      />
    </article>
  </section>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useHttp } from '@/composables';
import { ref, computed, onMounted } from 'vue';
import CardNamespace from './components/card-namespace.vue';
import { DeploymentList, Deployment } from 'kubernetes-types/apps/v1';

const filter = ref('');
const route = useRoute();
const { execute, response } = useHttp<DeploymentList>();

onMounted(() => execute({ url: `${route.params.cluster}/deployment` }));

const deployments = computed(() => {
  const data = response.value?.data;

  if (!data?.items?.length) {
    return [];
  }

  if (filter.value) {
    return data.items.filter((item) => {
      const name = item.metadata?.name || '';
      const namespaceName = item.metadata?.namespace || '';

      return new RegExp(filter.value, 'g').test(`${name}${namespaceName}`);
    });
  }

  return data.items;
});

const byNamespace = computed(() => {
  type Namespaces = Record<string, Deployment[]>;

  return deployments.value.reduce(
    (namespaces: Namespaces, deployment: Deployment) => {
      const namespace = deployment?.metadata?.namespace || '';

      if (!namespace) {
        return namespaces;
      }

      if (!(namespace in namespaces)) {
        namespaces[namespace] = [];
      }

      namespaces[namespace].push(deployment);
      return namespaces;
    },
    {},
  );
});
</script>
