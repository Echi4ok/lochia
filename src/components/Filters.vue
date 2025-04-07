<script setup>
import { ref } from 'vue'

const showFilters = ref(false);

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}


</script>


<template>
  <div class="relative">
    <!-- Кнопка открытия фильтров -->
    <button
      @click="toggleFilters"
      class="z-20 flex items-center gap-2 rounded-md px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
          clip-rule="evenodd"
        />
      </svg>
      Фильтры
    </button>

    <!-- Панель фильтров -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform -translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform -translate-x-full opacity-0"
    >
      <div
        v-if="showFilters"
        class="fixed left-4 top-10 z-20 w-80 rounded-lg bg-white p-4 shadow-xl ring-1 ring-purple-200"
      >
        <!-- Поиск по имени -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium ">Поиск по имени</label>
          <input
            type="text"
            placeholder="Введите имя"
            class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 "
          />
        </div>

      

        <!-- Фильтр по часам -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium ">Часов в неделю</label>
          <div class="flex items-center gap-2">
            <input
              type="number"
              placeholder="От"
              class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 "
            />
            <span class="">-</span>
            <input
              type="number"
              placeholder="До"
              class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        <!-- Фильтр по должности -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium">Должность</label>
          <select
            class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="">Все должности</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Fullstack Developer</option>
            <option>DevOps Engineer</option>
            <option>QA Engineer</option>
            <option>UI/UX Designer</option>
            <option>Project Manager</option>
            <option>Team Lead</option>
          </select>
        </div>

        <!-- Фильтр по навыкам -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium ">Навыки</label>
          <input
            type="text"
            placeholder="Введите навыки через запятую"
            class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <p class="mt-1 text-xs ">Например: JavaScript, Python, Git</p>
        </div>

        <!-- Фильтр по опыту работы -->
<div class="mb-4">
  <label class="mb-1 block text-sm font-medium">Опыт работы</label>
  <div class="space-y-2">
    <label class="flex items-center">
      <input
        type="checkbox"
        class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
      />
      <span class="ml-2 text-sm">Нет опыта</span>
    </label>
    <label class="flex items-center">
      <input
        type="checkbox"
        class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
      />
      <span class="ml-2 text-sm">До 1 года</span>
    </label>
    <label class="flex items-center">
      <input
        type="checkbox"
        class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
      />
      <span class="ml-2 text-sm">1-3 года</span>
    </label>
    <label class="flex items-center">
      <input
        type="checkbox"
        class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
      />
      <span class="ml-2 text-sm">3-5 лет</span>
    </label>
    <label class="flex items-center">
      <input
        type="checkbox"
        class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
      />
      <span class="ml-2 text-sm">Более 5 лет</span>
    </label>
  </div>
</div>

        <!-- Фильтр по типу занятости -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium ">Тип занятости</label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm ">Офис</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm ">Удалённо</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm ">Гибрид</span>
            </label>
          </div>
        </div>

        <!-- Кнопки действий -->
        <div class="flex justify-end gap-2">
          <button
            class="rounded-md bg-purple-100 px-4 py-2 text-sm font-medium  hover:bg-purple-200"
          >
            Сбросить
          </button>
          <button
            class="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
          >
            Применить
          </button>
        </div>
      </div>
    </transition>

    <!-- Затемнение фона -->
<transition
  enter-active-class="transition-opacity duration-300 ease-out"
  enter-from-class="opacity-0"
  enter-to-class="opacity-100"
  leave-active-class="transition-opacity duration-200 ease-in"
  leave-from-class="opacity-100"
  leave-to-class="opacity-0"
>
  <div
    v-if="showFilters"
    @click="showFilters = false"
    class="fixed inset-0 z-10" 
    style="background-color: rgba(0, 0, 0, 0.5);" 
  ></div>
</transition>

  </div>
</template>
