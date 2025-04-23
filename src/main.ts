import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import alertPlugin from './plugins/alert'
import router from './router';
import './assets/main.css';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(alertPlugin)
app.mount('#app');