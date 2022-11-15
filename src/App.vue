<template>
  <main class="main">
    <div :class="{ 'panel-active': panelActive }">
      <router-view />
    </div>

    <x-panel-logs ref="panel" />
  </main>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import XPanelLogs from './components/x-panel/x-panel-logs.vue';

const panel = ref<typeof XPanelLogs>();

const panelActive = computed(() => panel.value?.visible);
</script>

<style>
.main .panel-active {
  overflow: auto;
  height: calc(100vh - 24rem);
}
</style>
