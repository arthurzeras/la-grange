<template>
  <div>
    <h1>Namespace: {{ name }}</h1>

    <list-deployment
      v-for="deployment in deployments"
      :key="deployment.metadata.uid"
      :deployment="deployment"
    />
  </div>
</template>

<script setup lang="ts">
import ListDeployment from './list-deployment.vue';

defineProps<{
  name: string;
  deployments: Record<string, any>;
}>();
</script>
