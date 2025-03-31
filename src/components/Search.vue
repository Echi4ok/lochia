<script setup lang="ts">
import { ref, watch } from 'vue'
import { useInternStore } from '@/stores/internships'
import { useCandidatesStore } from '@/stores/candidates'
import Fuse from 'fuse.js'
import type { Candidate, Intern } from '@/types/types'


const internshipStore = useInternStore();
const candidatesStore = useCandidatesStore();

const props = defineProps<{
  storeType: "internship" | "candidate",
  items: Intern[] | Candidate[], 
}>();

const emit = defineEmits<{
  (e: 'updatedItems', newItems: Intern[] | Candidate[]): void
}>()

const searchInput = ref('') 
const filteredResults = ref<Intern[] | Candidate []>([]) 

// Инициализация Fuse.js
const fuse = new Fuse<Intern | Candidate>([], {
  keys: [
    'name',
    'skills',
    'education',
    'position',
    'experience',
    'employmentType', 
    'hoursPerWeek',            
  ],
  threshold: 0.4, // Допустимая погрешность
  ignoreLocation: true, // Поиск по всей строке
  minMatchCharLength: 2 // Минимальная длина совпадения
})

watch(() => props.items, (newItems) => {
  fuse.setCollection(newItems)
}, { immediate: true })

const updateValue = (newValue: string) => {
  if(newValue.trim() != '') {
    filteredResults.value = fuse.search(newValue).map((obj) => obj.item)
    
    console.log(`Найдено ${filteredResults.value.length} совпаденй`)
  } else {
    if(props.storeType == 'candidate') {
      filteredResults.value = [...candidatesStore.candidatesArr]
    } else if (props.storeType == 'internship') {
      filteredResults.value = [...internshipStore.internsArr]
    }
    console.log('Казна пуста...')
  }
  emit('updatedItems', filteredResults.value) // передача обновленного массива к родителю
}

watch(searchInput, (newValue) => {
  updateValue(newValue);
})
</script>

<template>
  <div class="search-container mb-4">
    <input
      v-model="searchInput"
      type="text"
      placeholder="Поиск по кандидатам..."
      class="search-input w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
    />
  </div>
</template>