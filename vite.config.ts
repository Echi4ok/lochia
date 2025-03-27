import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import federation from '@originjs/vite-plugin-federation'; // Импортируем плагин

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    federation({
      name: 'internService', // Уникальное имя вашего приложения
      filename: 'remoteEntry.js', // Файл для удаленного доступа
      exposes: {
        // Экспортируемые компоненты/страницы
        './Header': './src/components/Header.vue',
        './Card': './src/components/Card.vue',
        './InternPage': './src/views/InternPage.vue',
      },
      shared: ['vue', 'vue-router'], // Общие зависимости
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    target: 'esnext', // Обязательно для работы Module Federation
  },
});