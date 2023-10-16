import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// ElementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// Axios
import axios from 'axios'
import '@/axios/request'
// 引入全局css
import '@/styles/reset.less'
import '@/styles/style.less'
import '@/styles/layout.less'
import '@/styles/reset-element-ui.less'
// 公共组件
import '@/utils/yc-assembly'
// 粒子特效
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

Vue.prototype.$axios = axios
Vue.use(ElementUI, { size: 'small', zIndex: 3000 })
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
