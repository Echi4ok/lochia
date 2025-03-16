<script setup lang="ts">
import {computed} from 'vue'
import { useCandidatesStore, type Candidate } from '@/stores/candidates';

interface Props {
  candidateId: number | undefined;
  isShowingWindow: Function;
}

const candidateStore = useCandidatesStore();
const props = defineProps<Props>();

const candidate = computed(() => {
    if(props.candidateId === undefined) return alert('ID кандидата не найден')
    else return candidateStore.candidatesArr.find((t) => {
        return t.id === props.candidateId
    })
})
</script>

<template>
    <div v-if="candidate" class="fixed inset-0 flex items-center justify-center bg-opacity-50">
      <div class="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <!-- Заголовок модального окна -->
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-purple-800">Информация о кандидате</h2>
          <button @click="props.isShowingWindow()" class="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
  
        <!-- Основная информация -->
        <div class="space-y-4">
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-32">Имя:</span>
            <span class="text-gray-900">{{ candidate.name }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-32">Должность:</span>
            <span class="text-gray-900">{{ candidate.position }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-32">Образование:</span>
            <span class="text-gray-900">{{ candidate.education }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-32">Навыки:</span>
            <span class="text-gray-900">{{ candidate.skills }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-32">Опыт:</span>
            <span class="text-gray-900">{{ candidate.experience }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-32">Часов в неделю:</span>
            <span class="text-gray-900">{{ candidate.hoursPerWeek }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-32">Тип занятости:</span>
            <span class="text-gray-900">{{ candidate.employmentType }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-32">Email:</span>
            <span class="text-gray-900">{{ candidate.email }}</span>
          </div>
          <div class="flex items-center">
            <span class="font-semibold text-gray-700 w-32">Телефон:</span>
            <span class="text-gray-900">{{ candidate.phone }}</span>
          </div>
        </div>
  
        <!-- Кнопка закрытия -->
        <div class="mt-6 flex justify-end">
          <button
            @click="props.isShowingWindow()"
            class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  </template>
  
<style scoped>
  
</style>