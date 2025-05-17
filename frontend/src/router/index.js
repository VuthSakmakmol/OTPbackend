import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import PublicLayout from '@/layouts/PublicLayout.vue'
import SuperAdminLayout from '@/layouts/SuperAdminLayout.vue'

// Public Pages
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'

// Superadmin Pages
import SuperAdminDashBoard from '@/pages/superadmin/SuperAdminDashBoard.vue'
import SuperAdminManageStaff from '@/pages/superadmin/SuperAdminManageStaff.vue'


const routes = [
  {
    path: '/',
    component: PublicLayout,
    children: [
      { path: '', name: 'Home', component: Home },
      { path: 'login', name: 'Login', component: Login },
      { path: 'register', name: 'Register', component: Register }
    ]
  },
  {
    path: '/superadmin',
    component: SuperAdminLayout,
    children: [
      {
        path: 'dashboard', // ✅ This is the fix!
        name: 'SuperAdminDashBoard',
        component: SuperAdminDashBoard
      },
      {
        path: 'manage-staff',
        name: 'SuperAdminManageStaff',
        component: SuperAdminManageStaff
      }

    ],
    meta: { requiresAuth: true, role: 'superadmin' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🔐 Navigation Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const role = localStorage.getItem('userRole')

  if (to.meta.requiresAuth) {
    if (!token || role !== to.meta.role) {
      return next('/login')
    }
  }

  next()
})

export default router
