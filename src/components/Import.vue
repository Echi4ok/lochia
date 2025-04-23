<script setup lang="ts">
import {ref, toValue} from 'vue'
import { useInternStore } from '@/stores/intern';

const internStore = useInternStore();
let isDragging = ref<boolean>(false);
let fileInput = ref<HTMLInputElement | null>(null);
let selectedFile = ref<File | null>(null); 
let isFileGet  = ref<boolean>(false);


const openDragAndDrop = () => {
  isDragging.value = true;
}

const fileChange = () => {
  fileInput.value?.click();
}

const showFile = (file: any) => {
selectedFile.value = file.target.files[0];
console.log(selectedFile.value)
isFileGet.value = true;
}

const removeChanges = () => {
  isDragging.value = false;
  selectedFile.value = null;
  isFileGet.value = false;
}

const sendFile = () => {
  if(selectedFile.value && isFileGet) {
    internStore.importInterns(selectedFile.value);
    removeChanges();
  } else {
    console.log('Ошибка')
  }
}

const handleFileDrop = (e: DragEvent) => {
  e.preventDefault();
  // Проверяем, что файлы есть
  if (!e.dataTransfer?.files.length) {
    console.error('Нет файлов в dataTransfer');
    return;
  }

  const files = e.dataTransfer.files;
  console.log('Получены файлы:', files);  // Теперь файлы будут здесь!
  
  selectedFile.value = files[0];
  isFileGet.value = true;
};

const onDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';  // Разрешаем копирование файлов
  isDragging.value = true;  // Подсвечиваем зону
};
</script>

<template>
  <!-- Основной контент -->
  <div class="flex gap-3 my-4">
    <!-- Кнопка экспорта -->
    <button @click="internStore.exportInterns" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-green-800 bg-green-100 border border-green-300 transition-all duration-200 hover:bg-green-200 hover:shadow-md">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
      </svg>
      Экспорт CSV
    </button>

    <!-- Кнопка импорта -->
    <button @click="openDragAndDrop" class="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-blue-800 bg-blue-100 border border-blue-300 transition-all duration-200 hover:bg-blue-200 hover:shadow-md">
      <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
      </svg>
      Импорт CSV
    </button>
  </div>

  <!-- Модальное окно с затемнением -->
  <transition
    enter-active-class="transition-opacity duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isDragging" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Затемнение фона -->
      <div 
        @click="isDragging = false"
        class="fixed inset-0 z-10" 
        style="background-color: rgba(0, 0, 0, 0.5);"
      ></div>
      
      <!-- Контейнер для центрирования модального окна -->
      <div class="flex items-center justify-center min-h-screen p-4">
        <!-- Само модальное окно -->
        <div class="relative bg-white rounded-lg shadow-xl max-w-xl  w-full p-6 z-20">
          <h3 class="text-lg font-medium text-gray-900 mb-4">Импорт CSV файла</h3>
          
          <div 
            class="border-2 border-dashed border-gray-300 rounded-lg p-8 h-[400px] text-center mb-4 transition-colors drop-zone"
           
            @dragover.prevent="onDragOver"
            @dragleave.prevent
            @drop.prevent="handleFileDrop"
          >
            <input 
              ref="fileInput"
              type="file" 
              accept=".csv" 
              class="hidden" 
              @change="showFile"
            >
            <div v-if="!isFileGet">
              <svg class="mx-auto h-12 w-12 text-gray-400 mt-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p class="mt-2 text-xl text-gray-600">Перетащите CSV файл сюда</p>
            <p class="mt-1 text-md text-gray-500">или</p>
            <button 
                @click="fileChange"
              class="mt-2 inline-flex items-center px-3 py-1.5 border bg-gray-100 border-gray-300 shadow-sm text-md font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100 cursor-pointer"
            >
              Выберите файл
            </button>
            </div>
            <div v-else>
              <p class="mt-2 text-xl text-gray-600">Название: {{selectedFile.name}}</p>
              <p class="mt-1 text-xl text-gray-500">Формат: {{selectedFile.type}}</p>
              <p class="mt-1 text-xl text-gray-500">Размер: {{ (selectedFile.size / 1024).toFixed(2) }} KB</p>
            </div>
          </div>
          
          
          <div class="flex justify-end gap-3">
            <button 
              @click="removeChanges"
              class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Отмена
            </button>
            <button 
              @click="sendFile"
              class="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
            >
              Отправить
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.drop-zone {
  pointer-events: all; /* Или 'auto' */
}
</style>