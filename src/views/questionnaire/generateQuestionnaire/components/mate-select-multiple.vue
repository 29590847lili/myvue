<template>
  <div class="mate-select-multiple">
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

    <div class="select-group" v-if="!ans">
      <div class="select-item" v-for="(item,index) in options" :key="index" :label="item.value">
        <el-input v-model="item.score" type="number" v-if="rule" size="mini" placeholder="请输入分值" style="width: 150px" @input="handleOutput" />
        <span v-if="rule">&nbsp;&nbsp;</span>
        <el-input v-model="item.label" size="mini" :disabled="rule" placeholder="请输入选项" style="width: 150px" @input="handleOutput" />
        <template v-if="oper">
          <i class="mate-icon el-icon-circle-plus" style="color: #0A9F96" @click="handleAdd()"></i>
          <i class="mate-icon el-icon-remove" style="color: #F00" v-if="options.length > 1" @click="handleRemove(index)"></i>
        </template>
      </div>
    </div>

    <el-select v-model="input" placeholder="请选择" multiple v-if="ans" style="width: 100%" @change="handleOutput">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
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
    oper: {
      type: Boolean,
      default: true
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
      title: null,
      input: [],
      valid: null,
      options: [
        {
          value: 1,
          label: '',
          score: null
        },
        {
          value: 2,
          label: '',
          score: null
        }
      ]
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
        if (this.value.options) {
          this.options = this.value.options
        }
      }

      this.handleOutput()
    })
  },
  methods: {
    handleAdd () {
      const opts = this.options

      const value = opts[opts.length - 1].value + 1

      this.options.push({
        value: value,
        label: ''
      })

      this.handleOutput()
    },
    handleRemove (index) {
      if (this.options.length > 1) {
        this.options.splice(index, 1)
      }

      this.handleOutput()
    },
    handleOutput () {
      const output = {
        weight: this.weight,
        title: this.title,
        value: this.input,
        options: this.options,
        valid: this.valid
      }
      this.$emit('input', output)
      this.$emit('change', output)
    }
  }
}
</script>

<style lang="less" scoped>
.mate-select-multiple {
  .title-box {
    display: flex;
    .weight {
      padding-right: 10px;
    }
    .title {
      flex: 1;
    }
  }
  ::v-deep .select-group {
    display: block !important;
    margin-top: 20px;
    .select-item {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 15px;
      &:last-child {
        margin-bottom: 0px;
      }
      .mate-icon {
        font-size: 20px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
