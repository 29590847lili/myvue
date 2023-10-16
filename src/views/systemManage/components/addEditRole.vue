<template>
  <div class="p-t-20">
    <div class="table-bg">
      <el-form :model="formData" :rules="formDataRules" ref="formData" label-width="140px" class="demo-ruleForm">
        <el-form-item label="角色名" prop="aaaaa">
          <el-input type="text" class="w-300" v-model="formData.aaaaa" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="角色状态" prop="bbbbb">
          <el-select v-model="formData.bbbbb" class="w-300" placeholder="请选择用户状态">
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="角色备注">
          <el-input v-model="formData.ccccc"  class="w-400" type="textarea" :rows="4" placeholder="请输入角色备注" maxlength="100" />
        </el-form-item>
        <el-form-item>
          <el-button @click="$router.go(-1)">取 消</el-button>
          <el-button type="primary" @click="submitFormData">
            <span v-if="$route.query.id">提交编辑</span>
            <span v-else>添加角色</span>
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
        bbbbb: '1',
        ccccc: ''
      },
      formDataRules
    }
  },
  created () {
    if (this.$route.query.id) this.$route.meta.title = '编辑角色'
    else this.$route.meta.title = '新增角色'
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
    { required: true, message: '请输入角色名', trigger: 'blur' }
  ],
  bbbbb: [
    { required: true, message: '请选择角色状态', trigger: 'change' }
  ]
}
</script>

<style lang="less" scoped>
.table-bg{height:90vh;padding-top:40px;}
</style>
