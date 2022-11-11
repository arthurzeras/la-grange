<template>
  <div>
    <h1>Deployment: {{ deployment.metadata.name }}</h1>
  </div>
</template>

<script setup lang="ts">
import { IDeploymentItem } from '@/types/deployment';

defineProps<{
  deployment: IDeploymentItem;
}>();
</script>
