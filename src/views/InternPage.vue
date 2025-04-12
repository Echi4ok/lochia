<script setup lang="ts">
import Table from '@/components/Table.vue';
import { useInternStore } from '@/stores/intern';
import {ref} from 'vue'
const internStore = useInternStore();


const headers = ref([
  { title: 'Имя', key: 'name', width: 'w-[12%]', sortable: true },
  { title: 'Должность', key: 'position', width: 'w-[12%]', sortable: true },
  { title: 'Образование', key: 'education', width: 'w-[10%]', sortable: false },
  { title: 'Навыки', key: 'skills', width: 'w-[14%]', sortable: true },
  { title: 'Опыт', key: 'experience', width: 'w-[8%]', sortable: true },
  { title: 'Часы/нед', key: 'hoursPerWeek', width: 'w-[7%]', sortable: true },
  { title: 'Занятость', key: 'employmentType', width: 'w-[8%]', sortable: false },
  { title: 'Email', key: 'email', width: 'w-[12%]', sortable: true },
  { title: 'Телефон', key: 'phone', width: 'w-[9%]', sortable: false },
  { title: 'Резюме', key: 'resume', width: 'w-[8%]', sortable: false }
])


</script>

<template>
  <div>
    <Table :items = "internStore.internsArr" store-type="intern" :headers="headers"/>
  </div>
</template>

<style scoped>

</style>