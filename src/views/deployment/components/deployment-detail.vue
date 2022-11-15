<template>
  <div>
    <!-- TODO: Try to use Suspense later -->
    <x-icon
      v-if="isLoading"
      spin
      name="spinner"
      class="h-8 w-8 mx-auto !block"
    />

    <p v-else-if="!pods.length" class="text-center">
      This deployment has no pods
    </p>

    <div v-else class="deployment-pods">
      <card-pod
        v-for="pod in pods"
        :key="pod.metadata?.uid"
        :pod="pod"
        class="deployment-pods__pod"
      />
    </div>
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

<style scoped>
.deployment-pods {
  --gap: 12px;
  @apply flex flex-wrap;
  width: calc(100% + var(--gap));
  margin: calc(-1 * var(--gap)) 0 0 calc(-1 * var(--gap));
}

.deployment-pods__pod {
  margin: var(--gap) 0 0 var(--gap);
  width: calc(calc(100% / 5) - var(--gap));
}
</style>
