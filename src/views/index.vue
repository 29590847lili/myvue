<template>
  <div id="router-view">
    <div id="app-left">
      <GlobalMenu />
    </div>
    <div id="app-main">
      <!-- 面包屑 -->
      <!-- <CrumbsMenu /> -->
      <PageHeader />
      <keep-alive>
        <RouterView id="global-main" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <RouterView id="global-main" v-if="!$route.meta.keepAlive" />
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/pageHeader'
export default {
  data () {
    return {
      hideAssembly: false
    }
  },
  components: {
    PageHeader
  }
}
</script>

<style lang="less" scoped>
@leftWeith: 257px;
#app-left {
  width: @leftWeith;
  height: 100%;
  background: #fff;
}
#app-main {
  width: calc(100% - @leftWeith);
  height: 100%;
  #global-main {
    width: 100%;
    height: calc(100% - 50px);
    padding: 0;
    overflow-y: auto;
    background: #eceff5;
  }
}
.el-submenu__title i,
.el-menu-item i {
  color: #fff;
}
</style>
