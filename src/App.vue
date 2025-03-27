<script setup lang="ts">
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <div class="app flex flex-col min-h-screen bg-gray-50">
    <Header />

    <main class="main-content flex-grow container mx-auto px-4 py-8">
      <router-view></router-view>
    </main>

    <Footer />
  </div>
</template>

<style scoped>
/* Дополнительные стили, если нужно */
</style>