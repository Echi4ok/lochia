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

  function exportInterns () {
    // axios.get(`http://do.gberdyshev.tech:8080/api/v1/candidates/external`)
    // .then((res) => {
    //   console.log(res)
    // }).catch((e) => {
    //   console.error(e.message);
    //   throw e;
    // })
    window.open('http://do.gberdyshev.tech:8080/api/v1/candidates/external', '_blank');
  }
  const importInterns = async (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    const file = fileInput.files?.[0];
  
    if (!file) {
      console.error('Нет файла для загрузки');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await axios.post('http://do.gberdyshev.tech:8080/api/v1/candidates/external', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);

    } catch (error: any) {
      if (error.response) {
        console.error('Ошибка ответа сервера:', error.response.data);
        console.error('Статус:', error.response.status);
        console.error('Заголовки:', error.response.headers);
      } else if (error.request) {
        console.error('Запрос был отправлен, но не получен ответ:', error.request);
      } else {
        console.error('Ошибка при настройке запроса:', error.message);
      }
      throw error;
    }
  };


    onMounted(getInterns);
  return { getInterns, 
    internsArr, 
    setFilters,
    setPagination,
    setSort,
    deleteInterns, 
    patchIntern, 
    postIntern,  
    getFilters, 
    getPagination, 
    getSort,
    exportInterns,
    importInterns,
  }
})