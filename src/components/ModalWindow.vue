<script setup lang="ts">
import { computed, ref, reactive, watch, onMounted } from 'vue'
import { useInternStore } from '@/stores/intern'
import { useInternshipsStore } from '@/stores/internships'
import type { Intern, Internship, InternBody, InternshipBody } from '../types/types'

const props = defineProps<{
  itemId: string | undefined,
  isShowingWindow: Function,
  items: Intern[] | Internship[],
  storeType: 'intern' | 'internship'
}>()

const store = props.storeType === 'intern' ? useInternStore() : useInternshipsStore()

// Реактивные переменные для работы с навыками
const skillsArr = ref<string[]>([])
const copySkillsArr = ref<string[]>([])
const skillsArray = ref<string[]>([])
const skillsInput = ref('')
const count = ref(0)

// Загрузка навыков из хранилища
onMounted(async () => {
  if (props.storeType === 'intern') {
    await store.getSkillsList() // Загружаем навыки из API
    skillsArr.value = [...store.skillsList]
    copySkillsArr.value = [...store.skillsList]
  }
})

// Следим за изменениями в хранилище
watch(() => store.skillsList, (newSkills) => {
  skillsArr.value = [...newSkills]
  copySkillsArr.value = [...newSkills]
}, { immediate: true })

// Функции работы с навыками
const searchingSkills = () => {
  if (skillsInput.value) {
    skillsArr.value = copySkillsArr.value.filter((skill) => {
      return skill.toLowerCase().includes(
        skillsInput.value.toLowerCase().substring(0, count.value)
      )
    })
  }
}

const pushSkills = (skill: string) => {
  const trimmedSkill = skill.trim()
  if (trimmedSkill && !skillsArray.value.includes(trimmedSkill)) {
    skillsArray.value.push(trimmedSkill)
    skillsInput.value = ''
    skillsArr.value = [...copySkillsArr.value]
    count.value = 0
  }
}

const removeSkills = (skill: string) => {
  skillsArray.value = skillsArray.value.filter(el => el !== skill)
}

watch(() => skillsInput.value, (newVal, oldVal) => {
  if (oldVal.length <= newVal.length) {
    count.value++
  } else {
    skillsArr.value = [...copySkillsArr.value]
    count.value--
  }
  searchingSkills()
})

// Остальной код остается без изменений
const getEmptyItem = () => {
  if (props.storeType === 'intern') {
    return reactive({
      body: {
        name: "Иванов Иван Иванович",
        email: "example@example.com",
        phone: "+77777777777",
        position: "Junior Backend Developer",
        education: "Высшее",
        skills: "JavaScript, Python",
        experience: "1 год",
        hoursPerWeek: 20,
        employmentType: "удалённо",
        links: "https://github.com/user",
        pathToResume: "wedеfqwec"
      }
    })
  } else {
    return reactive({
      body: {
        skills: "Python, SQL, аналитическое мышление",
        education: "Студент 3-4 курса технического вуза",
        hoursPerWeek: 30,
        employmentType: "гибрид",
        description: "Описание стажировки",
        position: "Intern Position",
        department: "Department",
        status: "новое"
      }
    })
  }
}

const item = computed(() => {
  if (props.itemId === undefined) {
    isEdit.value = true
    return getEmptyItem()
  }
  const foundItem = props.items.find(t => t.id === props.itemId)
  if (foundItem) {
    employmentTypesArr.value = foundItem.body.employmentType.split(',').map(s => s.trim())
    skillsArray.value = [...foundItem.body.skills.split(',').map(s => s.trim())]
  }
  return foundItem
})

const isEdit = ref(false)
const copyItemObj = reactive({})
const employmentTypesArr = ref<string[]>([])

const employmentTypes = computed({
  get: () => employmentTypesArr.value,
  set: (newValue: string[]) => {
    employmentTypesArr.value = newValue
    if (item.value) {
      item.value.body.employmentType = newValue.join(', ')
    }
  }
})

const editMode = () => {
  if (item.value) {
    Object.assign(copyItemObj, JSON.parse(JSON.stringify(item.value)))
  }
  isEdit.value = !isEdit.value
}

const cancelEdit = () => {
  if (props.itemId == undefined) {
    props.isShowingWindow()
  } else {
    Object.assign(item.value, copyItemObj)
    editMode()
  }
}

const deleteItem = (id: string) => {
  store.deleteInterns(id)
  props.isShowingWindow()
}

const saveEdit = () => {
  if (props.itemId == undefined) {
    store.postIntern(item.value.body)
  } else {
    item.value.body.skills = skillsArray.value.join(', ')
    store.patchIntern(props.itemId, item.value.body)
  }
  props.isShowingWindow()
  isEdit.value = false
}
</script>

<template>
  <div 
    v-if="item" 
    class="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50"
    @click.self="props.isShowingWindow()"
  >
    <div class="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto mx-4">
      <!-- Заголовок -->
      <div class="sticky top-0 bg-white z-10 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 class="text-2xl font-bold text-gray-800">
          {{ !props.itemId ? 
            (storeType === 'intern' ? 'Создание кандидата' : 'Создание стажировки') : 
            (isEdit ? 'Редактирование' : 'Просмотр') }}
        </h2>
        <button @click="props.isShowingWindow()" class="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Контент -->
      <div class="p-6 space-y-5">
        <!-- Режим просмотра -->
        <template v-if="!isEdit">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Общие поля -->
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Позиция</p>
              <p class="text-gray-900">{{ item.body.position }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Навыки</p>
              <p class="text-gray-900">{{ item.body.skills }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Образование</p>
              <p class="text-gray-900">{{ item.body.education }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Часов в неделю</p>
              <p class="text-gray-900">{{ item.body.hoursPerWeek }}</p>
            </div>
            <div class="space-y-1">
              <p class="text-sm font-medium text-gray-500">Тип занятости</p>
              <p class="text-gray-900 capitalize">{{ item.body.employmentType }}</p>
            </div>

            <!-- Поля только для кандидатов -->
            <template v-if="storeType === 'intern'">
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500">Имя</p>
                <p class="text-gray-900">{{ item.body.name }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500">Опыт</p>
                <p class="text-gray-900">{{ item.body.experience }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500">Email</p>
                <a :href="`mailto:${item.body.email}`" class="text-blue-600 hover:underline">{{ item.body.email }}</a>
              </div>
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500">Телефон</p>
                <a :href="`tel:${item.body.phone}`" class="text-blue-600 hover:underline">{{ item.body.phone }}</a>
              </div>
            </template>

            <!-- Поля только для стажировок -->
            <template v-else>
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500">Отдел</p>
                <p class="text-gray-900">{{ item.body.department }}</p>
              </div>
              <div class="space-y-1">
                <p class="text-sm font-medium text-gray-500">Статус</p>
                <p class="text-gray-900">{{ item.body.status }}</p>
              </div>
            </template>

            <!-- Описание -->
            <div class="md:col-span-2 space-y-1">
              <p class="text-sm font-medium text-gray-500">Описание</p>
              <p class="text-gray-900">{{ item.body.description || 'Нет описания' }}</p>
            </div>
          </div>
        </template>

        <!-- Режим редактирования -->
        <template v-else>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <!-- Общие поля -->
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Позиция</label>
              <input v-model="item.body.position" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Навыки</label>
              <div class="mb-3 flex flex-wrap gap-2">
            <span 
              v-for="addSkill in skillsArray"
              :key="addSkill"
              class="inline-flex items-center rounded-md border border-purple-200 bg-purple-50 px-3 py-1 text-sm text-purple-800 hover:bg-purple-100"
            >
              {{ addSkill }}
              <button 
                @click="removeSkills(addSkill)"
                class="ml-2 text-purple-500 hover:text-purple-700 text-base"
              >
                &times;
              </button>
            </span>
          </div>
          <input v-model="skillsInput" @keyup.enter="pushSkills(skillsInput)" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"/>
            <div class="mt-3 max-h-[200px] overflow-y-auto">
            <div class="flex flex-wrap gap-2">
              <span 
                @click="pushSkills(skill)"
                v-for="skill in skillsArr.slice(0, 4)"
                :key="skill"
                class="inline-block rounded-md border border-purple-200 bg-purple-50 px-3 py-1 text-sm text-purple-800 hover:bg-purple-100 hover:cursor-pointer"
              >
                {{ skill }}
              </span>
              <div v-if="skillsArr.length == 0" class="w-full py-2 text-sm text-gray-500">
                <p>Увы, ничего не найдено, минус вайб</p>
                <p>Нажмите Enter, чтобы скил появился в инпуте</p>
              </div>
            </div>
          </div>
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Образование</label>
              <input v-model="item.body.education" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Часов в неделю</label>
              <input type="number" v-model="item.body.hoursPerWeek" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
            </div>
            <div class="space-y-1">
              <label class="block text-sm font-medium text-gray-700">Тип занятости</label>
              <label class="flex items-center">
              <input
                v-model="employmentTypes"
                value="в офисе"
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm ">Офис</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="employmentTypes"
                value="удалённо"
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm ">Удалённо</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="employmentTypes"
                value="гибрид"
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm ">Гибрид</span>
            </label>
            </div>

            <!-- Поля только для кандидатов -->
            <template v-if="storeType === 'intern'">
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Имя</label>
                <input v-model="item.body.name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Опыт</label>
                <input v-model="item.body.experience" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" v-model="item.body.email" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Телефон</label>
                <input type="tel" v-model="item.body.phone" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
              </div>
            </template>

            <!-- Поля только для стажировок -->
            <template v-else>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Отдел</label>
                <input v-model="item.body.department" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
              </div>
              <div class="space-y-1">
                <label class="block text-sm font-medium text-gray-700">Статус</label>
                <select v-model="item.body.status" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500">
                  <option value="заблокировано">Заблокировано</option>
                  <option value="просмотрено">Просмотрено</option>
                  <option value="отложено">Отложено</option>
                </select>
              </div>
            </template>

            <!-- Описание -->
            <div class="md:col-span-2 space-y-1">
              <label class="block text-sm font-medium text-gray-700">Описание</label>
              <textarea v-model="item.body.description" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"></textarea>
            </div>
          </div>
        </template>
      </div>

      <!-- Футер -->
      <div class="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
        <template v-if="!isEdit">
          <button @click="editMode()" class="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Редактировать
          </button>
          <button @click="deleteItem(item.id)" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors shadow-sm flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Удалить
          </button>
        </template>
        <template v-else>
          <button @click="cancelEdit()" class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors shadow-sm">
            Отмена
          </button>
          <button @click="saveEdit()" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm flex items-center">
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