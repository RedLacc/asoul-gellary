import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/LoginPage.vue'
import Home from '@/views/HomePage.vue'
import ShowBoard from '@/components/ShowBoard.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/records',
      component: ShowBoard,
    },
  ],
})

export default router
