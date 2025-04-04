<template>
  <header class="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-6 shadow-2xl">
    <div class="container mx-auto flex justify-between items-center px-20">
      <h1 class="text-2xl font-bold text-orange-400 hover:text-orange-300 transition-colors duration-300">
        Лоция
      </h1>

      <!-- Иконка бургер-меню для мобильных устройств -->
      <button @click="toggleMenu" class="md:hidden focus:outline-none">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
        </svg>
      </button>

      <!-- Навигационное меню -->
      <nav :class="{'flex': isMenuOpen, 'hidden': !isMenuOpen}" class="md:flex md:space-x-6 flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto bg-purple-900 md:bg-transparent p-4 md:p-0">
        <router-link
          to="/"
          class="relative text-white hover:text-orange-400 transition-colors duration-300 group block md:inline-block py-2 md:py-0"
          active-class="text-orange-400"
        >
          Хоум
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <router-link
          to="/intern"
          class="relative text-white hover:text-orange-400 transition-colors duration-300 group block md:inline-block py-2 md:py-0"
          active-class="text-orange-400"
        >
          Стажеры
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <!-- <router-link
          to="/candidate"
          class="relative text-white hover:text-orange-400 transition-colors duration-300 group block md:inline-block py-2 md:py-0"
          active-class="text-orange-400"
        >
          Кандидаты
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
        </router-link> -->
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const isMenuOpen = ref(false);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped>
/* Дополнительные стили, если необходимо */
</style>