<template>
  <div class="mate-upload">
    <div class="title-box">
      <div class="weight" v-if="rule">
        <el-input v-model="weight" type="number" size="mini" placeholder="请输入权重(%)" style="width: 100%" @input="handleOutput" />
      </div>
      <div class="title" v-if="!ans">
        <el-input v-model="title" :disabled="rule" size="mini" placeholder="请输入标题" style="width: 100%" @input="handleOutput" />
      </div>
      <div class="title" v-if="ans">
        {{code}}<span v-if="code">、</span>{{title}}
      </div>
    </div>

    <div class="main">
      <div class="score" v-if="rule">
        <el-input v-model="score" type="number" size="mini" placeholder="请输入分值" style="width: 100%" @input="handleOutput" />
      </div>
      <div class="input">
        <el-input v-model="input" size="mini" readonly :disabled="rule" placeholder="请选择文件" style="width: 100%" @input="handleOutput">
          <el-upload ref="up" slot="prepend" :headers="headers" :disabled="rule" class="upload-demo" action="/api/duties-evidence/file/uploadfile" :show-file-list="false" :on-success="handleSuccess" :before-upload="beforeUpload">
            <el-button>{{input?'重新选择':'选择文件'}}</el-button>
          </el-upload>
        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    value: [String, Object, Array],
    rule: {
      type: Boolean,
      default: false
    },
    ans: {
      type: Boolean,
      default: false
    },
    code: {
      type: Number,
      default: null
    }
  },
  data () {
    return {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('Authorization')
      },
      weight: null, // 权重
      title: null,
      score: null,
      input: null,
      valid: null
    }
  },
  watch: {
    'value.valid': {
      handler (val) {
        this.valid = val
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (this.value) {
        if (this.value.valid) {
          this.valid = this.value.valid
        }
        if (this.value.value) {
          this.input = this.value.value
        }
        if (this.value.weight) {
          this.weight = this.value.weight
        }
        if (this.value.title) {
          this.title = this.value.title
        }
        if (this.value.score) {
          this.score = this.value.score
        }
      }

      this.handleOutput()
    })
  },
  methods: {
    beforeUpload (file) {
      const ext = /[^.]+$/.exec(file.name)[0]

      if (this.valid.fileType.length > 0) {
        let flag = null

        if (this.valid.fileType.includes(0)) {
          flag = 1
        }

        if (this.valid.fileType.includes(1)) {
          flag = 2
        }

        if (this.valid.fileType.includes(2)) {
          flag = 3
        }

        if (this.valid.fileType.includes(0) && this.valid.fileType.includes(1)) {
          flag = 4
        }

        if (this.valid.fileType.includes(0) && this.valid.fileType.includes(1) && this.valid.fileType.includes(2)) {
          flag = 5
        }

        if (flag === 1 && !['doc', 'docx'].includes(ext)) {
          this.$message.error('请上传doc、docx格式文件')
          return false
        }

        if (flag === 2 && !['xls', 'xlsx'].includes(ext)) {
          this.$message.error('请上传xls、xlsx格式文件')
          return false
        }

        if (flag === 3 && !['pdf'].includes(ext)) {
          this.$message.error('请上传pdf格式文件')
          return false
        }

        if (flag === 4 && !['doc', 'docx', 'xls', 'xlsx'].includes(ext)) {
          this.$message.error('请上传doc、docx、xls、xlsx格式文件')
          return false
        }

        if (flag === 5 && !['doc', 'docx', 'xls', 'xlsx', 'pdf'].includes(ext)) {
          this.$message.error('请上传doc、docx、xls、xlsx、pdf格式文件')
          return false
        }
      }
      return true
    },
    handleSuccess (res) {
      if (res.status === 'SUCCESS') {
        this.input = res.result
        this.handleOutput()
      }
    },
    handleOutput () {
      const output = {
        weight: this.weight,
        title: this.title,
        score: this.score,
        value: this.input,
        valid: this.valid
      }
      this.$emit('input', output)
      this.$emit('change', output)
    }
  }
}
</script>

<style lang="less" scoped>
.mate-upload {
  .title-box {
    display: flex;
    .weight {
      padding-right: 10px;
    }
    .title {
      flex: 1;
    }
  }
  .main {
    margin-top: 10px;
    display: flex;
    .score {
      padding-right: 10px;
    }
    .input {
      flex: 1;
    }
  }
}
</style>
