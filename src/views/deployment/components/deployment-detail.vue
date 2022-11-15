<template>
  <div class="flex flex-row gap-8">
    <!-- TODO: Try to use Suspense Later -->
    <template v-if="isLoading">
      <x-icon spin name="spinner" class="h-8 w-8 mx-auto" />
    </template>

    <template v-else-if="!pods.length">
      <p>This deployment has no pods</p>
    </template>

    <template v-else>
      <card-pod v-for="pod in pods" :key="pod.metadata?.uid" :pod="pod" />
    </template>
  </div>
</template>

<script setup lang="ts">
import CardPod from './card-pod.vue';
import { useRoute } from 'vue-router';
import { useHttp } from '@/composables';
import { onMounted, toRefs, computed } from 'vue';
import { PodList } from 'kubernetes-types/core/v1';
import { Deployment } from 'kubernetes-types/apps/v1';

const route = useRoute();
const { execute, response, isLoading } = useHttp<PodList>();

const props = defineProps<{
  deployment: Deployment;
}>();

const { deployment } = toRefs(props);

onMounted(() => {
  execute({
    params: { deployment: metadata.value?.name },
    url: `${route.params.cluster}/${metadata.value?.namespace}/pod`,
  });
});

const metadata = computed(() => deployment.value.metadata);

const pods = computed(() => {
  const data = response.value?.data;

  if (!data?.items.length) {
    return [];
  }

  return data.items;
});
</script>
