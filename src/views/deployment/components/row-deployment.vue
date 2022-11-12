<template>
  <tr class="border border-gray-200 last:border-0">
    <td class="pl-4 py-4 w-1/4 text-left">
      {{ deployment.metadata?.name }}
    </td>

    <td class="py-4 w-2/4 text-left">
      <span class="inline-block break-all">
        {{ image }}
      </span>

      <button
        class="ml-1 inline-block"
        title="Copy image name"
        @click="copyToClipboard(image)"
      >
        <x-icon name="clipboard-document-list" class="h-4 w-4 text-blue-500" />
      </button>
    </td>

    <td class="pr-4 py-4 w-1/4 text-right">
      <span class="inline-block">
        <span>{{ deployment.status?.readyReplicas || 0 }}</span>
        <span>/</span>
        <span>{{ deployment.status?.replicas || 0 }}</span>
      </span>

      <button
        class="inline-block ml-2 bg-blue-200 px-1 py-0.5 rounded text-sm hover:bg-blue-300"
        @click="detailsRowVisible = !detailsRowVisible"
      >
        <span class="mr-0.5">details</span>
        <x-icon :name="toggleDetailsIcon" class="h-3 w-3" />
      </button>
    </td>
  </tr>

  <tr v-if="detailsRowVisible">
    <td class="p-4 bg-gray-200" colspan="4">
      <deployment-detail :deployment="deployment" />
    </td>
  </tr>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from 'vue';
import { copyToClipboard } from '@/common/func';
import { Deployment } from 'kubernetes-types/apps/v1';
import DeploymentDetail from './deployment-detail.vue';

const props = defineProps<{
  deployment: Deployment;
}>();

const { deployment } = toRefs(props);

const detailsRowVisible = ref<boolean>(false);

const toggleDetailsIcon = computed(() =>
  detailsRowVisible.value ? 'chevron-double-down' : 'chevron-double-up',
);

const image = computed(() => {
  const containers = deployment.value.spec?.template?.spec?.containers || [];
  return containers[0].image || '';
});
</script>
