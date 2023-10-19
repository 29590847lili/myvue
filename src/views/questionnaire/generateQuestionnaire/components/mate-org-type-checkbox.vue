<template>
  <div class="mate-org-type-checkbox">
    <div class="title-box">
      <div class="title">
        {{code}}<span v-if="code">、</span>{{title}}
      </div>
    </div>

    <div class="main">
      <div class="input">
        <el-checkbox-group v-model="input" :disabled="rule" @change="handleOutput">
          <el-checkbox v-for="item in list" :key="item.value" :label="item.value">{{item.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
// import { getDictList } from '../../../axios/supervise.js'
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
      weight: null, // 权重
      title: '考核机构类型',
      score: null,
      input: [],
      valid: null,
      list: []
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
        if (this.value.value && this.value.value.length > 0) {
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
      this.getDictList()
      this.handleOutput()
    })
  },
  methods: {
    async getDictList () {
      // try {
      //   const res = await getDictList('orgProperty')
      //   if (res.code === 200) {
      //     this.list = res.data
      //   }
      // } catch (error) {
      //   console.log(error)
      // }
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
.mate-org-type-checkbox {
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
