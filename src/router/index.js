import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/pages/login'
import Dashboard from '@/components/admin/Dashboard'
import Products from '@/components/admin/pages/Products'
import Orders from '@/components/admin/pages/Orders'
import Coupons from '@/components/admin/pages/Coupons'
import test from '@/components/HelloWorld'
import CustomerOrder from '@/components/CustomerOrder'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/Login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/admin',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'products',
          name: 'Products',
          component: Products,
          meta: { requiresAuth: true }
        },
        {
          path: 'orders',
          name: 'Orders',
          component: Orders,
          meta: { requiresAuth: true }
        },
        {
          path: 'coupons',
          name: 'Coupons',
          component: Coupons,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard,
      children: [
        {
          path: 'Customer_Order',
          name: 'Customer_Order',
          component: CustomerOrder
        }
      ]
    }
  ]
})
