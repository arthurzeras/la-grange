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

    <div class="mt-1 flex flex-row items-center justify-between">
      <span class="text-sm">Restarts: {{ restarts }}</span>

      <div class="flex gap-2">
        <span v-if="message">
          <x-tooltip :message="message">
            <x-icon name="information-circle" class="w-5 h-5 text-gray-500" />
          </x-tooltip>
        </span>

        <x-dropdown-vue :options="options" @selected="handleDropdownSelect">
          <x-icon name="dots-vertical" class="text-gray-500" />
        </x-dropdown-vue>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';
import { useLogs } from '@/composables';
import { Pod } from 'kubernetes-types/core/v1';
import XDropdownVue, { OptionType } from '@/components/x-dropdown.vue';

const { getLogs } = useLogs();

const options: OptionType[] = [
  { id: 'logs', icon: 'bars-4', label: 'View Logs' },
  { id: 'shell', icon: 'code', label: 'Execute Shell' },
];

const props = defineProps<{ pod: Pod }>();
const { pod } = toRefs(props);

const restarts = computed(() => statuses.value[0].restartCount);
const podName = computed(() => pod.value.metadata?.name || '--');
const statuses = computed(() => pod.value.status?.containerStatuses || []);
const message = computed(() => {
  const waiting = statuses.value[0].state?.waiting;
  return waiting ? `${waiting.reason}: ${waiting.message}` : '';
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

const handleDropdownSelect = async (option: OptionType) => {
  if (option.id === 'logs') {
    getLogs(pod.value.metadata?.namespace || '', podName.value);
  }
};
</script>

<style scoped>
.pod-name {
  @apply pb-1 w-full border-b font-bold text-ellipsis overflow-x-hidden whitespace-nowrap border-b-gray-200;
}
</style>
