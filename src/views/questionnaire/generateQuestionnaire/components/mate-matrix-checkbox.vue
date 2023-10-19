<template>
  <div class="mate-matrix-checkbox">
    <el-input v-model="title" size="mini" placeholder="请输入标题" style="width: 100%" @input="handleOutput" />
    <div class="matrix-check-group">
      <div class="matrix-check-header" :style="{'width': `${(headers.length + 2) * 110}px`}">
        <div class="cell"></div>
        <div class="cell" v-for="(item, index) in headers" :key="index">
          <el-input v-model="item.input" size="mini" placeholder="请输入选项" style="width: 100px" @input="handleOutput" />
        </div>
        <div class="cell">
          <i class="mate-icon el-icon-circle-plus" style="color: #0A9F96" @click="handleAdd()"></i>
          <i class="mate-icon el-icon-remove" style="color: #F00" v-if="headers.length > 1" @click="handleRemove()"></i>
        </div>
      </div>
      <div class="matrix-check-data" :style="{'width': `${(headers.length + 2) * 110}px`}">
        <table :data="data">
          <tbody>
            <tr v-for="(item, index) in data" :key="index">
              <td>
                <el-input v-model="item.title" size="mini" placeholder="行标题" style="width: 100px" @input="handleOutput" />
              </td>
              <template v-for="(field, ind) in Object.keys(item)">
                <td :key="ind" v-if="field!=='title'">
                  <div class="check"></div>
                </td>
              </template>
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
          field: 'check1'
        },
        {
          value: 2,
          label: '选项2',
          input: null,
          field: 'check2'
        }
      ],
      data: [
        {
          title: null,
          check1: null,
          check2: null
        },
        {
          title: null,
          check1: null,
          check2: null
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
        field: `check${value}`
      })

      this.data.forEach((item) => {
        item[`check${value}`] = null
      })

      this.handleOutput()
    },
    handleRemove () {
      if (this.headers.length > 1) {
        const head = this.headers[this.headers.length - 1]
        const index = this.headers.findIndex((e) => e.value === head.value)
        this.data.forEach((item) => {
          if (Object.keys(item).includes(`check${head.value}`)) {
            delete item[`check${head.value}`]
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
.mate-matrix-checkbox {
  width: 100%;
  .matrix-check-group {
    width: 100%;
    margin-top: 15px;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 20px;
    .matrix-check-header {
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
    .matrix-check-data {
      margin-top: 15px;
      table {
        border-collapse: collapse;
        tbody {
          tr {
            td {
              width: 110px;
              padding-bottom: 10px;
              .check {
                display: block;
                width: 13px;
                height: 13px;
                border: 1px solid #999;
                margin: 0px auto;
              }
            }
          }
        }
      }
    }
  }
}
</style>
