<template>
  <div class="p-t-20">
    <div class="table-bg">
      <el-form :model="formData" :rules="formDataRules" ref="formData" label-width="140px" class="demo-ruleForm">
        <el-form-item label="数据权限岗名称" prop="aaaaa">
          <el-input type="text" class="w-300" v-model="formData.aaaaa" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="可查看数据源" prop="bbbbb">
          <el-checkbox-group v-model="formData.bbbbb">
            <el-checkbox label="1">城癌</el-checkbox>
            <el-checkbox label="2">RCT</el-checkbox>
            <el-checkbox label="3">全周期</el-checkbox>
            <el-checkbox label="4">居民癌症防控</el-checkbox>
            <el-checkbox label="5">淮癌</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="数据范围" prop="ccccc">
          <el-transfer v-model="formData.ccccc" :data="transferData"></el-transfer>
        </el-form-item>
        <el-form-item>
          <el-button @click="$router.go(-1)">取 消</el-button>
          <el-button type="primary" @click="submitFormData">
            <span v-if="$route.query.id">提交编辑</span>
            <span v-else>创建数据权限</span>
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
        bbbbb: [],
        ccccc: []
      },
      transferData: [],
      formDataRules
    }
  },
  created () {
    if (this.$route.query.id) this.$route.meta.title = '编辑数据权限'
    else this.$route.meta.title = '创建数据权限'
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
    { required: true, message: '请输数据权限岗名称', trigger: 'blur' }
  ],
  bbbbb: [
    { required: true, message: '请选择可查看数据源', trigger: 'change' }
  ],
  ccccc: [
    { required: true, message: '请选择数据范围', trigger: 'change' }
  ]
}
</script>

<style lang="less" scoped>
.table-bg{min-height:90vh;padding-top:40px;}
</style>
