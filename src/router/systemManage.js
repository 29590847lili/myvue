// 系统管理
const Route = [
  {
    path: '/systemManage',
    name: '系统管理',
    icon: 'iconfont icon-xitongguanli',
    level: 2,
    component: () => import('@/views/index'),
    children: [
      {
        path: 'usersManage',
        name: '用户管理',
        component: () => import('@/views/systemManage/usersManage'),
        meta: { parentTitle: '系统管理', title: '用户管理', path: '/systemManage/usersManage', visible: true, keepAlive: false }
      },
      {
        path: 'roleManage',
        name: '角色管理',
        component: () => import('@/views/systemManage/roleManage'),
        meta: { parentTitle: '系统管理', title: '角色管理', path: '/systemManage/roleManage', visible: true, keepAlive: false }
      },
      {
        path: 'dataRightsManage',
        name: '数据权限管理',
        component: () => import('@/views/systemManage/dataRightsManage'),
        meta: { parentTitle: '系统管理', title: '数据权限管理', path: '/systemManage/dataRightsManage', visible: true, keepAlive: false }
      },
      // 新增编辑页面
      {
        path: 'addEditUsers',
        name: '新增编辑用户',
        component: () => import('@/views/systemManage/components/addEditUsers'),
        meta: { ancestorTitle: '系统管理', parentTitle: '用户管理', title: '新增编辑用户', parentPath: '/systemManage/usersManage', path: '/systemManage/addEditUsers', visible: false, keepAlive: false }
      },
      {
        path: 'addEditRole',
        name: '新增编辑角色',
        component: () => import('@/views/systemManage/components/addEditRole'),
        meta: { ancestorTitle: '系统管理', parentTitle: '角色管理', title: '新增编辑角色', parentPath: '/systemManage/roleManage', path: '/systemManage/addEditRole', visible: false, keepAlive: false }
      },
      {
        path: 'permissionSetting',
        name: '权限设置',
        component: () => import('@/views/systemManage/components/permissionSetting'),
        meta: { ancestorTitle: '系统管理', parentTitle: '角色管理', title: '权限设置', parentPath: '/systemManage/roleManage', path: '/systemManage/permissionSetting', visible: false, keepAlive: false }
      },
      {
        path: 'addEditPermission',
        name: '创建编辑数据权限',
        component: () => import('@/views/systemManage/components/addEditPermission'),
        meta: { ancestorTitle: '系统管理', parentTitle: '数据权限管理', title: '创建编辑数据权限', parentPath: '/systemManage/dataRightsManage', path: '/systemManage/addEditPermission', visible: false, keepAlive: false }
      }
    ]
  }
]
export default Route
