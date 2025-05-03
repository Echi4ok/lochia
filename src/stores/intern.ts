import { ref, computed, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { alert } from '@/plugins/alert'
import type { Intern } from '../types/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
let skillsList = ref<Array<string>>([]);

  let internsArr = ref<Intern[]>([]);
  let setFilters = reactive({});
  let setPagination = reactive({
    limit: 10,
    offset: 0,
  });
  let setSort = reactive({
    sortBy: '',
    sortOrder: 'asc'
  });

  function getFilters(filters: any) {
    Object.assign(setFilters, filters);
  }

  function getPagination(pagination: any) {
    Object.assign(setPagination, pagination);
  }

  function getSort(sort: any) {
    Object.assign(setSort, sort);
  }

  function getInterns(filters: any, pagination: any, sort: any) {
    axios.get(`${API_BASE_URL}/candidates`, {
      params: {
        ...pagination,
        ...filters,
        ...sort,
      }
    })
    .then((res) => {
      internsArr.value = res.data.data;
      Object.assign(setPagination, res.data.pagination);
    }).catch((e) => {
      const errorMessage = e.response?.data?.message || 'Не удалось загрузить данные кандидатов';
      alert.show(errorMessage, { 
        type: 'error',
        title: 'Ошибка загрузки',
        buttonText: 'Понятно'
      });
      console.error('Ошибка при загрузке данных:', e.message);
    });
  }

  function deleteInterns(id: string) {
    axios.delete(`${API_BASE_URL}/candidates/${id}`)
    .then((res) => {
      internsArr.value = internsArr.value.filter((intern) => intern.id !== id);
      alert.show('Кандидат успешно удален', { 
        type: 'success',
        title: 'Успешно',
        buttonText: 'Отлично'
      });
    }).catch((e) => {
      const errorMessage = e.response?.data?.message || 'Не удалось удалить кандидата';
      alert.show(errorMessage, { 
        type: 'error',
        title: 'Ошибка удаления',
        buttonText: 'Закрыть'
      });
      console.error('Ошибка при удалении:', e.message);
      throw e;
    });
  }

  function patchIntern(id: string, updatedItem: InternBody) {
    axios.put(`${API_BASE_URL}/candidates/${id}`, updatedItem)
    .then((res) => {
      alert.show('Данные кандидата успешно обновлены', { 
        type: 'success',
        title: 'Успешно',
        buttonText: 'OK'
      });
      console.log('Данные обновлены:', res.data);
    }).catch((e) => {
      const errorMessage = e.response?.data?.message || 'Не удалось обновить данные кандидата';
      alert.show(errorMessage, { 
        type: 'error',
        title: 'Ошибка обновления',
        buttonText: 'Понятно'
      });
      console.error('Ошибка при обновлении:', e.message);
      throw e;
    });
  }

  function postIntern(createdItem: InternBody) {
    axios.post(`${API_BASE_URL}/candidates`, createdItem)
    .then((res) => {
      internsArr.value.push(res.data[0]);
      alert.show('Новый кандидат успешно создан', { 
        type: 'success',
        title: 'Успешно',
        buttonText: 'Отлично'
      });
      console.log('Добавлен кандидат:', res.data[0]);
    }).catch((e) => {
      const errorMessage = e.response?.data?.message || 'Не удалось создать кандидата';
      alert.show(errorMessage, { 
        type: 'error',
        title: 'Ошибка создания',
        buttonText: 'Закрыть'
      });
      console.error('Ошибка при создании:', e.message);
      throw e;
    });
  }

  function exportInterns() {
    try {
      window.open(`${API_BASE_URL}/candidates/external`, '_blank');
    } catch (e) {
      alert.show('Не удалось экспортировать данные', { 
        type: 'error',
        title: 'Ошибка экспорта',
        buttonText: 'Понятно'
      });
      console.error('Ошибка при экспорте:', e);
    }
  }

  const importInterns = async (file: any) => {
    if (!file) {
      alert.show('Пожалуйста, выберите файл для импорта', { 
        type: 'warning',
        title: 'Файл не выбран',
        buttonText: 'Выбрать'
      });
      console.error('Нет файла для загрузки');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/candidates/external`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      const successMessage = response.data?.message || 'Данные успешно импортированы';
      alert.show(successMessage, { 
        type: 'success',
        title: 'Успешно',
        buttonText: 'OK'
      });
      console.log('Импорт данных:', response.data);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 
                         'Произошла ошибка при импорте данных';
      
      alert.show(errorMessage, { 
        type: 'error',
        title: 'Ошибка импорта',
        buttonText: 'Закрыть'
      });

      if (error.response) {
        console.error('Ошибка сервера:', error.response.data);
      } else if (error.request) {
        console.error('Нет ответа от сервера:', error.request);
      } else {
        console.error('Ошибка запроса:', error.message);
      }
      throw error;
    }
  };


  function getSkillsList(id: string) {
    axios.get(`${API_BASE_URL}/candidates/skills`)
    .then((res) => {
      skillsList.value = [...res.data] // по идее так, но надо посмотреть какой json приходит 
      alert.show('Кандидат успешно удален', { 
        type: 'success',
        title: 'Успешно',
        buttonText: 'Отлично'
      });
    }).catch((e) => {
      const errorMessage = e.response?.data?.message || 'Не удалось удалить кандидата';
      alert.show(errorMessage, { 
        type: 'error',
        title: 'Ошибка удаления',
        buttonText: 'Закрыть'
      });
      console.error('Ошибка при удалении:', e.message);
      throw e;
    });
  }

  onMounted(getInterns);
  
  return { 
    getInterns, 
    skillsList,
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
    getSkillsList
  }
});