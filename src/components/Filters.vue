<script setup lang="ts">
import { reactive, ref, watch, computed } from 'vue'
import { useInternStore } from '@/stores/intern';
import { useInternshipsStore } from '@/stores/internships'



const props = defineProps<{
  store: string,
}>()

const store = props.store === 'intern' ? useInternStore() : useInternshipsStore()


const showFilters = ref(false);
const skillsArray = ref<Array<string>>([]);

const toggleFilters = () => {
  showFilters.value = !showFilters.value
}
// фильтры стажеров
const employmentTypes = ref<Array<string>>([]);
const skillsInput = ref<string>('');
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
      candidateSkills: skillsArray.value.join(', '),
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
      skills: skillsArray.value.join(', '),
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

let count = ref(0);

const removeFilters = () => {
  count.value = 0;
  if(props.store == 'intern') {
    employmentTypes.value = [];
    skillsInput.value = '';
    skillsArray.value = [];
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


let skillsArr = [
  "postgresql",
  "minecraft",
  "csgo",
  "sql",
  "javascript",
  "sql python",
  "python",
  "java",
  "golang",
  "docker",
  "git",
  "react",
  "go",
  "kubernetes",
  "ansible",
  "linux",
  "fastapi",
  "django",
  "graphql",
  "flask",
  "spring",
  "node.js",
  "express",
  "typescript",
  "html",
  "css",
  "sass",
  "vue",
  "angular",
  "redux",
  "mongodb",
  "mysql",
  "redis",
  "aws",
  "azure",
  "gcp",
  "terraform",
  "jenkins",
  "ci/cd",
  "rest api",
  "microservices",
  "rabbitmq",
  "kafka",
  "elasticsearch",
  "postman",
  "swagger",
  "nginx",
  "apache",
  "pandas",
  "numpy",
  "tensorflow",
  "pytorch",
  "machine learning",
  "data science",
  "big data",
  "hadoop",
  "spark",
  "scala",
  "rust",
  "c++",
  "c#",
  ".net",
  "php",
  "laravel",
  "ruby",
  "rails",
  "bash",
  "powershell",
  "solidity",
  "blockchain",
  "ethereum",
  "smart contracts",
  "figma",
  "adobe xd",
  "ui/ux design",
  "photoshop",
  "illustrator",
  "premiere pro",
  "after effects",
  "blender",
  "unity",
  "unreal engine",
  "arduino",
  "raspberry pi",
  "iot",
  "cybersecurity",
  "penetration testing",
  "ethical hacking",
  "network security",
  "devops",
  "agile",
  "scrum",
  "kanban",
  "project management",
  "jira",
  "trello",
  "slack",
  "microsoft teams",
  "zoom",
  "google workspace",
  "microsoft office",
  "excel",
  "power bi",
  "tableau",
  "data analysis",
  "business intelligence",
  "digital marketing",
  "seo",
  "content writing",
  "technical writing",
  "customer support",
  "sales",
  "negotiation",
  "public speaking",
  "leadership",
  "team management",
  "recruiting",
  "human resources",
  "accounting",
  "finance",
]

let copySkillsArr = [...skillsArr];
let copyInputSkillsArr = ref([...skillsInput.value])

const searchingSkills = () => {
  // skillsArr = [...copySkillsArr]
  if(skillsInput.value) {
  skillsArr = skillsArr.filter((skill, idx) => {
  return skillsInput.value.includes(skill.substring(0, count.value)) == true
  })
}
}

watch(() => skillsInput.value, (newVal, oldVal) => {
  console.log(newVal, oldVal)
  
  if(oldVal.length <= newVal.length) {
    count.value++;
  } else {
    skillsArr = [...copySkillsArr]
    count.value--;
  }
  console.log(count.value)

  searchingSkills();

  console.log(skillsArr)
})


const pushSkills = (skill: string) => {
if(skillsInput.value || skill != '') {
  skillsArray.value.push(skill);
  skillsInput.value = '';
  skillsArr = [...copySkillsArr]
  count.value = 0;
}
  


}

const removeSkills = (skill: string) => {
skillsArray.value = skillsArray.value.filter((el) => {
return el !== skill;
})
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
          <label class="mb-1 block text-sm font-medium">Навыки</label>
          
          <!-- Выбранные навыки с крестиками -->
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

          <input
            v-model="skillsInput"
            @keyup.enter="pushSkills(skillsInput)"
            type="text"
            placeholder="Введите навыки через запятую"
            class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <p class="mt-2 text-xs text-gray-500">Например: javascript, python, git</p>
          
          <!-- Список навыков -->
          <div class="mt-3 max-h-[200px] overflow-y-auto">
            <div class="flex flex-wrap gap-2">
              <span 
                @click="pushSkills(skill)"
                v-for="skill in skillsArr.slice(0, 12)"
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
            class="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200"
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
          
          <!-- Выбранные навыки с крестиками -->
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

          <input
            v-model="skillsInput"
            @keyup.enter="pushSkills(skillsInput)"
            type="text"
            placeholder="Введите навыки через запятую"
            class="w-full rounded-md border border-purple-300 px-3 py-2 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
          />
          <p class="mt-2 text-xs text-gray-500">Например: javascript, python, git</p>
          
          <!-- Список навыков -->
          <div class="mt-3 max-h-[200px] overflow-y-auto">
            <div class="flex flex-wrap gap-2">
              <span 
                @click="pushSkills(skill)"
                v-for="skill in skillsArr.slice(0, 12)"
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
            class="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium hover:bg-gray-200"
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
