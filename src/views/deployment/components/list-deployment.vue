<template>
  <div>
    <h1>Deployment: {{ deployment.metadata.name }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  deployment: Record<string, any>;
}>();
</script>
