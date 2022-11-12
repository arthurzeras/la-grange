<template>
  <!-- <div>
    <list-deployment
      v-for="deployment in deployments"
      :key="deployment.metadata.uid"
      :deployment="deployment"
    />
  </div> -->

  <div class="bg-gray-100 rounded-lg p-4 shadow">
    <header class="border-b border-b-gray-200">
      <span class="block leading-3 text-sm text-gray-400">Namespace:</span>
      <span class="text-sm font-bold uppercase">
        {{ name }}
      </span>
    </header>
  </div>
</template>

<script setup lang="ts">
// import ListDeployment from './list-deployment.vue';
import { IDeploymentItem } from '@/types/deployment';

defineProps<{
  name: string;
  deployments: IDeploymentItem[];
}>();
</script>
