<template>
  <header class="bg-gradient-to-r from-purple-800 to-purple-900 text-white py-6 shadow-2xl">
    <div class="container mx-auto flex justify-between items-center px-4">
      <h1 class="text-2xl font-bold text-orange-400 hover:text-orange-300 transition-colors duration-300">
        Лоция
      </h1>
      <nav class="hidden md:flex space-x-6">
        <router-link
          to="/"
          class="relative text-white hover:text-orange-400 transition-colors duration-300 group"
          active-class="text-orange-400"
        >
          Home
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <router-link
          to="/intern"
          class="relative text-white hover:text-orange-400 transition-colors duration-300 group"
          active-class="text-orange-400"
        >
          Intern
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
        </router-link>
        <router-link
          to="/candidate"
          class="relative text-white hover:text-orange-400 transition-colors duration-300 group"
          active-class="text-orange-400"
        >
          Candidate
          <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-400 transition-all duration-300 group-hover:w-full"></span>
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>