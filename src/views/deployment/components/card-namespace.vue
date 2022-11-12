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
        <tr
          v-for="deployment in deployments"
          :key="deployment.metadata.uid"
          class="border border-gray-200 last:border-0"
        >
          <td class="pl-4 py-4 w-1/4 text-left">
            {{ deployment.metadata.name }}
          </td>

          <td class="py-4 w-2/4 text-left">
            <span class="inline-block break-all">
              {{ deployment.spec.template.spec.containers[0].image }}
            </span>

            <button
              class="ml-1 inline-block"
              title="Copy image name"
              @click="
                copyToClipboard(
                  deployment.spec.template.spec.containers[0].image,
                )
              "
            >
              <x-icon
                name="clipboard-document-list"
                class="h-4 w-4 text-blue-500"
              />
            </button>
          </td>

          <td class="pr-4 py-4 w-1/4 text-right">
            <span class="inline-block">
              <span>{{ deployment.status.readyReplicas || 0 }}</span>
              <span>/</span>
              <span>{{ deployment.status.replicas || 0 }}</span>
            </span>

            <button
              class="inline-block ml-2 bg-blue-200 px-1 py-0.5 rounded text-sm hover:bg-blue-300"
            >
              <span>details</span>
              <x-icon name="chevron-double-down" class="h-4 w-4" />
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
// import ListDeployment from './list-deployment.vue';
import { copyToClipboard } from '@/common/func';
import { IDeploymentItem } from '@/types/deployment';

defineProps<{
  name: string;
  deployments: IDeploymentItem[];
}>();
</script>
