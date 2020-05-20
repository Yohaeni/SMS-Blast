import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import RecipientDirectory from '@/components/RecipientDirectory';

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'SMS Blast',
      component: HelloWorld
    },
    {
      path: '/recipients',
      name: 'SMS Blast - Recipient Directory',
      component: RecipientDirectory
    }
  ]
})
