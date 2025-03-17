import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './components/HomeView.vue'

const routes = [
  { path: '/:building/:room/:problemtypeid', component: HomeView, props: true}
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router