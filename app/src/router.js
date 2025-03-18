import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './components/HomeView.vue'
import Admin from './components/Admin.vue'

const routes = [
  { path: '/:building/:room/:problemtypeid', component: HomeView, props: true},
  { path: '/admin', component: Admin}
]
 
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router