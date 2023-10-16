<template>
  <div id="app">
    <keep-alive>
      <RouterView id="router-view" v-if="$route.meta.keepAlive" />
    </keep-alive>
    <RouterView id="router-view" v-if="!$route.meta.keepAlive" />
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
#router-view{width:100%;height:100%;display:flex;}
</style>
