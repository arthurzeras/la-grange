<template>
  <div ref="dropdownElement" class="inline-block relative">
    <button :class="btnClasses" @click="showOptions = !showOptions">
      <slot></slot>
    </button>

    <ul v-if="showOptions" class="dropdown-ul">
      <li
        v-for="(option, i) in options"
        :key="option.id || i"
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
  id?: string;
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
  @apply absolute shadow-lg rounded-md top-8 border w-48 bg-gray-50 border-gray-200;
}

.dropdown-li {
  @apply p-2 border-b last:border-0 cursor-pointer transition-all flex gap-2 items-center border-gray-200 hover:bg-gray-200;
}
</style>
