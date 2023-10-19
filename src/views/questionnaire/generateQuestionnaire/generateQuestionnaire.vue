<template>
  <div class="yy-pages-performance-question-manage-edit">
    <md-material />
    <div class="control">
      <div class="question-form" :class="{'drag':[1,2,5].includes(dragStatus)}" @dragleave="handlerDragLeave($event)" @dragover="handlerDragOver($event)" @drop="handlerDrop($event)">
        <el-form :model="form" ref="form" :rules="rules" label-position="top">
          <el-form-item label="" prop="name">
            <el-input v-model="form.name" maxlength="20" placeholder="请输入问卷名称" />
          </el-form-item>
          <template v-for="(item, index) in form.formList">
            <!-- :label="`${item.label}-序号${item.code}`"  -->
            <el-form-item :key="item.code" :class="{ 'current': (current && current.code === item.code) }" :prop="`formList.${index}.value`" :rules="rules.value" @click.native="handleSelect(item)">
              <div class="custom-form">
                <mate-radio v-model="item.value" v-if="item.form === 'radio'" />
                <mate-checkbox v-model="item.value" v-if="item.form === 'checkbox'" />
                <mate-input v-model="item.value" v-if="item.form === 'input'" />
                <mate-date-picker v-model="item.value" v-if="item.form === 'date-picker'" />
                <mate-select v-model="item.value" v-if="item.form === 'select'" />
                <mate-select-multiple v-model="item.value" v-if="item.form === 'select-multiple'" />
                <mate-upload v-model="item.value" v-if="item.form === 'upload'" />
                <mate-org-type-checkbox v-model="item.value" v-if="item.form === 'checkbox-org-type'" />
                <mate-picker-range v-model="item.value" v-if="item.form === 'date-picker-range'" />
                <mate-staff-type-radio v-model="item.value" v-if="item.form === 'radio-staff-type'" />
              </div>
              <div class="operation" v-if="form.id === null || !item.mark">
                <el-button type="text" @click="handleRemore(index)">删除</el-button>
              </div>
            </el-form-item>
          </template>
        </el-form>
      </div>
      <div class="footer">
        <el-button @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" @click="handleSave();">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { postCreateQuestion, getQuestionById } from '../../../axios/supervise.js'
import materialComponent from './components/material.vue'
import mateRadioComponent from './components/mate-radio.vue'
import mateCheckboxComponent from './components/mate-checkbox.vue'
import mateInputComponent from './components/mate-input.vue'
import mateDatePickerComponent from './components/mate-date-picker.vue'
import mateSelectComponent from './components/mate-select.vue'
import mateSelectMultipleComponent from './components/mate-select-multiple.vue'
import mateUploadComponent from './components/mate-upload.vue'
import mateOrgTypeCheckboxComponent from './components/mate-org-type-checkbox.vue'
import matePickerRangeComponent from './components/mate-picker-range.vue'
import mateStaffTypeRadioComponent from './components/mate-staff-type-radio.vue'
export default {
  name: '',
  data () {
    return {
      current: null,
      form: {
        id: null,
        name: null,
        details: [],
        formList: []
      },
      rules: {
        name: [{ required: true, message: '请输入问卷名称', trigger: 'blur' }],
        value: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error('请填写题目内容'))
              } else {
                const index = parseInt(rule.field.split('.')[1])
                const item = this.form.formList[index]

                if (['radio', 'checkbox', 'select', 'select-multiple'].includes(item.form)) {
                  // 带选项
                  const title = value.title
                  const options = value.options.map((e) => {
                    return e.label ? e.label : 'null'
                  })

                  if (!title || options.includes('null')) {
                    callback(new Error('请填写题目内容'))
                  } else {
                    callback()
                  }
                } else if (['input', 'date-picker', 'upload', 'checkbox-org-type', 'date-picker-range', 'radio-staff-type'].includes(item.form)) {
                  // 不带选项，只判断标题
                  const title = value.title
                  if (!title) {
                    callback(new Error('请填写题目内容'))
                  } else {
                    callback()
                  }
                } else {
                  callback()
                }
              }
            },
            trigger: ['blur', 'input', 'change']
          }
        ]
      }
    }
  },
  computed: {
    dragStatus () {
      return this.$store.state.supervise.dragStatus
    },
    dragItem () {
      return this.$store.state.supervise.dragItem
    },
    formList () {
      return this.$store.state.supervise.formList
    },
    selectItem () {
      return this.$store.state.supervise.selectItem
    }
  },
  watch: {
    formList: {
      handler (val) {
        if (val && val.length > 0) {
          this.form.formList = []
          val.forEach((item) => {
            if (!this.form.formList.find((e) => e.code === item.code)) {
              this.form.formList.push(item)
            }
          })
        }
      },
      deep: true,
      immediate: true
    },
    selectItem: {
      handler (val) {
        if (val) {
          const index = this.form.formList.findIndex((e) => e.code === val.code)
          if (index > -1) {
            this.form.formList[index].value.valid.required = val.value.valid.required
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    // 回显
    if (this.$route.query.id) {
      this.form.id = parseInt(this.$route.query.id)
      this.getQuestion()
    }
  },
  methods: {
    /* eslint-disable */
    async getQuestion () {
      const data = {
        id: 31,
        name: '全部',
        question: [{
          "code": 1,
          "content": { "value": { "weight": null, "title": "单选", "value": null, "options": [{ "value": 1, "label": "选项1", "score": null }, { "value": 2, "label": "选项2", "score": null }], "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10001", "label": "单项选择", "form": "radio", "type": 1, "dragId": 1, "status": 2, "code": 1, "mark": true },
          "name": "单选",
          "type": 1
        }, {
          "code": 2,
          "content": { "value": { "weight": null, "title": "多选", "value": [], "options": [{ "value": 1, "label": "选项1", "score": null }, { "value": 2, "label": "选项2", "score": null }, { "value": 3, "label": "选项3" }], "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10002", "label": "多项选择", "form": "checkbox", "type": 4, "dragId": 2, "status": 2, "code": 2, "mark": true },
          "name": "多选",
          "type": 4
        }, {
          "code": 3,
          "content": { "value": { "weight": null, "title": "填空题", "score": null, "value": null, "valid": { "required": null, "minLen": "2", "maxLen": null, "charTypeRelation": null, "charType": [2], "fileType": [] } }, "id": "10003", "label": "填空类", "form": "input", "type": 2, "dragId": 3, "status": 2, "code": 3, "mark": true },
          "name": "填空题",
          "type": 2
        }, {
          "code": 4,
          "content": { "value": { "weight": null, "title": "日期时间", "value": null, "score": null, "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10004", "label": "时间", "form": "date - picker", "type": 5, "dragId": 4, "status": 2, "code": 4, "mark": true },
          "name": "日期时间",
          "type": 5
        }, {
          "code": 5,
          "content": { "value": { "weight": null, "title": "下拉单选", "value": null, "options": [{ "value": 1, "label": "选项a", "score": null }, { "value": 2, "label": "选项b", "score": null }], "valid": { "required": 0, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10005", "label": "下拉单选", "form": "select", "type": 8, "dragId": 5, "status": 2, "code": 5, "mark": true },
          "name": "下拉单选",
          "type": 8
        }, {
          "code": 6,
          "content": { "value": { "weight": null, "title": "问卷类型word", "score": null, "value": null, "valid": { "required": 0, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [0] } }, "id": "10006", "label": "文件类", "form": "upload", "type": 6, "dragId": 6, "status": 2, "code": 6, "mark": true },
          "name": "问卷类型word",
          "type": 6
        }, {
          "code": 7,
          "content": { "value": { "weight": null, "title": "下拉多选", "value": [], "options": [{ "value": 1, "label": "选项q", "score": null }, { "value": 2, "label": "选项w", "score": null }, { "value": 3, "label": "选项e" }], "valid": { "required": 0, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10009", "label": "下拉多选", "form": "select - multiple", "type": 3, "dragId": 7, "status": 2, "code": 7, "mark": true },
          "name": "下拉多选",
          "type": 3
        }, {
          "code": 8,
          "content": { "value": { "weight": null, "title": "文件类型pdf", "score": null, "value": null, "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [2] } }, "id": "10006", "label": "文件类", "form": "upload", "type": 6, "dragId": 8, "status": 2, "code": 8, "mark": true },
          "name": "文件类型pdf",
          "type": 6
        }, {
          "code": 9,
          "content": { "value": { "weight": null, "title": "考核机构类型", "score": null, "value": [], "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "100010", "label": "考核机构类型", "form": "checkbox - org - type", "type": 4, "disabled": false, "dragId": 9, "status": 2, "code": 9, "mark": true },
          "name": "考核机构类型",
          "type": 4
        }, {
          "code": 10,
          "content": { "value": { "weight": null, "title": "考核数据时间范围", "score": null, "value": [], "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "100011", "label": "考核数据时间范围", "form": "date - picker - range", "type": 10, "disabled": false, "dragId": 10, "status": 2, "code": 10, "mark": true },
          "name": "考核数据时间范围",
          "type": 10
        }, {
          "code": 11,
          "content": { "value": { "weight": null, "title": "考核人员类型", "score": null, "value": null, "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "100012", "label": "考核人员类型", "form": "radio - staff - type", "type": 1, "disabled": false, "dragId": 11, "status": 2, "code": 11, "mark": true },
          "name": "考核人员类型",
          "type": 1
        }]
      }
      this.form.name = data.name
      if (data.question) {
        // 正常数据会是字符串所以下面需要转义
        // const questionList = JSON.parse(data.question)
        const questionList = data.question
        questionList.forEach((item) => {
          // this.$store.state.supervise.formList.push(JSON.parse(item.content))
          this.$store.state.supervise.formList.push(item.content)
        })
      }
    },
    // 拖拽物料离开目标
    handlerDragLeave (event) {
      event.preventDefault()
      this.$store.state.supervise.dragStatus = 3
    },
    // 拖拽物料在目标中移动
    handlerDragOver (event) {
      event.preventDefault()
      this.$store.state.supervise.dragStatus = 2
    },
    // 拖拽到目标区域并释放
    handlerDrop (event) {
      event.preventDefault()
      this.$store.state.supervise.dragStatus = 5
      this.$store.state.supervise.dragItem.status = 2
      this.dragItem.value = {}
      this.dragItem.value.valid = {
        required: null, // 是否必填 0是 1否
        minLen: null, // 最小长度
        maxLen: null, // 最大长度
        charTypeRelation: null, // 字符类型关系
        charType: [], // 字符类型
        fileType: [] // 文件类型
      }
      this.$store.state.supervise.formList.push(this.dragItem)
    },
    // 删除题
    handleRemore (index) {
      this.$store.state.supervise.formList.splice(index, 1)
      this.form.formList.splice(index, 1)
    },
    // 选择题
    handleSelect (item) {
      this.current = item
      this.$store.state.supervise.selectItem = item
    },
    // 获取参数
    handleGetParams () {
      this.form.details = []

      if (this.formList.length > 0) {
        this.formList.forEach((formItem) => {
          if (['checkbox', 'select-multiple', 'checkbox-org-type', 'date-picker-range'].includes(formItem.form)) {
            formItem.value.value = []
          } else {
            formItem.value.value = null
          }

          formItem.mark = true

          const item = {
            code: formItem.code,
            content: JSON.stringify(formItem),
            name: formItem.value.title,
            type: formItem.type
          }

          if (!this.form.details.find(e => e.code === item.code)) {
            this.form.details.push(item)
          }
        })
      }

      return this.form
    },
    // 保存题
    handleSave () {
      this.$refs.form.validate(async (valid) => {
        try {
          if (!valid) {
            return
          }

          if (this.formList.length === 0) {
            this.$message.warning('至少选择一道题')
            return
          }

          const params = this.handleGetParams()
          console.log('保存参数！')
          console.log(params)
          // const res = await postCreateQuestion(params)

          // if (res.code === 200) {
          //   this.$message.success('保存成功')
          //   this.$router.go(-1)
          // }
        } catch (error) {
          console.log(error)
        }
      })
    }
  },
  components: {
    // 左侧物料组件
    'md-material': materialComponent,
    'mate-radio': mateRadioComponent,
    'mate-checkbox': mateCheckboxComponent,
    'mate-input': mateInputComponent,
    'mate-date-picker': mateDatePickerComponent,
    'mate-select': mateSelectComponent,
    'mate-select-multiple': mateSelectMultipleComponent,
    'mate-upload': mateUploadComponent,
    'mate-org-type-checkbox': mateOrgTypeCheckboxComponent,
    'mate-picker-range': matePickerRangeComponent,
    'mate-staff-type-radio': mateStaffTypeRadioComponent
  }
}
</script>

<style lang="less" scoped>
.yy-pages-performance-question-manage-edit {
  display: flex;
  width: 100%;
  box-sizing: border-box;
  padding: 0px 20px;
  .control {
    flex: 1;
    width: 100%;
    height: calc(100% - 20px);
    box-sizing: border-box;
    margin-left: 20px;
    background-color: #fff;
    padding: 15px 20px 50px 20px;
    .question-form {
      border: 1px solid #ddd;
      width: 600px;
      height: 100%;
      margin: 0px auto;
      padding: 20px 20px 50px 20px;
      overflow-x: hidden;
      overflow-y: auto;
      &.drag {
        border-style: dashed;
        box-shadow: 0 0 4px 2px rgba(0, 0, 0, 0.1);
      }
      ::v-deep .el-form {
        width: 100%;
        .el-form-item {
          margin-bottom: 30px;
          &.current {
            border: 1px dashed #0a9f96;
            padding: 20px 20px 30px 20px;
          }
          .el-form-item__content {
            position: relative;
            display: flex;
            .custom-form {
              flex: 1;
              width: calc(100% - 50px);
              padding-right: 10px;
            }
            .operation {
              background-color: #fff;
              width: 50px;
              height: 100%;
              text-align: center;
            }
            .el-form-item__error {
              padding-top: 10px;
            }
          }
          &:first-child {
            .el-form-item__content {
              .el-input {
                input {
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
    .footer {
      width: 100%;
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>
