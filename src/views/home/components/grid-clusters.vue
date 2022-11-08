<template>
  <article class="grid grid-cols-4 gap-10 w-full">
    <card-cluster key="1" class="group" />
    <card-cluster key="2" class="group" />
    <card-cluster key="3" class="group" />
    <card-cluster key="4" class="group" />
  </article>
</template>

<script setup lang="ts">
import CardCluster from './card-cluster.vue';
</script>
