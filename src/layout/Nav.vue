<template>
  <div class="nav">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" id="1" @click="goPage('/views/page1')">页面1-1</el-menu-item>
          <el-menu-item index="1-2" id="2" @click="goPage('/views/page2')">页面1-2</el-menu-item>
          <el-menu-item index="1-3" id="3" @click="goPage('/views/page3')">page3</el-menu-item>
          <el-menu-item index="1-4" id="4" @click="goPage('/views/page4')">page4</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航二</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" id="1" @click="goPage('/views/home')">home</el-menu-item>
          <el-menu-item index="1-1" id="1" @click="goPage('/home')">布局</el-menu-item>
          <el-menu-item index="1-1" id="1" @click="goPage('/views/home1')">home1</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'menus',
  props: {
    msg: String
  },
  methods: {
    handleOpen(key, keyPath) {
    console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
    console.log(key, keyPath);
    },
    goPage(key){
        this.$router.push({
            path: key,
        })
    }
  }
}
</script>

<style lang='less' scoped>
.main{
  .header{
    background:rgb(191, 221, 208);
    height:60px;
  }
}
</style>
