import { createRouter, createWebHistory } from 'vue-router'
import TheDashBoard from '@/pages/TheDashBoard.vue'
import TheRegistr from '@/pages/TheRegistr.vue'
import TheLogIn from '@/pages/TheLogIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheRegistr,
    },
    {
      path: '/logIn/',
      name: 'logIn',
      component: TheLogIn
    },
    {
      path: '/dashboard/',
      name: 'dashboard',
      component: TheDashBoard,
    },
  ],
})

export default router
