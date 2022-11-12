<template>
  <section>
    <header class="bg-white shadow">
      <div class="mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">
          Deployments
        </h1>
      </div>
    </header>

    <!-- <article class="container mx-auto my-4 px-4">
      <table class="table w-full">
        <thead>
          <tr>
            <th class="w-1/4 text-left">Name</th>
            <th class="w-2/4 text-left">Image</th>
            <th class="w-1/4 text-center">Pods</th>
          </tr>
        </thead>
      </table>
    </article> -->

    <article class="container mx-auto my-4 gap-4 flex flex-col">
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
import { computed, onMounted } from 'vue';
import CardNamespace from './components/card-namespace.vue';
import { IDeploymentResponse, IDeploymentItem } from '@/types/deployment';

const route = useRoute();
const { execute, response } = useHttp<IDeploymentResponse>();

onMounted(() => execute({ url: `${route.params.cluster}/deployment` }));

const deployments = computed(() => {
  const data = response.value?.data;

  if (!data?.items?.length) {
    return [];
  }

  return data.items;
});

const byNamespace = computed(() => {
  type Namespaces = Record<string, IDeploymentItem[]>;

  return deployments.value.reduce(
    (namespaces: Namespaces, deployment: IDeploymentItem) => {
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
