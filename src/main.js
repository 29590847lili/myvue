import Vue from 'vue'
// import Main from './core/main.vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
// UI层
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//主题
import '@/assets/element-variables.scss'
Vue.use(ElementUi)

// 国际化
import VueI18n from 'vue-i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.use(VueI18n)

// 使用vue-cookie
import VueCookies from 'vue-cookie'
Vue.use(VueCookies)

function InitLanguage() {
  return Vue.cookie.get('DefaultLanguage') == null ? 'zh-CN' : Vue.cookie.get('DefaultLanguage');
 }

 const i18n = new VueI18n({
   locale:  InitLanguage(), // 语言标识,默认汉语,先去cookie查找，如果存在并有效，cookie值即为默认语言类型；否则默认为中文简体
   messages: {
     'en-US': Object.assign(require("../static/lang/en"),enLocale),
     'zh-CN': Object.assign(require("../static/lang/zh-CN"),zhLocale),
   }
 });


new Vue({
  render: h => h(App),
  router,
  store,
  i18n,
}).$mount('#app')

// 全局前置路由守卫
router.beforeEach( (to,from,next) =>{
  const _token = localStorage.getItem('_token');//查看本地存储上是否有name对象
  if( _token || to.path === '/login'){//短路逻辑，有就可以继续执行，没有就跳转到登录页面
     return next()
  }else{
    next({ name: 'Login' })//跳转登录页面
  }
})