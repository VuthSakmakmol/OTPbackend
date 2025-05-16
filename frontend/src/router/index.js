import { createRouter, createWebHistory } from 'vue-router'

import Guest from '../views/Guest.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import SuperadminDashboard from '../views/dashboards/SuperadminDashboard.vue'
import AdminDashboard from '../views/dashboards/AdminDashboard.vue'
import DeliveryDashboard from '../views/dashboards/DeliveryDashboard.vue'
import CustomerDashboard from '../views/dashboards/CustomerDashboard.vue'

const routes = [
  { path: '/', component: Guest },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/superadmin/dashboard', component: SuperadminDashboard },
  { path: '/admin/dashboard', component: AdminDashboard },
  { path: '/delivery/dashboard', component: DeliveryDashboard },
  { path: '/customer/dashboard', component: CustomerDashboard },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
