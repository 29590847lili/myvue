<template>
<div>
  <el-submenu :index="menus.path" class="menu-one">
    <template slot="title">
      <i :class="menus.icon"></i>
      <span slot="title">{{menus.name}}</span>
    </template>
    <template v-if="menus.children && menus.children.length > 1">
      <template v-for="item in menus.children">
        <template v-if="item.children && item.children.length">
          <el-submenu :index="item.path" :key="item.path" class="menu-three">
            <span slot="title">{{item.name}}</span>
            <template v-if="item.children && item.children">
              <template v-for="cItem in item.children">
                <el-menu-item v-if="cItem.meta.visible" :index="cItem.meta.path" :key="cItem.meta.path">{{cItem.meta.title}}</el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item v-if="item.meta.visible" :index="item.meta.path" :key="item.path" class="menu-two">{{item.meta.title}}</el-menu-item>
        </template>
      </template>
    </template>
  </el-submenu>
</div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'submenu',
  props: {
    menus: {
      default: () => {},
      type: Object
    }
  },
  watch: {
    $route: {
      handler (router) {
        const path = router.meta.parentPath ? router.meta.parentPath : router.meta.path // 判断是否详情
        localStorage.setItem('defaultActive', path)
        this.defaultActive = path
      },
      deep: true
    }
  },
  computed: mapGetters({
    theme: 'GET_COLOUR'
  }),
  created () {
    const path = this.$route.meta.parentPath ? this.$route.meta.parentPath : this.$route.meta.path // 判断是否详情
    this.defaultActive = path
  }
}
</script>
<style lang="less" scoped>
</style>
