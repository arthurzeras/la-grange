<template>
  <div
    class="p-4 bg-gray-50 rounded-lg shadow border-b-4"
    :class="borderColorByStatus"
  >
    {{ pod.metadata?.name }}
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { Pod } from 'kubernetes-types/core/v1';

const props = defineProps<{ pod: Pod }>();
const { pod } = toRefs(props);

const borderColorByStatus = computed(() => {
  const phases = new Map([
    ['Running', 'border-b-green-500'],
    ['Pending', 'border-b-blue-500'],
  ]);

  return phases.get(pod.value.status?.phase || '') || 'border-b-gray-100';
});
</script>
