<template>
  <div
    class="p-4 bg-gray-50 rounded-lg shadow border-b-4"
    :class="borderColorByStatus"
  >
    <x-tooltip :message="podName">
      <div class="pod-name">
        {{ podName }}
      </div>
    </x-tooltip>

    <div class="text-sm pt-1 flex flex-row items-center justify-between">
      <span>Restarts: {{ restarts }}</span>
      <span v-if="message">
        <x-tooltip :message="message">
          <x-icon name="information-circle" class="w-5 h-5 text-gray-500" />
        </x-tooltip>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { Pod } from 'kubernetes-types/core/v1';

const props = defineProps<{ pod: Pod }>();
const { pod } = toRefs(props);

const restarts = computed(() => statuses.value[0].restartCount);
const podName = computed(() => pod.value.metadata?.name || '--');
const statuses = computed(() => pod.value.status?.containerStatuses || []);
const message = computed(() => {
  const waiting = statuses.value[0].state?.waiting;

  if (!waiting) {
    return '';
  }

  return `${waiting.reason}: ${waiting.message}`;
});

const borderColorByStatus = computed(() => {
  const phase = pod.value.status?.phase || '';
  const ready = statuses.value[0]?.ready || false;

  if (phase === 'Running') {
    return ready ? 'border-b-green-500' : 'border-b-red-500';
  }

  const phases = new Map([['Pending', 'border-b-blue-500']]);

  return phases.get(phase) || 'border-b-gray-100';
});
</script>

<style scoped>
.pod-name {
  @apply font-bold border-b border-b-gray-200 pb-1
    text-ellipsis w-full overflow-x-hidden whitespace-nowrap;
}
</style>
