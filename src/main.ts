import App from './App.vue';
import router from './router';
import { createApp } from 'vue';
import XIcon from './components/icon/x-icon.vue';
import XTooltip from './components/x-tooltip.vue';

import './style.css';

createApp(App)
  .use(router)
  .component('x-icon', XIcon)
  .component('x-tooltip', XTooltip)
  .mount('#app');
