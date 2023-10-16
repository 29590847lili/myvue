<template>
  <div class="p-t-20">
    <div class="table-bg">
      <el-form :model="formData" :rules="formDataRules" ref="formData" label-width="140px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="aaaaa">
          <el-input type="text" class="w-300" v-model="formData.aaaaa" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="真实姓名" prop="bbbbb">
          <el-input type="text" class="w-300" v-model="formData.bbbbb" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="ccccc">
          <el-input type="text" class="w-300" v-model="formData.ccccc" maxlength="11"></el-input>
        </el-form-item>
        <el-form-item label="用户状态" prop="ddddd">
          <el-select v-model="formData.ddddd" class="w-300" placeholder="请选择用户状态">
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户角色" prop="eeeee">
          <el-select v-model="formData.eeeee" class="w-300" placeholder="请选择用户角色">
            <el-option label="系统管理员" value="1" />
            <el-option label="启用状态的所有角色" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="数据权限岗" prop="fffff">
          <el-select v-model="formData.fffff" class="w-300" placeholder="请选择数据权限岗">
            <el-option label="系统管理员" value="1" />
            <el-option label="启用状态的所有数据权限岗" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button @click="$router.go(-1)">取 消</el-button>
          <el-button type="primary" @click="submitFormData">
            <span v-if="$route.query.id">提交编辑</span>
            <span v-else>添加用户</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        aaaaa: '',
        bbbbb: '',
        ccccc: '',
        ddddd: '1',
        eeeee: '',
        fffff: ''
      },
      formDataRules
    }
  },
  created () {
    if (this.$route.query.id) this.$route.meta.title = '编辑用户'
    else this.$route.meta.title = '新增用户'
  },
  methods: {
    async submitFormData () {
      this.$refs.formData.validate(async (valid) => {
        if (valid) {
          console.log('提交')
        }
      })
    }
  }
}
const formDataRules = {
  aaaaa: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  bbbbb: [
    { required: true, message: '请输入真实姓名', trigger: 'blur' }
  ],
  ccccc: [
    { required: true, message: '请输入手机号', trigger: 'blur' }
  ],
  ddddd: [
    { required: true, message: '请选择用户状态', trigger: 'change' }
  ],
  eeeee: [
    { required: true, message: '请选择用户角色', trigger: 'change' }
  ],
  fffff: [
    { required: true, message: '请选择数据权限岗', trigger: 'change' }
  ]
}
</script>

<style lang="less" scoped>
.table-bg{height:90vh;padding-top:40px;}
</style>
