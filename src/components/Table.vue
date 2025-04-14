<script setup lang="ts">
import { handleError, onMounted, reactive, ref, watch, computed } from 'vue'
import ModalWindow from './ModalWindow.vue'
import Filters from './Filters.vue'
import type { Intern, Internship } from '../types/types'
import { useInternStore } from '@/stores/intern'
import { useInternshipsStore } from '@/stores/internships'
import Import from './Import.vue'
// Определяем нужное хранилище на основе props.storeType


const props = defineProps<{
  items: Intern[] | Internship[],
  storeType: "intern" | "internship", 
  headers: any,
}>()

const store = computed(() => {
  return props.storeType === 'intern' ? useInternStore() : useInternshipsStore()
})

let isOpenMenu = ref<boolean>(false)
let itemId = ref<string>()
let activeSortField = ref(false)
const displayedItems = ref<any>([])

displayedItems.value = props.items
let countPage = ref<number>()
let currentPage = ref(1)

watch(() => props.items, () => {
  displayedItems.value = props.items
  if(displayedItems.value.length) {
    countPage.value = Math.ceil(store.value.setPagination.total / 10)
  }
})

const handleClick = (btn: number) => {
  currentPage.value = btn + 1
  let pagination = reactive({
    limit: 10,
    offset: (btn - 1) * 10,
  })
  store.value.getPagination(pagination)
  store.value.getInterns(store.value.setFilters, store.value.setPagination, store.value.setSort)
}

const showId = (id: string) => {
  itemId.value = id
  isShowingWindow()
}

const isShowingWindow = () => {
  isOpenMenu.value = !isOpenMenu.value
}

const creatingItem = () => {
  itemId.value = undefined
  isShowingWindow()
}

handleClick(1)

const sortedBy = (param: string, order: string) => {
  const sortedObj = reactive({
    sortBy: param,
    sortOrder: order,
  })
  store.value.getSort(sortedObj)
  store.value.getInterns(store.value.setFilters, store.value.setPagination, store.value.setSort)
}
</script>

<template>
  <div class="candidates-container mx-auto p-4 max-w-screen-2xl">
    <div class="flex items-center justify-between mb-4 gap-4">
      <Import/>
      <Filters class="flex-grow" :store="props.storeType"/>

      <!-- Пагинация -->
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
        {{ storeType === 'intern' ? 'Добавить кандидата' : 'Добавить стажировку' }}
      </button>
    </div>

    <!-- Таблица -->
    <div class="table-container border border-gray-200 rounded-lg overflow-hidden shadow-sm">
      <ModalWindow 
        v-if="isOpenMenu"
        :itemId="itemId" 
        :items="props.items" 
        :isShowingWindow="isShowingWindow" 
        :isOpenMenu="isOpenMenu"
        :storeType="props.storeType"
      />
      
      <table class="w-full table-fixed">
  <!-- Table Headers -->
  <thead class="bg-gray-50">
    <tr>
      <th 
        v-for="header in props.headers" 
        :key="header.key"
        :class="['px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider hover:bg-gray-100', header.width]"
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
            >↑</span>
            <span 
              class="text-xl transition-colors cursor-pointer"
              @click="sortedBy(header.key, 'dsc')"
            >↓</span>
          </div>
        </div>
      </th>
    </tr>
  </thead>

  <!-- Table Body -->
  <tbody class="bg-white divide-y divide-gray-200">
    <tr 
      v-for="item in displayedItems" 
      :key="item.id" 
      @click="showId(item.id)"
      class="hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <!-- Position/Name (first column differs between views) -->
      <td class="px-4 py-3 text-sm font-medium text-gray-900 truncate" :class="storeType === 'intern' ? 'w-[12%]' : 'w-[15%]'">
        {{ storeType === 'intern' ? item.body.name : item.body.position }}
      </td>
      
      <!-- Department/Position (second column differs) -->
      <td class="px-4 py-3 text-sm text-gray-600 truncate" :class="storeType === 'intern' ? 'w-[12%]' : 'w-[12%]'">
        {{ storeType === 'intern' ? item.body.position : item.body.department }}
      </td>
      
      <!-- Education (same for both) -->
      <td class="px-4 py-3 text-sm text-gray-600 truncate" :class="storeType === 'intern' ? 'w-[10%]' : 'w-[12%]'">
        {{ item.body.education }}
      </td>
      
      <!-- Skills (same for both) -->
      <td class="px-4 py-3 text-sm text-gray-600 truncate" :class="storeType === 'intern' ? 'w-[14%]' : 'w-[15%]'">
        {{ item.body.skills }}
      </td>
      
      <!-- Experience (only for intern) or Hours (for both) -->
      <td class="px-4 py-3 text-sm text-gray-600 text-center" :class="storeType === 'intern' ? 'w-[8%]' : 'w-[8%]'">
        {{ storeType === 'intern' ? item.body.experience : item.body.hoursPerWeek }}
      </td>
      
      <!-- Hours per week (only for intern) -->
      <td v-if="storeType === 'intern'" class="px-4 py-3 text-sm text-gray-600 text-center w-[8%]">
        {{ item.body.hoursPerWeek }}
      </td>
      
      <!-- Employment type (same for both) -->
      <td class="px-4 py-3 text-sm text-gray-600 capitalize" :class="storeType === 'intern' ? 'w-[10%]' : 'w-[10%]'">
        {{ item.body.employmentType }}
      </td>
      
      <!-- Description (for internship) or Email (for intern) -->
      <td class="px-4 py-3 text-sm text-gray-600 truncate" :class="storeType === 'intern' ? 'w-[12%]' : 'w-[20%]'">
        {{ storeType === 'intern' ? item.body.email : item.body.description }}
      </td>
      
      <!-- Status (for internship) or Phone (for intern) -->
      <td class="px-4 py-3 text-sm text-gray-600 truncate" :class="storeType === 'intern' ? 'w-[10%]' : 'w-[10%]'">
        <template v-if="storeType === 'intern'">
          {{ item.body.phone }}
        </template>
        <template v-else>
          <span :class="{
            'bg-gray-100 text-gray-800': item.body.status === 'просмотрено',
            'bg-orange-100 text-orange-800': item.body.status === 'отложено',
            'bg-red-100 text-red-800': item.body.status === 'заблокировано'
          }" class="px-2 py-1 rounded-full text-xs font-medium">
            {{ item.body.status }}
        </span>
        </template>
      </td>
      
      <!-- Resume link (only for intern) -->
      <td v-if="storeType === 'intern'" class="px-4 py-3 text-sm text-center w-[4%]">
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