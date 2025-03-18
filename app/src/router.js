import { createWebHistory, createRouter } from 'vue-router'

import HomeView from './components/HomeView.vue'
import Admin from './components/Admin.vue'
import Qr from './components/Qr.vue'

const routes = [
  { path: '/:building/:room/:problemtypeid', component: HomeView, props: true},
  { path: '/admin', component: Admin},
  { path: '/qr', component: Qr}
]
 
const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router