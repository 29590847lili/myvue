<template>
  <div class="page-left">
    <div class="logo-block" :style="`background:${theme}`">
      <!-- <p><img src="../assets/login-logo.png" /></p> -->
      <p>管理平台</p>
    </div>
    <div class="global-menu">
      <el-menu :defaultActive="defaultActive" router uniqueOpened>
        <template v-for="(item) in $store.state.menus">
          <template v-if="item.level === 1">
            <!-- 一级导航 -->
            <el-menu-item class="one-link" :index="item.children[0].meta.path" :key="item.children[0].meta.path">
              <i :class="item.icon"></i>
              <span slot="title">{{item.children[0].meta.title}}</span>
            </el-menu-item>
          </template>
          <!-- 多级 -->
          <template v-else>
            <ElSubmenu :menus="item" :key="item.path" />
          </template>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import ElSubmenu from './elSubmenu'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      defaultActive: '' // 当前页路由
    }
  },
  watch: {
    $route: {
      handler (router) {
        const path = router.meta.parentPath ? router.meta.parentPath : router.meta.path // 判断是否详情
        localStorage.setItem('defaultActive', path)
        this.defaultActive = path
      },
      deep: true,
      immediate: true
    }
  },
  computed: mapGetters({
    theme: 'GET_COLOUR'
  }),
  created () {
    if (localStorage.getItem('defaultActive')) this.defaultActive = localStorage.getItem('defaultActive')
  },
  components: {
    ElSubmenu
  }
}
</script>

<style lang="less" scoped>
.page-left {
  width: 100%;
  height: 100%;
  .logo-block {
    width: 100%;
    height: 55px;
    background: #409eff;
    box-shadow: -3px 0 8px rgba(0, 0, 0, 0.2);
    position: relative;
    z-index: 1;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    p {
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      img {
        width: 50px;
      }
    }
  }
}
</style>
