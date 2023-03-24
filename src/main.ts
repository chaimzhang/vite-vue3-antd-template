import { createApp } from 'vue';
import './style/index.less';
import App from './App.vue';
import router from './router';
import { pinia } from './pinia';

createApp(App).use(router).use(pinia).mount('#app');
