import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);
import Main from '@/core/main'
import Page1 from '@/views/page1'
import Page2 from '@/views/page2'
import Page3 from '@/views/page3'
import Page4 from '@/views/page4'
import Home from '@/views/home'
import Login from '@/components/login'
import NotFount from '@/layout/404'
export default new Router({
    routes: [
      {
        path: '/',
        name: 'Login',
        component: Login
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/home',
        name: '布局',
        component: Home
      },
      {
        path: '/core/mian',
        name: 'Main',
        component: Main,
        children:[
          {
            path: '/views/home',
            name: 'Home',
            component: Home
          },
          {
            path: '/views/page1',
            name: 'Page1',
            component: Page1
          },
          {
            path: '/views/page2',
            name: 'Page2',
            component: Page2
          },
          {
            path: '/views/page3',
            name: 'Page3',
            component: Page3
          },
          {
            path: '/views/page4',
            name: 'Page4',
            component: Page4
          },
          {
            path: '/views/*',
            name: 'NotFount',
            component: NotFount
          },
        ]
      },
      {
        path: '*',
        name: 'NotFount',
        component: NotFount
      },
    ]
  })