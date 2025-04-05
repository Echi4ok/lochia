<script setup lang="ts">
import {computed, ref, reactive, watch} from 'vue'

import { useInternStore } from '@/stores/internships';
import type { Intern } from '../types/types';
import { storeToRefs } from 'pinia';



const internshipStrore = useInternStore();
const props = defineProps<{
  itemId: string | undefined, // айди чела на которого кликнули
  isShowingWindow: Function,
  items: Intern[], // массив канидадтов либо стажеров
}>();

const item = computed(() => {
    if(props.itemId === undefined) {
      isEdit.value = true;
      return reactive({
        body: {
          name: "Иванов Иван Иванович",        // обязательное строковое поле
          email: "example@example.com",        // обязательное, формат email
          phone: "+77777777777",              // обязательное, формат phone
          position: "Junior Backend Developer", // строка
          education: "Высшее",                // строка
          skills: "JavaScript, Python",       // строка
          experience: "1 год",                // строка
          hoursPerWeek: 20,                   // число, min:20, max:40
          employmentType: "in-office",        // enum: ["in-office", "remote", "hybrid"]
          links: "https://github.com/user",   // строка (опционально)
          resume: "/path/to/resume.pdf"       // строка (опционально)
        }
      })
    }
    else return props.items.find((t) => { 
        return t.id === props.itemId
    })
})


const isEdit = ref<boolean>(false);
const copyItemObj = reactive<object>({...item.value});

watch(() => item, (updItem) => {
Object.assign(copyItemObj, updItem)
}, {immediate: true})


const editMode = () => {
  isEdit.value = !isEdit.value;
}

const cancelEdit = () => {
  if(props.itemId == undefined) {
    props.isShowingWindow();
  } else {
    Object.assign(item.value, copyItemObj);
    editMode();
  }
}

const deleteItem = (id: string) => {
    internshipStrore.deleteInterns(id)
    props.isShowingWindow(); 
}

const saveEdit = () => {
  if(props.itemId == undefined) { // то кнопка создать
    internshipStrore.postIntern({...item.value.body})
    props.isShowingWindow();
  } else { // то кнопка сохранить тоесть обновить изменения
    internshipStrore.patchIntern(props.itemId, {...item.value.body})
    props.isShowingWindow(); 
    isEdit.value = false;
  }
}


</script>

<template>
  <div 
    v-if="item" 
    class="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50"
    @click.self="props.isShowingWindow()"
  >
    <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
      <!-- Заголовок модального окна -->
      <div class="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ !props.itemId ? 'Создание нового кандидата' : (isEdit ? 'Редактирование анкеты' : 'Информация о соискателе') }}
        </h2>
        <button 
          @click="props.isShowingWindow()" 
          class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Основной контент -->
      <div class="p-6 space-y-5">
        <!-- Режим просмотра -->
        <template v-if="!isEdit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Имя</p>
              <p class="text-gray-900">{{ item.body.name }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Должность</p>
              <p class="text-gray-900">{{ item.body.position }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Образование</p>
              <p class="text-gray-900">{{ item.body.education }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Навыки</p>
              <p class="text-gray-900">{{ item.body.skills }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Опыт</p>
              <p class="text-gray-900">{{ item.body.experience }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Часов в неделю</p>
              <p class="text-gray-900">{{ item.body.hoursPerWeek }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Тип занятости</p>
              <p class="text-gray-900 capitalize">{{ item.body.employmentType }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Email</p>
              <a :href="`mailto:${item.body.email}`" class="text-blue-600 hover:underline">{{ item.body.email }}</a>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Телефон</p>
              <a :href="`tel:${item.body.phone}`" class="text-blue-600 hover:underline">{{ item.body.phone }}</a>
            </div>
          </div>
        </template>

        <!-- Режим редактирования -->
        <template v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Имя</label>
              <input
                type="text"
                v-model="item.body.name"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Должность</label>
              <input
                type="text"
                v-model="item.body.position"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Образование</label>
              <input
                type="text"
                v-model="item.body.education"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Навыки</label>
              <input
                type="text"
                v-model="item.body.skills"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Опыт</label>
              <input
                type="text"
                v-model="item.body.experience"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Часов в неделю</label>
              <input
                type="number"
                v-model="item.body.hoursPerWeek"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Тип занятости</label>
              <select
                v-model="item.body.employmentType"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                <option value="очно">Очно</option>
                <option value="удаленно">Удаленно</option>
                <option value="гибрид">Гибрид</option>
              </select>
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                v-model="item.body.email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Телефон</label>
              <input
                type="tel"
                v-model="item.body.phone"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
            </div>
          </div>
        </template>
      </div>

      <!-- Футер с кнопками -->
      <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
        <template v-if="!isEdit">
          <button
            @click="editMode()"
            class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Редактировать
          </button>
          <button
            @click="deleteItem(item.id)"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Удалить
          </button>
        </template>
        <template v-else>
          <button
            @click="cancelEdit()"
            class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors shadow-sm"
          >
            Отмена
          </button>
          <button
            @click="saveEdit()"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            {{ props.itemId ? 'Сохранить' : 'Создать' }}
          </button>
        </template>
      </div>
    </div>
  </div>
</template>
  
