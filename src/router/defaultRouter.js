const defaultRouter = [
  // 登录页
  {
    path: '/',
    name: '登录页',
    component: () => import('@/views/login')
  },
  {
    path: '/page',
    name: '首页模块',
    icon: 'iconfont icon-shouye',
    level: 1,
    component: () => import('@/views/index'),
    children: [
      {
        path: '/home',
        name: '首页',
        component: () => import('@/views/home/index'),
        meta: { title: '首页', path: '/home', visible: true, keepAlive: false }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    name: '404',
    title: '页面找不到了',
    component: () => import('@/views/404')
  }
]
export default defaultRouter
