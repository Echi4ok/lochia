<script setup lang="ts">
import {ref} from 'vue'
import { useInternStore } from '@/stores/intern';

const internStore = useInternStore();
</script>

<template>
  <div class="flex gap-3 my-4">
    <!-- Кнопка экспорта -->
    <button @click="internStore.exportInterns" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-green-800 bg-green-100 border border-green-300 transition-all duration-200 hover:bg-green-200 hover:shadow-md">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
      </svg>
      Экспорт CSV
    </button>

    <!-- Кнопка импорта (скрытый input) -->
    <label class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-blue-800 bg-blue-100 border border-blue-300 transition-all duration-200 hover:bg-blue-200 hover:shadow-md">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
      Импорт CSV
      <input
        @change="internStore.importInterns" 
        type="file" 
        accept=".csv" 
        hidden
      >
    </label>
  </div>
</template>

<style scoped>
/* Дополнительные стили могут быть добавлены, если необходимо */
</style>

  