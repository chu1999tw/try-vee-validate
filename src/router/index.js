import {createRouter, createWebHashHistory} from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../view/index.vue'),
    },
    {
      path: '/form/create',
      name: 'create',
      component: () => import('../view/Form/CreateFormView.vue'),
    },
    {
      path: '/form/edit',
      name: 'edit',
      component: () => import('../view/Form/EditFormView.vue'),
    },
    {
      path: '/form/view',
      name: 'view',
      component: () => import('../view/Form/ViewFormView.vue'),
    },
    {
      path: '/form/test',
      name: 'test',
      component: () => import('../view/Form/TestFormView.vue'),
    },
  ],
})

export default router
