import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/HomePage.vue'
import Intern from '../views/InternPage.vue'
import InternshipPage from '@/views/InternshipPage.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/intern',
      name: 'Intern',
      component: Intern,
    },
    {
      path: '/internship',
      name: 'Internship',
      component: InternshipPage,
    },
  ],
})

export default router
