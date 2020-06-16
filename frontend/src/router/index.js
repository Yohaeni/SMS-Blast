import Vue from 'vue'
import Router from 'vue-router'
import SmsBlast from '@/components/SmsBlast'
import Login from '@/components/Login'
import Register from '@/components/Register'
import MainPage from '@/components/MainPage'
import Audit from '@/components/Audit'
import Subscribe from '@/components/Subscribe'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/sms',
      name: 'SMS Blast',
      component: SmsBlast
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/audit',
      name: 'Audit',
      component: Audit
    },
    {
      path: '/subscribe',
      name: 'Subscribe',
      component: Subscribe
    }
  ]
})
