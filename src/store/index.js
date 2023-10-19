import Vue from 'vue'
import Vuex from 'vuex'
import theme from './theme'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    appId: 13,
    orgInfo: {}, // 机构信息
    orgDetails: {}, // 机构详情
    userInfo: {}, // 登录用户信息
    menus: [], // 菜单路由
    menuPaths: [], // 层级路由
    LoadingoOptions: { // loading配置
      lock: true,
      spinner: 'el-icon-loading',
      customClass: 'win-loading'
    },
    pageSizes: [10, 20, 50, 100], // 翻页pageSizes
    pageSize: 10, // 当前页条数
    layout: 'total, sizes, prev, pager, next, jumper', // 翻页组件
    // 拖拽（其他页面的不要放在这里面）
    supervise: {
      dragStatus: 0, // 0未开始、1拖拽中、2到达目标范围、3离开目标范围、5目标范围内释放
      dragItem: null, // 拖拽中的题型、题库、status=（1拖拽中、2已完成）
      formList: [], // 问卷列表
      selectItem: null // 当前选中
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    theme
  }
})
