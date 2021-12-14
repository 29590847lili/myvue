<template>
  <div class="main" >
    <div class="header"><Header /></div>
    <content class="main-content">
      <!-- <el-row>
        <el-col :span="4"> -->
          <nav class="main-aside">
            <Menu/>
          </nav>
        <!-- </el-col>
        <el-col :span="20"> -->
          <div class="main-right">
            <router-view/>
          </div>
        <!-- </el-col>
      </el-row> -->
    </content>
    <footer class="footer"><Footer/></footer>
  </div>
</template>

<script>
import Menu from '@/layout/Nav'
import Header from '@/layout/Header'
import Footer from '@/layout/Footer'
export default {
  name: 'all',
  props: {
    msg: String
  },
  components:{
    Menu,
    Header,
    Footer,
  },
  data () {
    return {
      //msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    // 通用模块的初始化流程：埋点、上报、用户操作
  }
}
</script>

<style lang='less' scoped>
.main{
  height: 100vh;
  width: 100vw;
  .header{
    background:rgb(191, 221, 208);
    height:60px;
  }
  .main-content{
    display: flex;
    height: calc(100vh - 120px);
  }
  .main-aside{
    background: #42b983;
    width: 220px;
    width: 220px;
    flex-shrink: 0;
    -webkit-transition: width .2s linear;
    transition: width .2s linear;
    position: relative;
  }
  .main-right{
    background: #349167;
    flex-grow: 1;
    flex-shrink: 0;
    width: calc(100vw - 220px);
    height: 100%;
    -webkit-transition: width .2s linear;
    transition: width .2s linear;
    position: relative;
  }
  .footer{
    background:rgb(191, 221, 208);
    height: 60px;
  }
}
</style>
