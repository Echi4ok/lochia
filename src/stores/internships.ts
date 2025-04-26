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

export const useInternshipsStore = defineStore('internships', () => {
  let internshipsArr = ref<Intern[]>([]);
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
    axios.get(`${API_BASE_URL}/internships`, {
      params: {
        ...pagination,
        ...filters,
        ...sort,
      }
    })
    .then((res) => {
      internshipsArr.value = res.data.data;
      Object.assign(setPagination, res.data.pagination);
    }).catch((e) => {
      const errorMessage = e.response?.data?.message || 'Не удалось загрузить стажировки';
      alert.show(errorMessage, { 
        type: 'error',
        title: 'Ошибка загрузки',
        buttonText: 'Понятно'
      });
      console.error('Ошибка при загрузке стажировок:', e.message);
    });
  }

  function deleteInterns(id: string) {
    axios.delete(`${API_BASE_URL}/internships/${id}`)
    .then((res) => {
      internshipsArr.value = internshipsArr.value.filter((intern: Intern) => intern.id !== id);
      alert.show('Стажировка успешно удалена', { 
        type: 'success',
        title: 'Успешно',
        buttonText: 'Отлично'
      });
    }).catch((e) => {
      const errorMessage = e.response?.data?.message || 'Не удалось удалить стажировку';
      alert.show(errorMessage, { 
        type: 'error',
        title: 'Ошибка удаления',
        buttonText: 'Закрыть'
      });
      console.error('Ошибка при удалении стажировки:', e.message);
      throw e;
    });
  }

  function patchIntern(id: string, updatedItem: InternBody) {
    axios.put(`${API_BASE_URL}/internships/${id}`, updatedItem)
    .then((res) => {
      alert.show('Данные стажировки успешно обновлены', { 
        type: 'success',
        title: 'Успешно',
        buttonText: 'OK'
      });
      console.log('Данные стажировки обновлены:', res.data);
    }).catch((e) => {
      const errorMessage = e.response?.data?.message || 'Не удалось обновить данные стажировки';
      alert.show(errorMessage, { 
        type: 'error',
        title: 'Ошибка обновления',
        buttonText: 'Понятно'
      });
      console.error('Ошибка при обновлении стажировки:', e.message);
      throw e;
    });
  }

  function postIntern(createdItem: InternBody) {
    axios.post(`${API_BASE_URL}/internships`, createdItem)
    .then((res) => {
      internshipsArr.value.push(res.data[0]);
      alert.show('Новая стажировка успешно создана', { 
        type: 'success',
        title: 'Успешно',
        buttonText: 'Отлично'
      });
      console.log('Добавлена стажировка:', res.data[0]);
    }).catch((e) => {
      const errorMessage = e.response?.data?.message || 'Не удалось создать стажировку';
      alert.show(errorMessage, { 
        type: 'error',
        title: 'Ошибка создания',
        buttonText: 'Закрыть'
      });
      console.error('Ошибка при создании стажировки:', e.message);
      throw e;
    });
  }

  onMounted(getInterns);
  
  return { 
    getInterns, 
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
});