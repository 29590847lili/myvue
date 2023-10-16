import Vue from 'vue'

import GlobalMenu from '@/components/globalMenu'
import ycSearchInput from '@/components/yc-assembly/yc-search-input'
import ycSearchSelect from '@/components/yc-assembly/yc-search-select'
import CrumbsMenu from '@/components/crumbsMenu' // 面包屑导航

Vue.component('GlobalMenu', GlobalMenu)
Vue.component('YcSearchInput', ycSearchInput)
Vue.component('YcSearchSelect', ycSearchSelect)
Vue.component('CrumbsMenu', CrumbsMenu)
