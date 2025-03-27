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
}

const isShowingWindow = () => {
    isOpenMenu.value = !isOpenMenu.value;
}

onMounted(candidatesStore.getCandidates);
</script>

<template>
  <div class="candidates-container mx-auto p-4 max-w-screen-2xl">
    <!-- Поисковая строка -->
    <div class="search-container mb-4">
      <input
        type="text"
        placeholder="Поиск по кандидатам..."
        class="search-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
      />
    </div>

    <!-- Таблица -->
    <div class="table-container border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <ModalWindow v-if="isOpenMenu" :candidateId="candidateId" :isShowingWindow="isShowingWindow"/>
      <table class="w-full">
        <!-- Заголовки таблицы -->
        <thead class="bg-gray-50">
          <tr>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[12%]">Имя</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[12%]">Должность</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[10%]">Образование</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[14%]">Навыки</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[8%]">Опыт</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[8%]">Часы/нед</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[10%]">Занятость</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[12%]">Email</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[10%]">Телефон</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider w-[4%]">Резюме</th>
          </tr>
        </thead>

        <!-- Данные таблицы -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="candidate in candidatesStore.candidatesArr" 
            :key="candidate.id" 
            @click="showId(candidate.id)"
            class="hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <td class="px-4 py-3 text-sm font-medium text-gray-900 truncate">{{ candidate.name }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 truncate">{{ candidate.position }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 truncate">{{ candidate.education }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 truncate">{{ candidate.skills }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 text-center">{{ candidate.experience }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 text-center">{{ candidate.hoursPerWeek }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 capitalize">{{ candidate.employmentType }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 truncate">{{ candidate.email }}</td>
            <td class="px-4 py-3 text-sm text-gray-600">{{ candidate.phone }}</td>
            <td class="px-4 py-3 text-sm text-center">
              <a 
                :href="candidate.resume" 
                target="_blank"
                class="text-purple-600 hover:text-purple-800"
                @click.stop
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.table-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

@media (min-width: 1536px) {
  .table-container {
    overflow-x: visible;
  }
}

.truncate {
  max-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>