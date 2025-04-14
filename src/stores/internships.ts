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

export const useInternshipsStore = defineStore('internships', () => {
  let internshipsArr = ref<any>([]); // массив данных

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
    axios.get('http://do.gberdyshev.tech:8080/api/v1/internships', {
      params: {
        ...pagination,
        ...filters,
        ...sort,
      }
    })
    .then((res) => {
        internshipsArr.value = res.data.data;
        Object.assign(setPagination, res.data.pagination)
    }).catch((e) => {
      console.log(e.message)
    })
  }

  function deleteInterns (id : string) {
    axios.delete(`http://do.gberdyshev.tech:8080/api/v1/internships/${id}`)
    .then((res) => {
        internshipsArr.value = internshipsArr.value.filter((intern: Intern) => intern.id !== id)
      alert('Успешно удалено')
    }).catch((e) => {
      console.error(e.message);
      throw e;
    })
  }
  

  function patchIntern (id: string, updatedItem: InternBody) {
    console.log(id, updatedItem)
    axios.put(`http://do.gberdyshev.tech:8080/api/v1/internships/${id}`, updatedItem)
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
    axios.post(`http://do.gberdyshev.tech:8080/api/v1/internships`, createdItem)
    .then((res) => {
        internshipsArr.value.push(res.data[0])
      console.log(internshipsArr.value)
      alert('Успешно создан кандидат');
    }).catch((e) => {
      console.error(e.message);
      throw e;
    })
  }



    onMounted(getInterns);
  return { getInterns, 
    internshipsArr, 
    setFilters,
    setPagination,
    setSort,
    deleteInterns, 
    patchIntern, 
    postIntern, 
    getFilters, 
    getPagination, 
    getSort,
  }
})