import { ref, computed, onMounted } from 'vue'
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
  let internsArr = ref<Intern[]>([]);


  function getInterns () {
    axios.get('http://do.gberdyshev.tech:8080/api/v1/candidates')
    .then((res) => {
        internsArr.value = res.data.data;
        console.log(res.data)
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
  return { getInterns, internsArr, deleteInterns, patchIntern, postIntern, getFilteredInterns }
})