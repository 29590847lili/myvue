// 功能管理
const Route = [
  {
    path: '/questionnaire',
    name: '问卷',
    icon: 'iconfont icon-xitongguanli',
    level: 2,
    component: () => import('@/views/index'),
    children: [
      {
        path: 'generateQuestionnaire',
        name: '拖拽生成问卷',
        component: () => import('@/views/questionnaire/generateQuestionnaire/generateQuestionnaire'),
        meta: { parentTitle: '问卷', title: '拖拽生成问卷', parentPath: '/questionnaire', path: '/questionnaire/generateQuestionnaire', visible: true, keepAlive: false }
      },
      {
        path: 'viewQuestionnaire',
        name: '查看生成问卷',
        component: () => import('@/views/questionnaire/generateQuestionnaire/viewQuestionnaire'),
        meta: { parentTitle: '问卷', title: '查看生成问卷', parentPath: '/questionnaire', path: '/questionnaire/viewQuestionnaire', visible: true, keepAlive: false }
      },
      // demo .vue
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
