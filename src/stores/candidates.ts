import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import type { Candidate } from '../types/types';
// export interface Candidate {
//   id: number;
//   name: string;
//   position: string;
//   education: string;
//   skills: string;
//   experience: string;
//   hoursPerWeek: number;
//   employmentType: string;
//   email: string;
//   phone: string;
//   resume: string;
// } 

export const useCandidatesStore = defineStore('candidates', () => {
  let candidatesArr = ref<Candidate[]>([]);


  function getCandidates () {
    axios.get('https://44f1275207c2a7d3.mokky.dev/candidates')
    .then((res) => {
      candidatesArr.value = res.data;
    }).catch((e) => {
      console.log(e.message)
    })
  }

  function deleteCandidate (id : number) {
    axios.delete(`https://44f1275207c2a7d3.mokky.dev/candidates/${id}`)
    .then((res) => {
      candidatesArr.value = candidatesArr.value.filter((candidate) => candidate.id !== id)
      alert('Успешно удалено')
    }).catch((e) => {
      console.log("Error")
    })
  }

  function patchCandidate (id : number, updatedItem: Object) {
    axios.patch(`https://44f1275207c2a7d3.mokky.dev/candidates/${id}`, updatedItem)
    .then((res) => {
      console.log(res);
      alert('Данные успешно обновлены')
    }).catch((e) => {
      console.log("Error")
    })
  }

  function postCandidate(createdItem: Object): Promise<any> { // Явно указываем возвращаемый тип Promise
    return axios.post(`https://44f1275207c2a7d3.mokky.dev/candidates`, createdItem)
      .then((res) => {
        const newItem = res.data;
        candidatesArr.value.push(newItem);
        return newItem; // Возвращаем данные
      })
      .catch((e) => {
        console.error('Ошибка при создании стажера', e);
        throw e; // Пробрасываем ошибку дальше
      });
  }

  onMounted(getCandidates)
  return { getCandidates, candidatesArr, deleteCandidate, patchCandidate, postCandidate }
})
