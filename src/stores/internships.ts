import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export interface Intern {
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
    axios.delete(`https://c81b66adafc63de9.mokky.dev/internship${id}`)
    .then((res) => {
      console.log(res)
      getInterns();
    }).catch((e) => {
      console.log("Error")
    })
  }

    onMounted(getInterns);
  return { getInterns, internsArr, deleteInterns }
})