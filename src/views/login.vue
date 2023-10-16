<template>
  <div class="login-bg" :style="`background:${theme}`">
    <ThemePicker class="colors-box" />
    <div class="login-box">
      <div class="head-img">
        <!-- <img src="@/assets/login-logo.png" alt=""> -->
      </div>
      <div class="content-item">
        <div class="title" :style="`color:${theme}`">
          管理系统
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" prefix-icon="iconfont icon-zhanghao" ref="username" maxlength="18" placeholder="请输入账号" />
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="loginForm.password" prefix-icon="iconfont icon-mima" type="password" ref="password" maxlength="18" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item prop="captcha">
            <el-input v-model="loginForm.captcha" prefix-icon="iconfont icon-yanzhengma" ref="captcha" maxlength="4" placeholder="请输入验证码" />
            <img @click="captcha" class="code-img" :src="codeImg">
          </el-form-item>
          <div class="login-submit"><el-button @click="postLogin" type="primary" :style="`background:${theme}`">登录</el-button></div>
        </el-form>
      </div>
    </div>
    <vue-particles color="#fff" :particleOpacity="0.7" :particlesNumber="80" shapeType="star" :particleSize="5" linesColor="#fff" :linesWidth="1" :lineLinked="false" :lineOpacity="0.4" :linesDistance="150" :moveSpeed="4" :hoverEffect="true" hoverMode="grab" :clickEffect="false" clickMode="push" class="lizi">
      <!--
      color: String类型。默认'#dedede'。粒子颜色。
      particleOpacity: Number类型。默认0.7。粒子透明度。
      particlesNumber: Number类型。默认80。粒子数量。
      shapeType: String类型。默认'circle'。可用的粒子外观类型有："circle","edge","triangle", "polygon","star"。
      particleSize: Number类型。默认80。单个粒子大小。
      linesColor: String类型。默认'#dedede'。线条颜色。
      linesWidth: Number类型。默认1。线条宽度。
      lineLinked: 布尔类型。默认true。连接线是否可用。
      lineOpacity: Number类型。默认0.4。线条透明度。
      linesDistance: Number类型。默认150。线条距离。
      moveSpeed: Number类型。默认3。粒子运动速度。
      hoverEffect: 布尔类型。默认true。是否有hover特效。
      hoverMode: String类型。默认true。可用的hover模式有: "grab", "repulse", "bubble"。
      clickEffect: 布尔类型。默认true。是否有click特效。
      clickMode: String类型。默认true。可用的click模式有: "push", "remove", "repulse", "bubble"。
     -->
    </vue-particles>
  </div>
</template>

<script>
import ThemePicker from '@/components/themePicker'
import { postLogin, captcha } from '@/axios/users'
import { loginTime } from '@/utils/index'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      aaaa: '',
      loginForm: {
        username: '',
        password: '',
        captcha: '',
        uuid: '',
        appid: 4
      },
      codeImg: null,
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: mapGetters({
    theme: 'GET_COLOUR'
  }),
  created () {
    document.onkeydown = (e) => {
      const key = window.event.keyCode
      if (key === 13 && !localStorage.getItem('Authorization')) this.postLogin()
    }
    this.captcha()
  },
  methods: {
    // 登录
    async postLogin () {
      localStorage.setItem('Authorization', 'test')
      this.$router.push('/home')

      if (this.loginForm.username === '' && this.loginForm.password === '' && this.loginForm.captcha === '') {
        this.$message.error('请先输入账号密码')
        this.$refs.username.focus()
        return
      }
      if (this.loginForm.username === '') {
        this.$message.error('请输入账号')
        this.$refs.username.focus()
        return
      }
      if (this.loginForm.password === '') {
        this.$message.error('请输入密码')
        this.$refs.password.focus()
        return
      }
      if (this.loginForm.captcha === '') {
        this.$message.error('请输入验证码')
        this.$refs.captcha.focus()
        return
      }
      const res = await postLogin(this.loginForm)
      if (res.code === 200) {
        // 跳转到第一个路由页面
        localStorage.setItem('Authorization', res.data.accessToken)
        localStorage.setItem('refreshToken', res.data.refreshToken)
        loginTime()
        this.$router.push('/home')
      } else {
        this.captcha()
      }
    },
    // 获取验证码
    async captcha () {
      const res = await captcha()
      if (res.code === 200) {
        this.codeImg = `data:image/png;base64,${res.data.img}`
        this.loginForm.uuid = res.data.uuid
      }
    }
  },
  components: {
    ThemePicker
  }
}
</script>

<style lang="less" scoped>
.login-bg {
  width: 100%;
  height: 100%;
  background: #00f;
  position: relative;
  overflow: hidden;
  .login-box {
    position: absolute;
    width: 535px;
    min-width: 535px;
    height: auto;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #ffffff;
    padding: 20px 0px;
    border-radius: 5px;
    .head-img {
      width: 80px;
      margin: 0 auto;
      img {
        width: 100%;
        height: auto;
      }
    }
    .content-item {
      width: 100%;
      height: 100%;
      float: left;
      position: relative;
      .title {
        width: 100%;
        font-size: 30px;
        color: #1665dc;
        font-weight: bold;
        text-align: center;
        position: absolute;
        top: 20px;
      }
      /deep/ .el-form {
        width: 83%;
        margin: 0 auto;
        padding-top: 80px;
        text-align: center;
        .el-form-item {
          height: 48px;
          margin-bottom: 30px;
          &:last-child {
            margin-bottom: 0;
          }
          .el-form-item__content {
            margin-left: 0 !important;
            height: 100% !important;
            .el-input {
              .el-input__inner {
                height: 48px;
                padding-left: 40px;
              }
              .el-input__prefix {
                left: 10px;
                top: 1px;
                color: #1666dc;
              }
            }
            .code-img {
              width: 110px;
              height: 46px;
              position: absolute;
              right: 1px;
              top: 1px;
              cursor: pointer;
              border-radius: 0 4px 4px 0;
            }
          }
        }
      }
      /deep/ .login-submit {
        width: 100%;
        margin: 0 auto;
        position: relative;
        .el-button {
          width: 100%;
          height: 48px;
          border-radius: 4px;
        }
        .el-button--medium {
          padding: 13px;
        }
        .link {
          position: absolute;
          right: 0;
          top: 52px;
          text-decoration: underline;
          color: #1666dc;
        }
      }
    }
  }
}
.colors-box {
  position: absolute;
  right: 20px;
  top: 20px;
}
</style>
