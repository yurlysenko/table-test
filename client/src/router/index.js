import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TableView from '../views/Table/View.vue';
import TableCreate from '../views/Table/Create.vue';
import TableEdit from '../views/Table/Edit.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/table',
      name: 'table',
      component: TableView
    },
    {
      path: '/table/create',
      name: 'tableCreate',
      component: TableCreate
    },
    {
      path: `/table/:id/edit`,
      name: 'tableEdit',
      component: TableEdit
    }
  ]
})

export default router