<script setup lang="ts">
import { handleError, onMounted, reactive, ref, watch } from 'vue'
import ModalWindow from './ModalWindow.vue'
import Filters from './Filters.vue';
import type { Intern } from '../types/types'
import { useInternStore } from '@/stores/internships';


const headers = ref([
  { title: 'Имя', key: 'name', width: 'w-[12%]', sortable: true },
  { title: 'Должность', key: 'position', width: 'w-[12%]', sortable: true },
  { title: 'Образование', key: 'education', width: 'w-[10%]', sortable: false },
  { title: 'Навыки', key: 'skills', width: 'w-[14%]', sortable: true },
  { title: 'Опыт', key: 'experience', width: 'w-[8%]', sortable: true },
  { title: 'Часы/нед', key: 'hoursPerWeek', width: 'w-[8%]', sortable: true },
  { title: 'Занятость', key: 'employmentType', width: 'w-[10%]', sortable: false },
  { title: 'Email', key: 'email', width: 'w-[12%]', sortable: true },
  { title: 'Телефон', key: 'phone', width: 'w-[10%]', sortable: false },
  { title: 'Резюме', key: 'resume', width: 'w-[4%]', sortable: false }
])


const internshipStore = useInternStore();

const props = defineProps<{
  items: Intern[],
  storeType: "internship" | "candidate", 
}>();

let isOpenMenu = ref<boolean>(false);
let itemId = ref<string>();
let activeSortField = ref(false);
const displayedItems = ref<Intern[]>([]);



displayedItems.value = props.items
let countPage = ref<number>();
let currentPage = ref(1)

watch(() => props.items, () => {
  displayedItems.value = props.items;
  if(displayedItems.value.length) {
    countPage.value = Math.ceil(internshipStore.setPagination.total / 10)
  }
})

const handleClick = (btn: number) => {
  currentPage.value = btn + 1;
  let pagination = reactive({
    limit: 10, // константа
    offset: (btn - 1) * 10,
  })
  internshipStore.getPagination(pagination);
  internshipStore.getInterns(internshipStore.setFilters, internshipStore.setPagination, internshipStore.setSort)
}

const showId = (id: string) => {
    console.log(itemId)
    itemId.value = id;
    isShowingWindow();
}

const isShowingWindow = () => {
    isOpenMenu.value = !isOpenMenu.value;
}

const creatingItem = () => {
  itemId.value = undefined;
  isShowingWindow();
}

handleClick(1);


const sortedBy = (param: string, order: string) => {
    const sortedObj = reactive({
      sortBy: param,
      sortOrder: order,
    })
    console.log(sortedObj)
    internshipStore.getSort(sortedObj)
    internshipStore.getInterns(internshipStore.setFilters, internshipStore.setPagination, internshipStore.setSort)
}



</script>

<template>
   <div class="candidates-container mx-auto p-4 max-w-screen-2xl">
    <div class="flex items-center justify-between mb-4 gap-4">
      <Filters class="flex-grow"/>
      
      <!-- Пагинация - минимальная версия -->
      <div class="flex gap-1">
        <button 
          v-for="btn in countPage" 
          :key="btn"
          @click="handleClick(btn)"
          class="w-8 h-8 flex items-center justify-center rounded border"
          :class="{
            'bg-purple-600 text-white border-purple-600': currentPage === btn + 1,
            'bg-white border-gray-300 hover:bg-gray-50': currentPage !== btn + 1
          }"
        >
          {{ btn }}
        </button>
      </div>

      <button
        @click="creatingItem()"
        class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm flex items-center whitespace-nowrap"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Добавить стажера
      </button>
    </div>


    <!-- Таблица -->
    <div class="table-container border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <ModalWindow v-if="isOpenMenu"
      :itemId="itemId" 
      :items="props.items" 
      :isShowingWindow="isShowingWindow" 
      :isOpenMenu="isOpenMenu"
      :storeType="props.storeType"
      />
      <table class="w-full table-fixed">
        <!-- Заголовки таблицы -->
        <thead class="bg-gray-50">
    <tr>
      <th 
        v-for="header in headers" 
        :key="header.key"
        class='px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider hover:bg-gray-100 '
      >
        <div class="flex items-center justify-between">
          <span>{{ header.title }}</span>
          <div 
            v-if="header.sortable" 
            class="flex flex-col ml-2 space-y-0.5"
          >
            <span 
              class="text-xl transition-colors cursor-pointer"
              @click="sortedBy(header.key, 'asc')"
            >↑
          </span>
            <span 
              class="text-xl transition-colors cursor-pointer"
              @click="sortedBy(header.key, 'dsc')"
            >↓</span>
          </div>
        </div>
      </th>
    </tr>
  </thead>


        <!-- Данные таблицы -->
        <tbody class="bg-white divide-y divide-gray-200">
          <tr 
            v-for="item in displayedItems" 
            :key="item.id" 
            @click="showId(item.id)"
            class="hover:bg-gray-50 cursor-pointer transition-colors "
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
                :href="item.body.pathToResume" 
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