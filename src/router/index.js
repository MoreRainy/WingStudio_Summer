import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginPage.vue'),
      children: [
        {
          path: '/LoginQR',
          component: () => import('@/views/login/LoginQR.vue')
        },
        {
          path: '/LoginPhone',
          component: () => import('@/views/login/LoginPhone.vue')
        }
      ],
      redirect: '/loginQR'
    },
    {
      path: '/',
      component: () => import('@/views/find/FindPage.vue')
    }
  ]
})

export default router
