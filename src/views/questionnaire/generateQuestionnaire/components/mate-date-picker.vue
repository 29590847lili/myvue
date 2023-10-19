<template>
  <div class="mate-date-picker">
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
        <el-date-picker v-model="input" :disabled="rule" size="mini" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" style="width: 100%" @change="handleOutput" />
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
      weight: null,
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
    handleOutput () {
      const output = {
        weight: this.weight,
        title: this.title,
        value: this.input,
        score: this.score,
        valid: this.valid
      }
      this.$emit('input', output)
      this.$emit('change', output)
    }
  }
}
</script>

<style lang="less" scoped>
.mate-date-picker {
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
