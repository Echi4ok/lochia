<script setup lang="ts">
import Table from '@/components/Table.vue';
import { useInternshipsStore } from '@/stores/internships'
import {ref} from 'vue'
const internshipsStore = useInternshipsStore();


const headers = ref([
  { title: 'Позиция', key: 'position', width: 'w-[15%]', sortable: true },
  { title: 'Отдел', key: 'department', width: 'w-[12%]', sortable: true },
  { title: 'Образование', key: 'skills', width: 'w-[15%]', sortable: true },
  { title: 'Навыки', key: 'education', width: 'w-[12%]', sortable: false },
  { title: 'Часы/нед', key: 'hoursPerWeek', width: 'w-[8%]', sortable: true },
  { title: 'Тип занятости', key: 'employmentType', width: 'w-[10%]', sortable: false },
  { title: 'Описание', key: 'description', width: 'w-[18%]', sortable: false },
  { title: 'Статус', key: 'status', width: 'w-[12%]', sortable: true }
])

const array = ref({
  pagination: {
    total: 10,
    offset: 0,
    limit: 10,
    remaining: 0
  },
  data: [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      body: {
        skills: "Python, SQL, аналитическое мышление",
        education: "Студент 3-4 курса технического вуза",
        hoursPerWeek: 30,
        employmentType: "гибрид",
        description: "Стажировка в отделе анализа данных. Работа с большими массивами информации, построение отчетов.",
        position: "Data Analyst Intern",
        department: "Аналитика",
        status: "новое"
      }
    },
    {
      id: "6ba7b810-9dad-11d1-80b4-00c04fd430c8",
      body: {
        skills: "HTML/CSS, JavaScript, React",
        education: "Последний курс бакалавриата по компьютерным наукам",
        hoursPerWeek: 25,
        employmentType: "удаленно",
        description: "Разработка интерфейсов для внутренних сервисов компании под руководством ментора.",
        position: "Frontend Developer Intern",
        department: "Разработка",
        status: "в рассмотрении"
      }
    }
  ]
})
</script>

<template>
  <div>
    <Table :items = "internshipsStore.internshipsArr" store-type="internship" :headers="headers"/>
  </div>
</template>

<style scoped>

</style>