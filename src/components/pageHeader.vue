<template>
  <div class="page-header" :style="`background:${theme}`">
    <div class="left">
      <div v-if="$route.meta.ancestorTitle">{{$route.meta.ancestorTitle}}<span>/</span></div>
      <div v-if="$route.meta.parentTitle">{{$route.meta.parentTitle}}<span>/</span></div>
      <div v-if="$route.meta.title">{{$route.meta.title}}</div>
    </div>
    <div class="right">
      <ThemePicker class="m-r-20" />
      <div class="head-name">
        <div class="head-img">
          <img src="../assets/head-img.png">
        </div>
        <div class="head-text">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              张先生<i class="iconfont icon-tabxiala"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="editPassWord">修改密码</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <!-- 弹窗 -->
    <el-dialog title="修改密码" :visible.sync="dialog.one" width="500px">
      <el-form :model="formData" ref="formData" :rules="formDataRules" label-width="100px" class="demo-ruleForm">
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input v-model="formData.oldPassword" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="formData.newPassword" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPwd">
          <el-input v-model="formData.confirmPwd" maxlength="20"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.one = false">取 消</el-button>
        <el-button type="primary" @click="dialog.one = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ThemePicker from './themePicker'
import { mapGetters } from 'vuex'
export default {
  data () {
    // 密码校验
    const validatepws = (rule, value, callback) => {
      if (!value) {
        callback(new Error('原始密码不可为空'))
      } else if (value.length < 6 && !/[\u4E00-\u9FA5]/g.test(value)) {
        callback(new Error('请输入大于6位的密码'))
      } else if (/[\u4E00-\u9FA5]/g.test(value)) {
        callback(new Error('密码不能为汉字'))
      } else {
        callback()
      }
    }
    const validateNewPwd = async (rule, value, callback) => {
      if (!value) {
        callback(new Error('新密码不可为空'))
      } else if (value.length < 6 && !/[\u4E00-\u9FA5]/g.test(value)) {
        callback(new Error('请输入大于6位的密码'))
      } else if (/[\u4E00-\u9FA5]/g.test(value)) {
        callback(new Error('密码不能为汉字'))
      } else {
        callback()
      }
    }
    const validateconfirmPwd = async (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.formData.newPassword && !/[\u4E00-\u9FA5]/g.test(value)) {
        callback(new Error('两次输入不一致'))
      } else if (/[\u4E00-\u9FA5]/g.test(value)) {
        callback(new Error('密码不能为汉字'))
      } else {
        callback()
      }
    }
    return {
      formData: {
        oldPassword: '',
        newPassword: '',
        confirmPwd: ''
      },
      formDataRules: {
        oldPassword: [
          { required: true, validator: validatepws, trigger: 'blur' }
        ],
        newPassword: [
          { required: true, validator: validateNewPwd, trigger: 'blur' }
        ],
        confirmPwd: [
          { required: true, validator: validateconfirmPwd, trigger: 'blur' }
        ]
      },
      dialog: {
        one: false
      }
    }
  },
  computed: mapGetters({
    theme: 'GET_COLOUR'
  }),
  methods: {
    // 右上角操作
    handleCommand (command) {
      switch (command) {
        case 'editPassWord':
          this.dialog.one = true
          setTimeout(() => {
            this.$refs.formData.resetFields()
          }, 0)
          break
        case 'logout':
          this.logout()
          break
      }
    },
    // 退出
    logout () {
      this.$confirm('确定退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        this.$router.push('/')
        this.$store.state.menus = []
        this.$store.state.menuPaths = []
      }).catch(() => { })
    }
  },
  components: {
    ThemePicker
  }
}
</script>

<style lang="less" scoped>
.page-header {
  width: 100%;
  height: 55px;
  display: flex;
  justify-content: space-between;
  box-shadow: 3px 0 8px rgba(0, 0, 0, 0.2);
  background: #409eff;
  .left {
    display: flex;
    padding-left: 20px;
    align-items: center;
    color: #fff;
    span {
      margin: 0 10px;
      color: #fff;
    }
  }
  .right {
    padding-right: 20px;
    display: flex;
    align-items: center;
    .head-name {
      height: 55px;
      display: flex;
      align-items: center;
      .head-img {
        margin-right: 10px;
      }
      .head-text {
        cursor: pointer;
        .el-dropdown-link {
          color: #fff;
        }
        .iconfont {
          font-size: 13px;
          margin-left: 5px;
          color: #fff;
        }
      }
    }
  }
}
</style>
