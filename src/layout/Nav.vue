<template>
  <div class="nav">
    <el-menu class="sub_meuns_wapper" mode="vertical" unique-opened :default-active="$route.path" background-color="#304156" text-color="#fff" active-text-color="#409EFF">

      <!-- 遍历路由表，生成左侧菜单 -->
      <template v-for="(item,index) in meuns" v-if="!item.hidden">
        <!-- 一级菜单的情况 -->
        <template v-if="item.children&&item.children.length===1">
          <router-link :to="item.path+'/'+item.children[0].path">
            <!--           index跟浏览器地址对应，这样菜单才能显示选中状态  -->
            <el-menu-item :index="item.path+'/'+item.children[0].path">
              <template slot="title">
                <!-- 设置icon -->
                <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i>
                <!-- 菜单名称 -->
                {{item.children[0].meta.title}}
              </template>
            </el-menu-item>
          </router-link>
        </template>
        <!-- 一级菜单的情况 end-->
        <!-- 多级菜单 -->
        <template v-else>
          <el-submenu :index="item.path">
            <template slot="title">
              <i :class="item.meta.icon"></i>
              {{item.meta.title}}
            </template>
            <!-- 遍历子菜单 -->
            <template v-for="(itemChild,indexChild) in item.children"  v-if="!itemChild.hidden">
              <!-- 当发现存在3级或大于3级菜单时,重新遍历当前组件 -->
              <template v-if="itemChild.children&&itemChild.children.length>0">
                <side-meuns :routes="[itemChild]" class="nest-menu"></side-meuns>
              </template>
              <!-- 2级菜单时-->
              <template v-else>
                <router-link :to="item.path+'/'+itemChild.path">
                  <el-menu-item :index="item.path+'/'+itemChild.path">
                    <i v-if="itemChild.meta.icon" :class="itemChild.meta.icon"></i>
                    {{itemChild.meta.title}}</el-menu-item>
                </router-link>
              </template>
            </template>
            <!-- 遍历子菜单 end-->
          </el-submenu>
        </template>
        <!-- 多级菜单 end-->
      </template>
    </el-menu>
    <!-- <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>css</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" id="1" @click="goPage('/views/home')">三栏布局</el-menu-item>
          <el-menu-item index="1-1" id="1" @click="goPage('/home')">打开新页面三栏布局</el-menu-item>   
          <el-menu-item index="1-4" id="4" @click="goPage('/views/page4')">两栏布局</el-menu-item>
          <el-menu-item index="1-5" id="5" @click="goPage('/views/page5')">css 高度随宽度变化</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>h5</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" id="1" @click="goPage('/views/page1')">设置sessionStorge打开新页面（1）</el-menu-item>
          <el-menu-item index="1-2" id="2" @click="goPage('/views/page2')">展示sessionStorge（2）</el-menu-item>
          <el-menu-item index="1-3" id="3" @click="goPage('/views/page3')">重置sessionStorge（3）</el-menu-item>
          <el-menu-item index="1-1" id="1" @click="goPage('/views/home1')">404</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>js</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" id="1" @click="goPage('/views/page1')">设置sessionStorge打开新页面（1）</el-menu-item>
          <el-menu-item index="1-2" id="2" @click="goPage('/views/page2')">展示sessionStorge（2）</el-menu-item>
          <el-menu-item index="1-3" id="3" @click="goPage('/views/page3')">重置sessionStorge（3）</el-menu-item>
          <el-menu-item index="1-1" id="1" @click="goPage('/views/home1')">404</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu> -->
  
  </div>
</template>

<script>
export default {
  name: 'menus',
  props: {
    routes: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      meuns: ''
    }
  },

  mounted() {
    this.meuns = this.routes
    console.log(this.meuns)
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
