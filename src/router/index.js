import Vue from 'vue';
import Router from 'vue-router'

Vue.use(Router);
const Layout = () => import('@/layout/index')
const Home = () => import('@/views/home')
const Page1 = () => import('@/views/html/page1')
const Page2 = () => import('@/views/html/page2')
const Page3 = () => import('@/views/html/page3')
const TwoColumnLayout = () => import('@/views/css/TwoColumnLayout')
const ThreeColumnLayout = () => import('@/views/css/ThreeColumnLayout')
const HeightFollowWidth = () => import('@/views/css/HeightFollowWidth')
const BFC = () => import('@/views/css/BFC')
const PointerEvents = () => import('@/views/css/PointerEvents')
const NewAndError = () => import('@/views/js/NewAndError')
// 登录页
const Login = () => import('@/components/login')
const NotFount = () => import('@/layout/404')

// 固定的路由表
export const fixedRouter = [{
  path: '',
  component: Login,
  hidden: true
},
{
  path: '',
  component: Layout, //整体页面的布局(包含左侧菜单跟主内容区域)
  children: [{
    path: 'main',
    component: Home,
    meta: {
      title: '首页', //菜单名称
      roles: ['user', 'admin'], //当前菜单哪些角色可以看到
      icon: 'el-icon-info' //菜单左侧的icon图标
    }
  }]
},

]

export const permissionRouter = [
  {
    path: '/css',
    name: 'Css',
    component: Layout,
    meta: {
      title: "css复习内容",
      icon: 'el-icon-info',
      roles: ['admin', 'user']
    },
    children:[
      {
        path: 'threecolumnlayout',
        name: 'ThreeColumnLayout',
        icon: "el-icon-upload",
        component: ThreeColumnLayout,
        meta: {
          title: "三栏布局",
          icon: "el-icon-upload",
          roles: ['user', 'admin']
        }
      },    
      {
        path: 'twocolumnlayout',
        name: 'TwoColumnLayout',
        component: TwoColumnLayout,
        meta: {
          title: "两栏布局",
          icon: "el-icon-upload",
          roles: ['user', 'admin']
        }
      },
      {
        path: 'heightfollowwidth',
        name: 'HeightFollowWidth',
        component: HeightFollowWidth,
        meta: {
          title: "高度随着宽度变化",
          icon: "el-icon-upload",
          roles: ['user', 'admin']
        }
      },
      {
        path: 'bfc',
        name: 'BFC',
        component: BFC,
        meta: {
          title: "BFC",
          icon: "el-icon-upload",
          roles: ['user', 'admin']
        }
      },
      {
        path:'pointerevents',
        name:'PointerEvents',
        component: PointerEvents,
        meta: {
          title: "PointerEvents",
          icon: "el-icon-upload",
          roles: ['user', 'admin']
        }
      }
      // {
      //   path: '/*',
      //   name: 'NotFount',
      //   component: NotFount
      // },
    ]
  },
  {
    path: '/html',
    name: 'Html',
    component: Layout,
    meta: {
      title: "html复习内容",
      icon: 'el-icon-info',
      roles: ['admin', 'user']
    },
    children:[
      {
        path: 'page1',
        name: 'Page1',
        component: Page1,
        meta: {
          title: "设置sessionStorge",
          icon: "el-icon-upload",
          roles: ['user', 'admin']
        }
      },
      {
        path: 'page2',
        name: 'Page2',
        component: Page2,
        meta: {
          title: "展示sessionStorge",
          icon: "el-icon-upload",
          roles: ['user', 'admin']
        }
      },
      {
        path: 'page3',
        name: 'Page3',
        component: Page3,
        meta: {
          title: "重置sessionStorge",
          icon: "el-icon-upload",
          roles: ['user', 'admin']
        }
      },

      //NewAndError
      // {
      //   path: '/*',
      //   name: 'NotFount',
      //   component: NotFount
      // },
    ]
  },
  {
    path: '/js',
    name: 'JS',
    component: Layout,
    meta: {
      title: "JS复习内容",
      icon: 'el-icon-info',
      roles: ['admin', 'user']
    },
    children:[
      {
        path: 'newanderror',
        name: 'NewAndError',
        component: NewAndError,
        meta: {
          title: "New时候如何实现报错",
          icon: "el-icon-upload",
          roles: ['user', 'admin']
        }
      },
    ]
  },    
]
//NewAndError
      // {
      //   path: '/*',
      //   name: 'NotFount',
      //   component: NotFount
      // }, 
export default new Router({
  routes: fixedRouter
})
  