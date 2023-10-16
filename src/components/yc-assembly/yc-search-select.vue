<template>
  <div class="search-item">
    <label class="search-label" :style="`min-width:${labelWidth}px`">{{title}}：</label>
    <el-select v-model="inputValue" @input="getValue" class="w-220" placeholder="请选择">
      <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
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
    },
    option: {
      deflult: []
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
