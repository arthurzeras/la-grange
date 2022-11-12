<template>
  <span>This is the detail row</span>
</template>

<script setup lang="ts">
// import { useHttp } from '@/composables';
import { Deployment } from 'kubernetes-types/apps/v1';
// const { execute, response } = useHttp()

defineProps<{
  deployment: Deployment;
}>();
</script>
