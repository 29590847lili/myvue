import Vue from 'vue'
import VueRouter from 'vue-router'
import $store from '@/store/index'
import DefaultRouter from './defaultRouter' // 默认路由配置
import SystemManage from './systemManage' // 系统管理
import functionManage from './functionManage' // 功能管理
import css from './cssRouter'
import chart from './chart' // 图表管理

Vue.use(VueRouter)

const routes = [
  ...DefaultRouter,
  ...SystemManage,
  ...functionManage,
  ...chart,
  ...css
]

const router = new VueRouter({
  mode: 'hash', // history
  base: process.env.BASE_URL,
  routes
})

// 防止重复点击路由
const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err)
}

// 路由全局守卫
router.beforeEach((to, from, next) => {
  // 静态路由 动态路由接口再/components/globalMenu.vue中调取接口获得
  $store.state.menus = []
  $store.state.menuPaths = []
  routes.filter(item => {
    // 菜单路由
    if (item.meta || item.children) $store.state.menus.push(item)
    // 层级路由
    if (item.meta && !item.children) $store.state.menuPaths.push(item.meta.path)
    if (!item.meta && item.children) {
      item.children.map(cItem => {
        $store.state.menuPaths.push(cItem.meta.path)
      })
    }
  })
  const theme = localStorage.getItem('theme')
  if (to.path === '/') {
    localStorage.clear()
    if (theme) localStorage.setItem('theme', theme)
    next()
  } else {
    if (localStorage.getItem('Authorization')) {
      next()
    } else {
      router.push('/')
      next()
    }
  }
})
export default router
