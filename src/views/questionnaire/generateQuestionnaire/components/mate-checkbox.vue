<template>
  <div class="mate-checkbox">
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

    <div class="check-group-container">
      <el-checkbox-group v-model="input" @change="handleOutput">
        <el-checkbox v-for="(item, index) in options" :key="index" :label="item.value" :disabled="rule">
          <el-input v-model="item.score" type="number" v-if="rule" size="mini" placeholder="请输入分值" style="width: 150px" @input="handleOutput" />
          <span v-if="rule">&nbsp;&nbsp;</span>
          <el-input v-model="item.label" v-if="!ans" :disabled="rule" size="mini" placeholder="请输入选项" style="width: 150px" @input="handleOutput" />
          <p v-if="ans">{{item.label}}</p>
          <template v-if="oper">
            <i class="mate-icon el-icon-circle-plus" style="color: #0A9F96" @click.stop="handleAdd()"></i>
            <i class="mate-icon el-icon-remove" style="color: #F00" v-if="options.length > 1" @click.stop="handleRemove(index)"></i>
          </template>
        </el-checkbox>
      </el-checkbox-group>
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
.mate-checkbox {
  .title-box {
    display: flex;
    .weight {
      padding-right: 10px;
    }
    .title {
      flex: 1;
    }
  }
  .check-group-container {
    ::v-deep .el-checkbox-group {
      display: block;
      width: 100%;
      .el-checkbox {
        display: flex;
        align-items: center;
        margin-top: 10px;
        .el-checkbox__label {
          display: flex;
          align-items: center;
          .mate-icon {
            font-size: 20px;
            margin-left: 10px;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
