import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export interface Candidate {
  id: number;
  name: string;
  position: string;
  education: string;
  skills: string;
  experience: string;
  hoursPerWeek: number;
  employmentType: string;
  email: string;
  phone: string;
  resume: string;
}

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
    axios.delete(`https://44f1275207c2a7d3.mokky.dev/candidates${id}`)
    .then((res) => {
      console.log(res)
      getCandidates();
    }).catch((e) => {
      console.log("Error")
    })
  }

  onMounted(getCandidates)
  return { getCandidates, candidatesArr, deleteCandidate }
})
