import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Intern } from '../types/types';
// export interface Intern {
  // id: number;
  // name: string;
  // position: string;
  // education: string;
  // skills: string;
  // experience: string;
  // hoursPerWeek: number;
  // employmentType: string;
  // email: string;
  // phone: string;
  // resume: string;
// } 

export const useInternStore = defineStore('interns', () => {
  let internsArr = ref<Intern[]>([]);


  function getInterns () {
    axios.get('http://do.gberdyshev.tech:8080/api/v1/candidates')
    .then((res) => {
        internsArr.value = res.data.data;
        console.log(res.data.data)
    }).catch((e) => {
      console.log(e.message)
    })
  }

  function deleteInterns (id : string) {
    axios.delete(`http://do.gberdyshev.tech:8080/api/v1/candidates${id}`)
    .then((res) => {
      internsArr.value = internsArr.value.filter((intern) => intern.id !== id)
      alert('Успешно удалено')
    }).catch((e) => {
      console.log("Error")
    })
  }

  function patchIntern (id: string, updatedItem: Object) {
    console.log(id, updatedItem)
    axios.put(`http://do.gberdyshev.tech:8080/api/v1/candidates/${id}`, updatedItem)
    .then((res) => {
      console.log(res.data)
      alert('Данные успешно обновлены');
    }).catch((e) => {
      console.log("Error")
    })
  }

  function postIntern (updatedItem: Object) {
    console.log(updatedItem)
    axios.post(`http://do.gberdyshev.tech:8080/api/v1/candidates`, updatedItem)
    .then((res) => {
      
      console.log(res.data);
      alert('Успешно создан кандидат');
    }).catch((e) => {
      console.log("Error")
    })
  }


    onMounted(getInterns);
  return { getInterns, internsArr, deleteInterns, patchIntern, postIntern }
})