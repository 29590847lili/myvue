<template>
  <div class="search-item">
    <label class="search-label" :style="`min-width:${labelWidth}px`">{{title}}：</label>
    <el-input v-model="inputValue" @input="getValue" class="w-220" maxlength="50" placeholder="请输入" clearable></el-input>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: ''
    }
  },
  props: {
    title: {
      default: ''
    },
    labelWidth: {
      default: 70
    },
    value: {
      default: ''
    }
  },
  model: {
    prop: 'value',
    event: 'getValue'
  },
  watch: {
    value: {
      handler (v) {
        this.inputValue = v
      },
      deep: true
    }
  },
  created () {
    this.inputValue = this.value
  },
  methods: {
    getValue () {
      this.$emit('getValue', this.inputValue)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
