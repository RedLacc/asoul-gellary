import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/LoginPage.vue'
import RecordsPage from '@/views/RecordsPage.vue'
import GerraryPage from '@/views/GarreryPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // {
    //   path: '/',
    //   redirect: '/login',
    // },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/records',
      component: RecordsPage,
    },
    {
      path: '/gallery',
      component: GerraryPage,
    },
  ],
})

export default router
