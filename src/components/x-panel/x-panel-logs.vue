<template>
  <div v-if="visible" class="relative h-96">
    <div class="panel-content">
      <nav class="bg-gray-700 h-8 flex">
        <a
          v-for="(menu, i) in menus"
          :key="menu"
          class="cursor-pointer py-1 px-2 rounded-t-md"
          :class="{ 'bg-gray-900': i === currentPanel }"
          @click.self="changePanel(i)"
        >
          <span class="mr-2" @click.self="changePanel(i)">
            {{ menu }}
          </span>

          <button class="btn-close" @click="closePanel(i)">
            <x-icon name="x-mark" class="h-4 w-4 leading-4 mb-0.5" />
          </button>
        </a>
      </nav>

      <div ref="codeContent" class="code-content">
        <code v-for="(log, i) in logs" :key="i" class="block">
          {{ log }}
        </code>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import store from '@/store';
import { computed, onMounted, ref, watch } from 'vue';

const currentPanel = ref(0);
const blockAutoScroll = ref(false);
const codeContent = ref<HTMLDivElement>();

onMounted(() => {
  scrollToEnd();
  enableEventListener();
});

const visible = computed(() => Boolean(menus.value.length));
const menus = computed(() => Object.keys(store.state.logs.list));
const logs = computed(() => {
  const key = Object.keys(store.state.logs.list)[currentPanel.value];
  return !visible.value ? [] : store.state.logs.list[key];
});

watch(menus, () => {
  currentPanel.value = menus.value.length - 1;
});

watch(logs, () => {
  setTimeout(() => {
    scrollToEnd();
    enableEventListener();
  }, 10);
});

const changePanel = (index: number) => {
  currentPanel.value = index;
};

const closePanel = (index: number) => {
  store.mutations.logs.removeLog(menus.value[index]);
};

const scrollToEnd = () => {
  const el = codeContent.value;

  if (el && !blockAutoScroll.value) {
    el.scrollTop = el.scrollHeight;
  }
};

const enableEventListener = () => {
  const el = codeContent.value;

  if (el) {
    el.addEventListener('wheel', () => {
      const scrollHeight = el.scrollHeight - el.scrollTop;
      blockAutoScroll.value = scrollHeight !== el.clientHeight;
    });
  }
};

defineExpose({ visible });
</script>

<style scoped>
.panel-content {
  --shadow: rgb(0 0 0 / 0.1);
  @apply fixed bg-gray-900 bottom-0 w-screen left-0 h-96 text-white;
  box-shadow: 0 -10px 15px -3px var(--shadow), 0 -4px 6px -4px var(--shadow);
}

.btn-close {
  @apply bg-gray-800 border border-gray-50 h-5 w-5 leading-4 rounded hover:bg-gray-600;
}

.code-content {
  height: calc(100% - 2rem);
  @apply overflow-y-auto p-4;
}
</style>
