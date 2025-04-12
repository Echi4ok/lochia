import { ref, computed, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Intern } from '../types/types';
export interface InternBody {
  education: string;
  email: string;
  employmentType: string;
  experience: string;
  hoursPerWeek: number;
  links: string;
  name: string;
  phone: string;
  position: string;
  pathToResume: string;
  skills: string;
}

export const useInternStore = defineStore('interns', () => {
  let internsArr = ref<Intern[]>([]); // массив данных

  let setFilters = reactive({}); // фильтры по дефолту будет передаваться этот обьект 

  let setPagination = reactive({
    limit: 10,
    offset: 0,
  }); // пагинация по дефолту будет передаваться этот обьект 

  let setSort = reactive({
    sortBy: '',
    sortOrder: 'asc'
  }) // сортировка по дефолту будет передаваться этот обьект 


  function getFilters (filters: any) { // получение фильтров
    Object.assign(setFilters, filters)
  }

  function getPagination (pagination: any) { // получение пагинации
    Object.assign(setPagination, pagination)
  }

  function getSort (sort: any) { // получение сортировки
    Object.assign(setSort, sort)
  }

  function getInterns (filters: any, pagination: any, sort: any) {
    axios.get('http://do.gberdyshev.tech:8080/api/v1/candidates', {
      params: {
        ...pagination,
        ...filters,
        ...sort,
      }
    })
    .then((res) => {
        internsArr.value = res.data.data;
        Object.assign(setPagination, res.data.pagination)
    }).catch((e) => {
      console.log(e.message)
    })
  }

  function deleteInterns (id : string) {
    axios.delete(`http://do.gberdyshev.tech:8080/api/v1/candidates/${id}`)
    .then((res) => {
      internsArr.value = internsArr.value.filter((intern) => intern.id !== id)
      alert('Успешно удалено')
    }).catch((e) => {
      console.error(e.message);
      throw e;
    })
  }
  

  function patchIntern (id: string, updatedItem: InternBody) {
    console.log(id, updatedItem)
    axios.put(`http://do.gberdyshev.tech:8080/api/v1/candidates/${id}`, updatedItem)
    .then((res) => {
      console.log(res.data)
      alert('Данные успешно обновлены');
    }).catch((e) => {
      console.error(e.message);
      throw e;
    })
  }

  function postIntern (createdItem: InternBody) {
    console.log(createdItem)
    axios.post(`http://do.gberdyshev.tech:8080/api/v1/candidates`, createdItem)
    .then((res) => {
      internsArr.value.push(res.data[0])
      console.log(internsArr.value)
      alert('Успешно создан кандидат');
    }).catch((e) => {
      console.error(e.message);
      throw e;
    })
  }

  function getFilteredInterns (filters: Object) {
    axios.get(`http://do.gberdyshev.tech:8080/api/v1/candidates`, {params: filters})
    .then((res) => {
      console.log(res.data.data)
      internsArr.value = res.data.data;
      
    }).catch((e) => {
      console.error(e.message);
      throw e;
    })
  }


    onMounted(getInterns);
  return { getInterns, 
    internsArr, 
    setFilters,
    setPagination,
    setSort,
    deleteInterns, 
    patchIntern, 
    postIntern, 
    getFilteredInterns, 
    getFilters, 
    getPagination, 
    getSort,
  }
})