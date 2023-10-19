<template>
  <div class="yy-pages-performance-question-manage-material">
    <el-tabs v-model="activeName">
      <el-tab-pane label="创建" name="1">
        <div class="question-type">
          <h2>题型</h2>
          <div class="list">
            <div class="item" v-for="item in questionTypeList" :key="item.value" draggable @dragstart="handleDragStart($event,item)" @dragend="handleDragEnd($event,item)" @drag="handleDrag($event,item)">
              {{item.label}}
            </div>
          </div>
          <p class="tips">拖动题型到右侧即可完成创建</p>
        </div>

        <div class="validate-rule">
          <h2>校验规则</h2>
          <el-form :model="validateRuleForm">
            <el-form-item label="是否必填" prop="required">
              <el-radio-group v-model="validateRuleForm.required" @change="handleSetValidate()">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="最小长度" prop="minLen">
              <el-input v-model="validateRuleForm.minLen" size="mini" placeholder="请输入最小长度" style="width: 150px;" @input="handleSetValidate()" />
            </el-form-item>
            <el-form-item label="最大长度" prop="maxLen">
              <el-input v-model="validateRuleForm.maxLen" size="mini" placeholder="请输入最大长度" style="width: 150px;" @input="handleSetValidate()" />
            </el-form-item>
            <el-form-item label="字符类型关系" prop="charTypeRelation">
              <el-radio-group v-model="validateRuleForm.charTypeRelation" @change="handleSetValidate()">
                <el-radio :label="0">and</el-radio>
                <el-radio :label="1">or</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="字符类型" prop="charType">
              <el-checkbox-group v-model="validateRuleForm.charType" size="mini" @change="handleSetValidate()">
                <el-checkbox :label="0" border>中文</el-checkbox>
                <el-checkbox :label="1" border>英文</el-checkbox>
                <el-checkbox :label="2" border>数字</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="文件类型" prop="fileType">
              <el-checkbox-group v-model="validateRuleForm.fileType" size="mini" @change="handleSetValidate()">
                <el-checkbox :label="0" border>word</el-checkbox>
                <el-checkbox :label="1" border>excel</el-checkbox>
                <el-checkbox :label="2" border>pdf</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
          <p class="tips">校验规则配置需先选中右侧题目</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="题库" name="2">
        <div class="question-list">
          <div class="item" v-for="item in questionBankList" :key="item.value" :class="{ 'disabled': item.disabled }" :draggable="item.disabled?false:true" @dragstart="handleDragStart($event,item)" @dragend="handleDragEnd($event,item)" @drag="handleDrag($event,item)">
            {{item.label}}
          </div>
          <p class="tips">拖动题型到右侧即可完成创建</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: '',
  data () {
    return {
      activeName: '1',
      questionTypeList,
      questionBankList,
      validateRuleForm
    }
  },
  computed: {
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
        if (val.length > 0) {
          this.questionBankList.forEach((item) => {
            if (val.filter((e) => e.form === item.form && e.status === 2).length > 0) {
              item.disabled = true
            } else {
              item.disabled = false
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
          this.validateRuleForm = {
            required: val.value.valid.required, // 是否必填 0是 1否
            minLen: val.value.valid.minLen, // 最小长度
            maxLen: val.value.valid.maxLen, // 最大长度
            charTypeRelation: val.value.valid.charTypeRelation, // 字符类型关系
            charType: val.value.valid.charType, // 字符类型
            fileType: val.value.valid.fileType // 文件类型
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.questionBankList.forEach((item) => {
        item.disabled = false
      })
    })
  },
  methods: {
    // 开始拖拽
    handleDragStart (event, item) {
      this.$store.state.supervise.dragStatus = 1
    },
    // 结束拖拽
    handleDragEnd (event, item) {
      this.$store.state.supervise.dragStatus = 0
    },
    // 拖拽中
    handleDrag (event, item) {
      const args = Object.assign({}, { ...item })

      args.dragId = this.$store.state.supervise.formList.length + 1

      args.status = 1 // 1拖拽中、2拖拽完成（已拖拽到目标并释放）

      args.value = null

      args.code = this.$store.state.supervise.formList.length + 1

      this.$store.state.supervise.dragStatus = 1

      this.$store.state.supervise.dragItem = args
    },
    handleSetValidate () {
      if (this.selectItem) {
        this.selectItem.value.valid = {
          required: this.validateRuleForm.required, // 是否必填 0是 1否
          minLen: this.validateRuleForm.minLen, // 最小长度
          maxLen: this.validateRuleForm.maxLen, // 最大长度
          charTypeRelation: this.validateRuleForm.charTypeRelation, // 字符类型关系
          charType: this.validateRuleForm.charType, // 字符类型
          fileType: this.validateRuleForm.fileType // 文件类型
        }
      } else {
        this.$message.warning('请在右侧选择题')
      }
    }
  }
}
const questionTypeList = [
  {
    value: 1,
    id: '10001',
    label: '单项选择',
    form: 'radio',
    type: 1
  },
  {
    value: 2,
    id: '10002',
    label: '多项选择',
    form: 'checkbox',
    type: 4
  },
  {
    value: 3,
    id: '10003',
    label: '填空类',
    form: 'input',
    type: 2
  },
  {
    value: 4,
    id: '10004',
    label: '时间',
    form: 'date-picker',
    type: 5
  },
  {
    value: 5,
    id: '10005',
    label: '下拉单选',
    form: 'select',
    type: 8
  },
  {
    value: 6,
    id: '10006',
    label: '文件类',
    form: 'upload',
    type: 6
  },
  // {
  //   value: 7,
  //   id: '10007',
  //   label: '矩阵单选',
  //   form: 'matrix-radio',
  //   type: 7
  // },
  // {
  //   value: 8,
  //   id: '10008',
  //   label: '矩阵多选',
  //   form: 'matrix-checkbox',
  //   type: 9
  // },
  {
    value: 9,
    id: '10009',
    label: '下拉多选',
    form: 'select-multiple',
    type: 3
  }
]

const questionBankList = [
  {
    value: 1,
    id: '100010',
    label: '考核机构类型',
    form: 'checkbox-org-type',
    type: 4,
    disabled: false
  },
  {
    value: 2,
    id: '100011',
    label: '考核数据时间范围',
    form: 'date-picker-range',
    type: 10,
    disabled: false
  },
  {
    value: 3,
    id: '100012',
    label: '考核人员类型',
    form: 'radio-staff-type',
    type: 1,
    disabled: false
  }
]
const validateRuleForm = {
  required: null, // 是否必填 0是 1否
  minLen: null, // 最小长度
  maxLen: null, // 最大长度
  charTypeRelation: null, // 字符类型关系
  charType: [], // 字符类型
  fileType: [] // 文件类型
}
</script>

<style lang="less" scoped>
.yy-pages-performance-question-manage-material {
  width: 250px;
  height: calc(100% - 20px);
  box-sizing: border-box;
  background-color: #fff;
  padding: 10px 10px;
  overflow-x: hidden;
  overflow-y: auto;
  &::-webkit-scrollbar-track {
    background-color: #ffffff;
  }

  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
    background-color: #ffffff;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
  }
  ::v-deep .el-tabs {
    .el-tabs__content {
      .el-tab-pane {
        .question-list {
          .item {
            border: 1px solid #ccc;
            width: 100%;
            margin-bottom: 20px;
            font-size: 12px;
            padding: 3px 10px;
            cursor: move;
            user-select: none;
            -moz-user-select: none; /*火狐*/
            -webkit-user-select: none; /*webkit浏览器*/
            -ms-user-select: none; /*IE10*/
            -khtml-user-select: none; /*早期浏览器*/
            &.disabled {
              cursor: no-drop;
              color: #999;
            }
          }
          .tips {
            font-size: 12px;
            color: #666;
          }
        }
        .question-type,
        .validate-rule {
          &.validate-rule {
            margin-top: 20px;
          }
          .tips {
            font-size: 12px;
            color: #666;
          }
          h2 {
            font-size: 15px;
            font-weight: normal;
            margin-bottom: 10px;
          }
          .list {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .item {
              border: 1px solid #ccc;
              width: calc(50% - 10px);
              margin-bottom: 20px;
              margin-right: 20px;
              text-align: center;
              font-size: 12px;
              padding: 3px 0px;
              user-select: none;
              -moz-user-select: none; /*火狐*/
              -webkit-user-select: none; /*webkit浏览器*/
              -ms-user-select: none; /*IE10*/
              -khtml-user-select: none; /*早期浏览器*/
              cursor: move;
              &:nth-child(2n) {
                margin-right: 0px;
              }
            }
          }
          .el-form {
            .el-form-item {
              &:nth-child(4),
              &:nth-child(5),
              &:nth-child(6) {
                .el-form-item__label {
                  width: 100%;
                  text-align: left;
                }
                .el-form-item__content {
                  .el-checkbox-group {
                    .el-checkbox {
                      margin-right: 0px !important;
                      padding-left: 11px;
                      padding-right: 11px;
                      .el-checkbox__input {
                        display: none;
                      }
                      .el-checkbox__label {
                        padding: 0px !important;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
