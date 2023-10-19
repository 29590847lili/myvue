// 功能管理
const Route = [
  {
    path: '/css',
    name: 'CSS',
    icon: 'iconfont icon-xitongguanli',
    level: 2,
    component: () => import('@/views/index'),
    children: [
      {
        path: 'contenteditable',
        name: '可编辑contenteditable',
        component: () => import('@/views/css/contenteditable'),
        meta: { parentTitle: 'CSS', title: 'contenteditable', path: '/css/contenteditable', visible: true, keepAlive: false }
      },
      {
        path: 'swiperList',
        name: '滑动列表',
        component: () => import('@/views/css/swiperList'),
        meta: { parentTitle: 'CSS', title: '滑动列表', path: '/css/swiperList', visible: true, keepAlive: false }
      },
      // demo
      {
        path: 'addEditUsers',
        name: '新增编辑用户',
        component: () => import('@/views/systemManage/components/addEditUsers'),
        meta: { ancestorTitle: '系统管理', parentTitle: '用户管理', title: '新增编辑用户', parentPath: '/systemManage/usersManage', path: '/systemManage/addEditUsers', visible: false, keepAlive: false }
      }
    ]
  }
]
export default Route
