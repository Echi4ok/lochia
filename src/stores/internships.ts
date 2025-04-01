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
    axios.get('https://c81b66adafc63de9.mokky.dev/internship')
    .then((res) => {
        internsArr.value = res.data;
    }).catch((e) => {
      console.log(e.message)
    })
  }

  function deleteInterns (id : number) {
    axios.delete(`https://c81b66adafc63de9.mokky.dev/internship/${id}`)
    .then((res) => {
      internsArr.value = internsArr.value.filter((intern) => intern.id !== id)
      alert('Успешно удалено')
    }).catch((e) => {
      console.log("Error")
    })
  }

  function patchIntern (id: number, updatedItem: Object) {
    axios.patch(`https://c81b66adafc63de9.mokky.dev/internship/${id}`, updatedItem)
    .then((res) => {
      console.log(res);
      alert('Данные успешно обновлены');
    }).catch((e) => {
      console.log("Error")
    })
  }

  // function getSearch () {
  //   axios.get(`https://c81b66adafc63de9.mokky.dev/internship`)
  //   .then((res) => {
  //     console.log(res);
      
  //   }).catch((e) => {
  //     console.log("Error")
  //   })
  // }

  function postIntern(createdItem: Object): Promise<any> { // Явно указываем возвращаемый тип Promise
    return axios.post(`https://c81b66adafc63de9.mokky.dev/internship`, createdItem)
      .then((res) => {
        const newItem = res.data;
        internsArr.value.push(newItem);
        return newItem; // Возвращаем данные
      })
      .catch((e) => {
        console.error('Ошибка при создании стажера', e);
        throw e; // Пробрасываем ошибку дальше
      });
  }


    onMounted(getInterns);
  return { getInterns, internsArr, deleteInterns, patchIntern, postIntern }
})