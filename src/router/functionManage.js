// 功能管理
const Route = [
  {
    path: '/functionManage',
    name: '功能管理',
    icon: 'iconfont icon-xitongguanli',
    level: 2,
    component: () => import('@/views/index'),
    children: [
      {
        path: 'editor',
        name: '编辑器',
        component: () => import('@/views/functionManage/editor'),
        meta: { parentTitle: '功能管理', title: '编辑器', path: '/functionManage/editor', visible: true, keepAlive: false }
      },
      {
        path: 'rightButton',
        name: '右键',
        component: () => import('@/views/functionManage/rightButton'),
        meta: { parentTitle: '功能管理', title: '右键', path: '/functionManage/rightButton', visible: true, keepAlive: false }
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
