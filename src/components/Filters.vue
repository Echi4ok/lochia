<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import { useInternStore } from '@/stores/intern';
import { useInternshipsStore } from '@/stores/internships'


const props = defineProps<{
  store: string,
}>()

const store = props.store === 'intern' ? useInternStore() : useInternshipsStore()


const showFilters = ref(false);

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}
// фильтры стажеров
const employmentTypes = ref<Array<string>>([]);
const skillsInput = ref<Array<string>>([]);
const nameInput = ref<string>('');
const emailInput = ref<string>('');
const telInput = ref<string>('');
const candidateHoursMin = ref<number>();
const candidateHoursMax = ref<number>();
const candidatePosition = ref<string>();
// фильтры стажировок
const positionSearch = ref<string>('');
const departmentSearch = ref<string>('');
const hoursMin = ref<number>();
const hoursMax = ref<number>();
const skills = ref<Array<string>>([]);
const status = ref<Array<string>>([]);
const employmentType = ref<Array<string>>([]);

const filters = computed(() => {
  if (props.store === 'intern') {
    return {
      // фильтры стажеров
      candidateEmploymentType: employmentTypes.value.join(','),
      candidateSkills: skillsInput.value,
      candidateName: nameInput.value,
      candidateEmail: emailInput.value,
      candidatePhone: telInput.value,
      candidateHoursMin: candidateHoursMin.value,
      candidateHoursMax: candidateHoursMax.value,
      candidatePosition: candidatePosition.value,
    };
  } else {
    return {
      // фильтры стажировок
      position: positionSearch.value,
      department: departmentSearch.value,
      hoursMin: hoursMin.value,
      hoursMax: hoursMax.value,
      skills: skills.value,
      status: status.value.join(','),
      employmentType: employmentType.value.join(',')
    };
  }
});

const sendFilters = () => {
  console.log(filters.value)
  store.getFilters(filters.value);
  store.getInterns(store.setFilters, store.setPagination, store.setSort)
}

const removeFilters = () => {
  if(props.store == 'intern') {
    employmentTypes.value = [];
    skillsInput.value = [];
    nameInput.value = '';
    emailInput.value = '';
    telInput.value = '';
    candidateHoursMin.value = 20;
    candidateHoursMax.value = 40;
    candidatePosition.value = '';
  } else {
    positionSearch.value = '';
    departmentSearch.value = '';
    hoursMin.value = 20;
    hoursMax.value = 40;
    skills.value = [];
    status.value = [];
    employmentType.value = [];
  }
  sendFilters();
}
</script>


<template>
  <div class="relative">
    <!-- Кнопка открытия фильтров -->
    <button
      @click="toggleFilters"
      class="z-20 flex items-center gap-2 rounded-md px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
          clip-rule="evenodd"
        />
      </svg>
      Фильтры
    </button>

      <!------------------ФИЛЬТРЫ ДЛЯ СТАЖЕРОВ----------------->
     <transition v-if="props.store == 'intern'"
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform -translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform -translate-x-full opacity-0"
    >
      <div
        v-if="showFilters"
        class="fixed left-4 top-10 z-20 w-80 rounded-lg bg-white p-4 shadow-xl ring-1 ring-purple-200"
        style="max-height: 90vh; overflow-y: auto;" 
      >
        <!-- Поиск по имени -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium">Поиск по имени</label>
          <input
            v-model="nameInput"
            type="text"
            placeholder="Введите имя"
            class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

         <!-- Новые поля: Email и Телефон -->
         <div class="mb-4">
          <label class="mb-1 block text-sm font-medium">Email</label>
          <input
            v-model="emailInput"
            type="email"
            placeholder="Введите email"
            class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium">Телефон</label>
          <input
            v-model="telInput"
            type="tel"
            placeholder="Введите телефон"
            class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
        </div>

         <!-- Фильтр по часам -->
         <div class="mb-4">
          <label class="mb-1 block text-sm font-medium">Часов в неделю</label>
          <div class="flex items-center gap-2">
            <input
              v-model="candidateHoursMin"
              type="number"
              placeholder="От"
              class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <span>-</span>
            <input
              v-model="candidateHoursMax"
              type="number"
              placeholder="До"
              class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        <!-- Фильтр по должности -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium">Должность</label>
          <input
              v-model="candidatePosition"
              type="text"
              placeholder="Введите название должности"
              class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
        </div>

        <!-- Фильтр по навыкам -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium ">Навыки</label>
          <input
            v-model="skillsInput"
            type="text"
            placeholder="Введите навыки через запятую"
            class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <p class="mt-1 text-xs ">Например: JavaScript, Python, Git</p>
        </div>

        <!-- Фильтр по опыту работы
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium">Опыт работы</label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm">Нет опыта</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm">До 1 года</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm">1-3 года</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm">3-5 лет</span>
            </label>
            <label class="flex items-center">
              <input
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm">Более 5 лет</span>
            </label>
          </div>
        </div> -->

        <!-- Фильтр по типу занятости -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium ">Тип занятости</label>
          <div class="space-y-2">
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
        </div>

        <!-- Кнопки действий -->
        <div class="flex justify-end gap-2 sticky bottom-0 bg-white pt-2">
          <button
          @click="removeFilters"
            class="rounded-md bg-purple-100 px-4 py-2 text-sm font-medium hover:bg-purple-200"
          >
            Сбросить
          </button>
          <button
            class="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
            @click="sendFilters()"
          >
            Применить
          </button>
        </div>
      </div>
    </transition>

    <!----------------ФИЛЬТРЫ ДЛЯ СТАЖИРОВОК-------------------->

    <transition v-else
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform -translate-x-full opacity-0"
      enter-to-class="transform translate-x-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="transform translate-x-0 opacity-100"
      leave-to-class="transform -translate-x-full opacity-0"
    >
      <div
        v-if="showFilters"
        class="fixed left-4 top-10 z-20 w-80 rounded-lg bg-white p-4 shadow-xl ring-1 ring-purple-200"
        style="max-height: 90vh; overflow-y: auto;" 
      >
        <div class="mb-4">
        <label class="mb-1 block text-sm font-medium">Поиск по должности</label>
        <input
          v-model="positionSearch"
          type="text"
          placeholder="Введите должность"
          class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>

      <div class="mb-4">
        <label class="mb-1 block text-sm font-medium">Поиск по отделу</label>
        <input
          v-model="departmentSearch"
          type="text"
          placeholder="Введите отдел"
          class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </div>
        

        <!-- Intern specific filters -->
        <template v-if="props.store === 'intern'">
          <div class="mb-4">
            <label class="mb-1 block text-sm font-medium">Email</label>
            <input
              v-model="emailInput"
              type="email"
              placeholder="Введите email"
              class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>

          <div class="mb-4">
            <label class="mb-1 block text-sm font-medium">Телефон</label>
            <input
              v-model="telInput"
              type="tel"
              placeholder="Введите телефон"
              class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </template>

        <!-- Hours per week filter -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium">Часов в неделю</label>
          <div class="flex items-center gap-2">
            <input
              v-model="hoursMin"
              type="number"
              placeholder="От"
              class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
            <span>-</span>
            <input
              v-model="hoursMax"
              type="number"
              placeholder="До"
              class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          </div>
        </div>

        <!-- Position filter
        <div class="mb-4" v-if="props.store === 'internship'">
          <label class="mb-1 block text-sm font-medium">Отдел</label>
          <select
            
            class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          >
            <option value="">Все отделы</option>
            <option>Customer Support</option>
            <option>Analytics</option>
            <option>Engineering</option>
            <option>Marketing</option>
            <option>Sales</option>
            <option>HR</option>
          </select>
        </div> -->

        <!-- Skills filter -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium">Навыки</label>
          <input
            v-model="skills"
            type="text"
            placeholder="Введите навыки через запятую"
            class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <p class="mt-1 text-xs">Например: JavaScript, Python, Git</p>
        </div>

        <!-- Experience filter (only for interns)
        <div class="mb-4" v-if="props.store === 'intern'">
          <label class="mb-1 block text-sm font-medium">Опыт работы</label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                
                value="0"
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm">Нет опыта</span>
            </label>
            <label class="flex items-center">
              <input
               
                value="1"
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm">До 1 года</span>
            </label>
            <label class="flex items-center">
              <input
                
                value="3"
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm">1-3 года</span>
            </label>
          </div>
        </div> -->

        <!-- Status filter (only for internships) -->
<div class="mb-4" v-if="props.store === 'internship'">
  <label class="mb-1 block text-sm font-medium">Статус</label>
  <div class="space-y-2">
    <label class="flex items-center">
      <input
        v-model="status"
        value="просмотрено"
        type="checkbox"
        class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
      />
      <span class="ml-2 text-sm">Просмотрено</span>
    </label>
    <label class="flex items-center">
      <input
        v-model="status"
        value="отложено"
        type="checkbox"
        class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
      />
      <span class="ml-2 text-sm">Отложено</span>
    </label>
    <label class="flex items-center">
      <input
        v-model="status"
        value="заблокировано"
        type="checkbox"
        class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
      />
      <span class="ml-2 text-sm">Заблокировано</span>
    </label>
  </div>
</div>

        <!-- Employment type filter -->
        <div class="mb-4">
          <label class="mb-1 block text-sm font-medium">Тип занятости</label>
          <div class="space-y-2">
            <label class="flex items-center">
              <input
                v-model="employmentType"
                value="в офисе"
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm">Офис</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="employmentType"
                value="удалённо"
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm">Удалённо</span>
            </label>
            <label class="flex items-center">
              <input
                v-model="employmentType"
                value="гибрид"
                type="checkbox"
                class="h-4 w-4 rounded border-purple-300 text-purple-600 focus:ring-purple-500"
              />
              <span class="ml-2 text-sm">Гибрид</span>
            </label>
          </div>
        </div>

        <!-- Action buttons -->
        <div class="flex justify-end gap-2 sticky bottom-0 bg-white pt-2">
          <button
            @click="removeFilters"
            class="rounded-md bg-purple-100 px-4 py-2 text-sm font-medium hover:bg-purple-200"
          >
            Сбросить
          </button>
          <button
            class="rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700"
            @click="sendFilters"
          >
            Применить
          </button>
        </div>
      </div>
    </transition>


    <!-- Затемнение фона -->
<transition
  enter-active-class="transition-opacity duration-300 ease-out"
  enter-from-class="opacity-0"
  enter-to-class="opacity-100"
  leave-active-class="transition-opacity duration-200 ease-in"
  leave-from-class="opacity-100"
  leave-to-class="opacity-0"
>
  <div
    v-if="showFilters"
    @click="showFilters = false"
    class="fixed inset-0 z-10" 
    style="background-color: rgba(0, 0, 0, 0.5);" 
  ></div>
</transition>

  </div>
</template>
