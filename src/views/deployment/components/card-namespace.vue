<template>
  <div class="bg-gray-100 rounded-lg shadow border border-gray-200">
    <header class="px-4 py-2 border-b bg-gray-300 rounded-t-lg">
      <span class="block leading-3 text-sm text-gray-500">Namespace:</span>
      <span class="text-sm font-bold uppercase">
        {{ name }}
      </span>
    </header>

    <table class="table w-full">
      <thead>
        <tr class="border-b border-gray-200">
          <th class="pl-4 py-2 w-1/4 text-left">Name</th>
          <th class="py-2 w-2/4 text-left">Image</th>
          <th class="pr-4 py-2 w-1/4 text-right">Pods</th>
        </tr>
      </thead>

      <tbody>
        <row-deployment
          v-for="deployment in deployments"
          :key="deployment.metadata.uid"
          :deployment="deployment"
        />
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import RowDeployment from './row-deployment.vue';
import { IDeploymentItem } from '@/types/deployment';

defineProps<{
  name: string;
  deployments: IDeploymentItem[];
}>();
</script>
