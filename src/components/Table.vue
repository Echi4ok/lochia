<script setup lang="ts">
import { reactive, ref, watch } from 'vue';
import ModalWindow from './ModalWindow.vue';
import Filters from './Filters.vue';
import type { Intern } from '../types/types';

import { useInternStore } from '@/stores/internships';




const internshipStore = useInternStore();

const props = defineProps<{
  items: Intern[],
  storeType: "internship" | "candidate", 
}>();

let isOpenMenu = ref<boolean>(false);
let itemId = ref<string>();
const store = ref<string>("стажера");
const searchInput = ref<string>();
const displayedItems = ref<Intern[]>([]);
  const createdItem = {
  body: {
    education: "new name",
    email: "newname@example.com",
    employmentType: "-",
    experience: "-",
    hoursPerWeek: 3,  // Исправлено hoursPerMeek → hoursPerWeek
    links: "-",
    name: "Alice Smith",
    phone: "-",
    position: "-",
    resume: "-",
    skills: "-"
  }
}
//   const createdItem = reactive({
//   name: '-',
//   position: '-',
//   education: '-',
//   skills: '-',
//   experience: '-',
//   hoursPerWeek: 0,
//   employmentType: '-',
//   email: '-',
//   phone: '+7(999)1114343',
//   resume: '-',
// }); // добавить нового кандидата

displayedItems.value = props.items

console.log(displayedItems.value)
watch(() => props.items, () => {
  displayedItems.value = props.items
})

const showId = (id: string) => {
    itemId.value = id;
    isOpenMenu.value = true;
}

const isShowingWindow = () => {
    isOpenMenu.value = !isOpenMenu.value;
}


const createNewItem = () => {
    internshipStore.postIntern(createdItem);
  
}




</script>

<template>
  <div class="candidates-container mx-auto p-4 max-w-screen-2xl">
    <!-- Заголовочная строка с фильтрами и кнопкой -->
    <div class="flex items-center justify-between mb-4 gap-4">
      <!-- Компонент фильтров (слева) -->
      <Filters class="flex-grow"/>
      
      <!-- Кнопка добавления (справа) -->
      <button
        @click="createNewItem()"
        class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm flex items-center whitespace-nowrap"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Добавить {{ store }}
      </button>
    </div>


    <!-- Таблица -->
    <div class="table-container border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <ModalWindow v-if="isOpenMenu && itemId !== undefined"
      :itemId="itemId" 
      :items="props.items" 
      :isShowingWindow="isShowingWindow" 
      :storeType="props.storeType"
      />
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
            v-for="item in displayedItems" 
            :key="item.id" 
            @click="showId(item.id)"
            class="hover:bg-gray-50 cursor-pointer transition-colors"
          >
            <td class="px-4 py-3 text-sm font-medium text-gray-900 truncate">{{ item.body.name }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 truncate">{{ item.body.position }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 truncate">{{ item.body.education }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 truncate">{{ item.body.skills }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 text-center">{{ item.body.experience }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 text-center">{{ item.body.hoursPerWeek }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 capitalize">{{ item.body.employmentType }}</td>
            <td class="px-4 py-3 text-sm text-gray-600 truncate">{{ item.body.email }}</td>
            <td class="px-4 py-3 text-sm text-gray-600">{{ item.body.phone }}</td>
            <td class="px-4 py-3 text-sm text-center">
              <a 
                :href="item.body.resume" 
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