<template>
  <section class="flex justify-center items-center h-screen flex-col">
    <h1 class="text-4xl font-bold mb-4">LaGrange</h1>
    <div class="border-b-2 border-b-slate-100 w-1/2" />

    <p class="py-5 italic text-gray-400">Select a cluster to start...</p>

    <grid-clusters class="mt-5" />
  </section>
</template>

<script setup lang="ts">
import GridClusters from './components/grid-clusters.vue';
</script>
