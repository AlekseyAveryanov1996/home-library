import { createRouter, createWebHistory } from 'vue-router'
import TheRegistr from '@/pages/TheRegistr.vue'
import TheLogIn from '@/pages/TheLogIn.vue'
import TheStartWindow from '@/pages/TheStartWindow.vue'
import { useUserStore } from '@/stores/userStore'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TheStartWindow,
      meta: { requiresAuth: true }
    },
    {
      path: '/registration/',
      name: 'registration',
      component: TheRegistr,
      meta: { requiresAuth: false }
    },
    {
      path: '/logIn/',
      name: 'logIn',
      component: TheLogIn,
      meta: { requiresAuth: false }
    },
  ],
})

router.beforeEach(async (to, from, next) => {

  const usersStore = useUserStore();
  await usersStore.fetchUser();
  
  const isAuth = await usersStore.userLoading;

  if (to.meta.requiresAuth && !isAuth) {
    next('/logIn/');
  } else if (!to.meta.requiresAuth && isAuth) {
    next('/');
  } else {
    next();
  }

})

export default router
