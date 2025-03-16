<script setup lang="ts">
import { useCandidatesStore } from '@/stores/candidates';
import { onMounted, ref } from 'vue';
import ModalWindow from './ModalWindow.vue';

const candidatesStore = useCandidatesStore();

let isOpenMenu = ref<boolean>(false);
let candidateId = ref<number>();

const showId = (id: number) => {
    candidateId.value = id;
    isShowingWindow();
    console.log(id)
}

const isShowingWindow = () => { // функция для открытия, закрытия окна
    isOpenMenu.value = !isOpenMenu.value;
}

onMounted(candidatesStore.getCandidates);
</script>

<template>
  <div class="candidates-container mx-auto p-5 max-w-7xl">
    <!-- Поисковая строка -->
    <div class="search-container mb-5">
      <input
        type="text"
        placeholder="Поиск..."
        class="search-input w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
      />
    </div>

    <!-- Таблица -->
    <div class="table-container border-2 border-gray-200 rounded-lg overflow-hidden">
        <ModalWindow v-if="isOpenMenu" :candidateId="candidateId" :isShowingWindow="isShowingWindow"/>
      <table class="w-full">
        <!-- Заголовки таблицы -->
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Имя</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Должность</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Образование</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Навыки</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Опыт</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Часов в неделю</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Тип занятости</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Телефон</th>
          </tr>
        </thead>

        <!-- Данные таблицы -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="candidate in candidatesStore.candidatesArr" :key="candidate.id" @click="showId(candidate.id)">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ candidate.name }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ candidate.position }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ candidate.education }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ candidate.skills }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ candidate.experience }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ candidate.hoursPerWeek }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ candidate.employmentType }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ candidate.email }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ candidate.phone }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>