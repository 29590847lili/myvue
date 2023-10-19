<template>
  <div class="mate-matrix-radio">
    <el-input v-model="title" size="mini" placeholder="请输入标题" style="width: 100%" @input="handleOutput" />
    <div class="matrix-radio-group">
      <div class="matrix-radio-header" :style="{'width': `${(headers.length + 2) * 110}px`}">
        <div class="cell"></div>
        <div class="cell" v-for="(item, index) in headers" :key="index">
          <el-input v-model="item.input" size="mini" placeholder="请输入选项" style="width: 100px" @input="handleOutput" />
        </div>
        <div class="cell">
          <i class="mate-icon el-icon-circle-plus" style="color: #0A9F96" @click="handleAdd()"></i>
          <i class="mate-icon el-icon-remove" style="color: #F00" v-if="headers.length > 1" @click="handleRemove()"></i>
        </div>
      </div>
      <div class="matrix-radio-data" :style="{'width': `${(headers.length + 2) * 110}px`}">
        <table :data="data">
          <tbody>
            <tr v-for="(item, index) in data" :key="index">
              <td>
                <el-input v-model="item.title" size="mini" placeholder="行标题" style="width: 100px" @input="handleOutput" />
              </td>
              <el-radio-group v-model="item.radio">
                <template v-for="(field, ind) in Object.keys(item)">
                  <td :key="ind" v-if="!['title', 'radio'].includes(field)">
                    <el-radio :label="headers.find(e=>e.field===field).value">&nbsp;</el-radio>
                  </td>
                </template>
              </el-radio-group>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    value: [String, Object, Array]
  },
  data () {
    return {
      title: null,
      headers: [
        {
          value: 1,
          label: '选项1',
          input: null,
          field: 'radio1'
        },
        {
          value: 2,
          label: '选项2',
          input: null,
          field: 'radio2'
        }
      ],
      data: [
        {
          title: null,
          radio: null,
          radio1: null,
          radio2: null
        },
        {
          title: null,
          radio: null,
          radio1: null,
          radio2: null
        }
      ]
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.handleOutput()
    })
  },
  methods: {
    handleAdd () {
      const head = this.headers

      const value = head[head.length - 1].value + 1

      this.headers.push({
        value: value,
        label: `选项${value}`,
        input: null,
        field: `radio${value}`
      })

      this.data.forEach((item) => {
        item[`radio${value}`] = null
      })

      this.handleOutput()
    },
    handleRemove () {
      if (this.headers.length > 1) {
        const head = this.headers[this.headers.length - 1]
        const index = this.headers.findIndex((e) => e.value === head.value)
        this.data.forEach((item) => {
          if (Object.keys(item).includes(`radio${head.value}`)) {
            delete item[`radio${head.value}`]
          }
        })
        this.headers.splice(index, 1)
      }

      this.handleOutput()
    },
    handleOutput () {
      const output = {
        title: this.title,
        headers: this.headers,
        data: this.data
      }
      this.$emit('input', output)
      this.$emit('change', output)
    }
  }
}
</script>

<style lang="less" scoped>
.mate-matrix-radio {
  width: 100%;
  .matrix-radio-group {
    width: 100%;
    margin-top: 15px;
    padding-bottom: 20px;
    overflow-x: auto;
    overflow-y: hidden;
    .matrix-radio-header {
      display: flex;
      align-items: center;
      .cell {
        display: flex;
        align-items: center;
        width: 110px;
        .mate-icon {
          font-size: 20px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
    .matrix-radio-data {
      margin-top: 15px;
      table {
        border-collapse: collapse;
        tbody {
          tr {
            td {
              width: 110px;
              padding-bottom: 10px;
              .radio {
                display: block;
                width: 13px;
                height: 13px;
                border: 1px solid #999;
                margin: 0px auto;
                border-radius: 50%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
