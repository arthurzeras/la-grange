<template>
  <div ref="dropdownElement" class="inline-block relative">
    <button :class="btnClasses" @click="showOptions = !showOptions">
      <slot></slot>
    </button>

    <ul v-if="showOptions" class="dropdown-ul">
      <li
        v-for="(option, i) in options"
        :key="i"
        class="dropdown-li"
        @click="emit('selected', option)"
      >
        <x-icon :name="option.icon" class="h-5 w-5 text-gray-500" />
        <span>{{ option.label }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { IconNames } from './icon/icons';
import { ref, onMounted, onUnmounted } from 'vue';

export type OptionType = {
  label: string;
  icon: IconNames;
};

defineProps<{ options: OptionType[]; btnClasses?: string[] }>();
const emit = defineEmits<{ (event: 'selected', option: OptionType): void }>(); // eslint-disable-line no-unused-vars

const dropdownElement = ref<HTMLDivElement>();
const showOptions = ref(false);

onMounted(() => activateEventListeners());
onUnmounted(() => deactivateEventListeners());

const clickListenerHandler = (ev: Event) => {
  const target = ev.target as Node;
  const el = dropdownElement.value;

  if (el && target && showOptions.value) {
    if (el !== target && !el.contains(target)) {
      showOptions.value = false;
    }
  }
};

const activateEventListeners = () => {
  document.addEventListener('click', clickListenerHandler);
};

const deactivateEventListeners = () => {
  document.removeEventListener('click', clickListenerHandler);
};
</script>

<style scoped>
.dropdown-ul {
  @apply absolute bg-gray-50 shadow-lg rounded-md top-8 border border-gray-200 w-48;
}

.dropdown-li {
  @apply p-2 border-b border-b-200 last:border-0 cursor-pointer hover:bg-gray-200 transition-all flex gap-2 items-center;
}
</style>
