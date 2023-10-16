// 功能管理
const Route = [
  {
    path: '/chart',
    name: '图表',
    icon: 'iconfont icon-xitongguanli',
    level: 2,
    component: () => import('@/views/index'),
    children: [
      {
        path: 'chinaMap',
        name: '中国地图',
        component: () => import('@/views/chart/chinaMap'),
        meta: { parentTitle: '图表', title: '中国地图', path: '/chart/chinaMap', visible: true, keepAlive: false }
      },
      // {
      //   path: 'map',
      //   name: '中国地图2',
      //   component: () => import('@/views/chart/map'),
      //   meta: { parentTitle: '图表', title: '中国地图2', path: '/chart/map', visible: true, keepAlive: false }
      // },
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
