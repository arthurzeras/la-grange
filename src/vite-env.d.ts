/// <reference types="vite/client" />
import XIcon from './components/icon/x-icon.vue';
import XTooltip from './components/x-tooltip.vue';

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    XIcon: typeof XIcon;
    XTooltip: typeof XTooltip;
  }
}
