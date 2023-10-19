<template>
  <div class="mate-picker-range">
    <div class="title-box">
      <div class="title">
        {{code}}<span v-if="code">、</span>{{title}}
      </div>
    </div>

    <div class="main">
      <div class="input">
        <el-date-picker v-model="input" :disabled="rule" type="daterange" @change="handleOutput" style="width:100%" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
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
      weight: null, // 权重
      title: '考核数据时间范围',
      score: null,
      input: [],
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

      this.handleOutput()
    })
  },
  methods: {
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
.mate-picker-range {
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
