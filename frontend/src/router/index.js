import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import PublicLayout from '@/layouts/PublicLayout.vue'
import SuperAdminLayout from '@/layouts/SuperAdminLayout.vue'
import DeliveryLayout from '@/layouts/DeliveryLayout.vue'
import CustomerLayout from '@/layouts/CustomerLayout.vue'

// Public Pages
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Register from '@/pages/Register.vue'

// Superadmin Pages
import SuperAdminDashBoard from '@/pages/superadmin/SuperAdminDashBoard.vue'
import SuperAdminManageStaff from '@/pages/superadmin/SuperAdminManageStaff.vue'
import SuperAdminManageCustomer from '@/pages/superadmin/SuperAdminManageCustomer.vue'
import SuperAdminTrackMap from '@/pages/superadmin/SuperAdminTrackMap.vue'

// Delivery Pages
import DeliveryDashboard from '@/pages/delivery/DeliveryDashboard.vue'
import DeliveryTrackMap from '@/pages/delivery/DeliveryTrackMap.vue'

// Customer 
import CustomerDashboard from '@/pages/customer/CustomerDashboard.vue'
import CustomerTrackMap from '@/pages/customer/CustomerTrackMap.vue'


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
      },
      {
        path: 'manage-customer',
        name: 'SuperAdminManageCustomer',
        component: SuperAdminManageCustomer
      },
      {
        path: '/superadmin/track',
        name: 'SuperAdminTrackMap',
        component: SuperAdminTrackMap
      }


    ],
    meta: { requiresAuth: true, role: 'superadmin' }
  },
  {
    path: '/delivery',
    component: DeliveryLayout,
    children: [
      {
        path: 'dashboard',
        name: 'DeliveryDashboard',
        component: DeliveryDashboard
      },
      {
        path: '/delivery/track',
        name: 'DeliveryTrack',
        component: DeliveryTrackMap
      }
    ]
  },
  {
  path: '/customer',
  component: CustomerLayout,
  children: [
    {
      path: 'dashboard',
      name: 'CustomerDashboard',
      component: CustomerDashboard
    },
    {
      path: 'track',
      name: 'CustomerTrackMap',
      component: CustomerTrackMap
    }
  ]
  },


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
