import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '~/layouts/BaseLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayout,
      children: [
        {
          path: '/',
          name: 'App',
          component: () => import('~/views/Home.vue'),
        },
      ],
    },
  ],
})

export default router
