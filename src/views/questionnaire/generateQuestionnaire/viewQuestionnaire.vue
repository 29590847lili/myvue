<template>
  <div class="yy-pages-supervise-appraisal-question">
    <div class="table-bg">
      <h1>{{form.examineName}}</h1>
      <el-form :model="form" ref="form" :disabled="look" :rules="rules" label-position="top">
        <template v-for="(item, index) in form.formList">
          <el-form-item :key="item.dragId" :class="{'el-form-item-custom': true }" label="" label-width="0px" :prop="`formList.${index}.value`" :rules="rules.value">
            <div class="custom-form">
              <mate-radio v-model="item.value" :code="item.code" :oper="false" ans v-if="item.form === 'radio'" />
              <mate-checkbox v-model="item.value" :code="item.code" :oper="false" ans v-if="item.form === 'checkbox'" />
              <mate-input v-model="item.value" :code="item.code" ans v-if="item.form === 'input'" />
              <mate-date-picker v-model="item.value" :code="item.code" ans v-if="item.form === 'date-picker'" />
              <mate-select v-model="item.value" :code="item.code" :oper="false" ans v-if="item.form === 'select'" />
              <mate-select-multiple v-model="item.value" :code="item.code" :oper="false" ans v-if="item.form === 'select-multiple'" />
              <mate-upload v-model="item.value" :code="item.code" ans v-if="item.form === 'upload'" />
              <mate-org-type-checkbox v-model="item.value" :code="item.code" ans v-if="item.form === 'checkbox-org-type'" />
              <mate-picker-range v-model="item.value" :code="item.code" ans v-if="item.form === 'date-picker-range'" />
              <mate-staff-type-radio v-model="item.value" :code="item.code" ans v-if="item.form === 'radio-staff-type'" />
            </div>
          </el-form-item>
        </template>
      </el-form>
      <div style="text-align:center;margin-top:20px;">
        <el-button @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" @click="handleSubmit()" v-if="!look">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// import { getRuleById, postAppraisalDetail, postAppraisalSave } from '../../../axios/supervise.js'
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
      qid: null,
      rid: null,
      look: false,
      form: {
        name: null, // 方案名称
        examineId: null, // 考核问卷
        examineName: null, // 考核问卷名称
        excellentHigh: null, // 优秀分数段 - 高
        excellentLow: null, // 优秀分数段 - 底
        goodHigh: null, // 良好分数段 - 高
        goodLow: null, // 良好分数段 - 底
        passHigh: null, // 及格分数段 - 高
        passLow: null, // 及格分数段 - 底
        startTime: null, // 问卷填写时间 - 开始
        endTime: null, // 问卷填写时间 - 结束
        preventProjectId: [], // 考核项目 - 多选
        orgType: [], // 考核单位 - 多选
        formList: []
      },
      rules: {
        value: [
          {
            validator: (rule, value, callback) => {
              const _object = value
              const _value = _object.value
              const _valid = _object.valid
              const _index = parseInt(rule.field.split('.')[1])
              const _item = this.form.formList[_index]
              const _form = _item.form

              // 单个值
              if (['radio', 'date-picker', 'select', 'upload', 'radio-staff-type'].includes(_form)) {
                if (_valid.required === 0 && !_value) {
                  callback(new Error('请作答'))
                } else {
                  callback()
                }
              }
              // 多个值
              if (['checkbox', 'select-multiple', 'checkbox-org-type', 'date-picker-range'].includes(_form)) {
                if (_valid.required === 0 && _value.length === 0) {
                  callback(new Error('请作答'))
                } else {
                  callback()
                }
              }
              // input单独处理判断
              if (['input'].includes(_form)) {
                if (_valid.required === 0 && !_value) {
                  callback(new Error('请作答'))
                } else if ((_valid.minLen && _value.length < _valid.minLen) || (_valid.maxLen && _value.length > _valid.maxLen)) {
                  callback(new Error(`最少输入${_valid.minLen}字符,最多输入${_valid.maxLen}字符`))
                } else if (_valid.minLen && _value.length < _valid.minLen) {
                  callback(new Error(`至少输入${_valid.minLen}字符`))
                } else if (_valid.maxLen && _value.length > _valid.maxLen) {
                  callback(new Error(`至少输入${_valid.maxLen}字符`))
                } else if (_valid.charTypeRelation === 0 || _valid.charTypeRelation === 1) {
                  if (_valid.charTypeRelation === 0 && _valid.charType.length > 0) {
                    let flag = null
                    if (_valid.charType.includes(0)) {
                      flag = 1
                    }

                    if (_valid.charType.includes(0) && _valid.charType.includes(1)) {
                      flag = 2
                    }

                    if (_valid.charType.includes(0) && _valid.charType.includes(1) && _valid.charType.includes(2)) {
                      flag = 3
                    }

                    if (flag === 1 && !/^[\u4e00-\u9fa5]+$/.test(_value)) {
                      callback(new Error('请输入中文'))
                    } else if (flag === 2 && !/^(?=.*[a-zA-Z].*)(?=.*[\u4e00-\u9fa5].*)([a-zA-Z\u4e00-\u9fa5])+$/.test(_value)) {
                      callback(new Error('请输入中文、英文'))
                    } else if (flag === 3 && !/^(?=.*[0-9].*)(?=.*[a-zA-Z].*)(?=.*[\u4e00-\u9fa5].*)([0-9a-zA-Z\u4e00-\u9fa5])+$/.test(_value)) {
                      callback(new Error('请输入中文、英文、数字'))
                    } else {
                      callback()
                    }
                  } else if (_valid.charTypeRelation === 1 && _valid.charType.length > 0) {
                    let flag = null
                    if (_valid.charType.includes(0)) {
                      flag = 1
                    }

                    if (_valid.charType.includes(0) && _valid.charType.includes(1)) {
                      flag = 2
                    }

                    if (_valid.charType.includes(0) && _valid.charType.includes(1) && _valid.charType.includes(2)) {
                      flag = 3
                    }

                    if (flag === 1 && !/^[\u4e00-\u9fa5]+$/.test(_value)) {
                      callback(new Error('请输入中文'))
                    } else if (flag === 2 && !/^([\u4e00-\u9fa5]|[a-zA-Z])+$/.test(_value)) {
                      callback(new Error('请输入中文或英文'))
                    } else if (flag === 3 && !/^([\u4e00-\u9fa5]|[a-zA-Z]|[0-9])+$/.test(_value)) {
                      callback(new Error('请输入中文或英文或数字'))
                    } else {
                      callback()
                    }
                  } else {
                    callback()
                  }
                } else {
                  callback()
                }
              }
            }
          }
        ]
      }
    }
  },
  mounted () {
    if (this.$route.query.qid) {
      this.qid = this.$route.query.qid
    }
    if (this.$route.query.rid) { // 编辑题
      this.rid = this.$route.query.rid
    }
    if (this.$route.query.look) { // 查看
      this.look = true
    }

    // this.look = true // 查看
    this.rid = 111 // 编辑
    this.getQuestion()
  },
  methods: {
    /* eslint-disable */
    getQuestion () {
      // 查看
      if (this.look) {
        const data = {
          id: 21, examineId: 1, examineName: "23日测评问卷", userId: 11298139,
          answer: [{
            "code": 1,
            "content": { "value": { "weight": "10", "title": "您的性别？", "value": 1, "options": [{ "value": 1, "label": "男", "score": "50" }, { "value": 2, "label": "女", "score": "50" }], "valid": { "required": 0, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10001", "label": "单项选择", "form": "radio", "type": 1, "dragId": 1, "status": 2, "code": 1, "ruleScores": [{ "no": 1, "score": 50, "weightNo": 10 }, { "no": 2, "score": 50, "weightNo": 10 }], "ruleWeights": [{ "no": 1, "weight": 10 }, { "no": 2, "weight": 10 }] },
            "name": "您的性别？",
            "questionSubmitAnswers": [{
              "answer": "1",
              "weightNo": 1
            }],
            "ruleScores": [{
              "no": 1,
              "score": 50.0,
              "weightNo": 10
            }, {
              "no": 2,
              "score": 50.0,
              "weightNo": 10
            }],
            "ruleWeights": [{
              "no": 1,
              "weight": 10.0
            }, {
              "no": 2,
              "weight": 10.0
            }],
            "type": 1
          }, {
            "code": 2,
            "content": { "value": { "weight": "20", "title": "您接触以下物质是否满一年？您接触以下物质是否满一年？您接触以下物质是否满一年？您接触以下物质是否满一年？", "value": [1, 2], "options": [{ "value": 1, "label": "柴油", "score": "100" }, { "value": 2, "label": "X线", "score": "100" }, { "value": 3, "label": "放射物质", "score": "100" }, { "value": 4, "label": "煤烟", "score": "100" }], "valid": { "required": 0, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10002", "label": "多项选择", "form": "checkbox", "type": 4, "dragId": 2, "status": 2, "code": 2, "ruleScores": [{ "no": 1, "score": 100, "weightNo": 20 }, { "no": 2, "score": 100, "weightNo": 20 }, { "no": 3, "score": 100, "weightNo": 20 }, { "no": 4, "score": 100, "weightNo": 20 }], "ruleWeights": [{ "no": 1, "weight": 20 }, { "no": 2, "weight": 20 }, { "no": 3, "weight": 20 }, { "no": 4, "weight": 20 }] },
            "name": "您接触以下物质是否满一年？您接触以下物质是否满一年？您接触以下物质是否满一年？您接触以下物质是否满一年？",
            "questionSubmitAnswers": [{
              "answer": "1",
              "weightNo": 1
            }, {
              "answer": "2",
              "weightNo": 1
            }],
            "ruleScores": [{
              "no": 1,
              "score": 100.0,
              "weightNo": 20
            }, {
              "no": 2,
              "score": 100.0,
              "weightNo": 20
            }, {
              "no": 3,
              "score": 100.0,
              "weightNo": 20
            }, {
              "no": 4,
              "score": 100.0,
              "weightNo": 20
            }],
            "ruleWeights": [{
              "no": 1,
              "weight": 20.0
            }, {
              "no": 2,
              "weight": 20.0
            }, {
              "no": 3,
              "weight": 20.0
            }, {
              "no": 4,
              "weight": 20.0
            }],
            "type": 4
          }, {
            "code": 3,
            "content": { "value": { "weight": "10", "title": "您的常住地？", "score": "50", "value": "北京市朝阳区望京花园1单元203室常住地", "valid": { "required": 0, "minLen": "10", "maxLen": "20", "charTypeRelation": 1, "charType": [0, 1, 2], "fileType": [] } }, "id": "10003", "label": "填空类", "form": "input", "type": 2, "dragId": 3, "status": 2, "code": 3, "ruleScores": [{ "no": 1, "score": 50, "weightNo": 10 }], "ruleWeights": [{ "no": 1, "weight": 10 }] },
            "name": "您的常住地？",
            "questionSubmitAnswers": [{
              "answer": "北京市朝阳区望京花园1单元203室常住地",
              "weightNo": 1
            }],
            "ruleScores": [{
              "no": 1,
              "score": 50.0,
              "weightNo": 10
            }],
            "ruleWeights": [{
              "no": 1,
              "weight": 10.0
            }],
            "type": 2
          }, {
            "code": 4,
            "content": { "value": { "weight": "10", "title": "您的出生日期？您的出生日期？您的出生日期？您的出生日期？您的出生日期？您的出生日期？您的出生日期？您的出生日期？您的出生日期？您的出生日期？", "value": "2022 - 12 - 08", "score": "50", "valid": { "required": 0, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10004", "label": "时间", "form": "date - picker", "type": 5, "dragId": 4, "status": 2, "code": 4, "ruleScores": [{ "no": 1, "score": 50, "weightNo": 10 }], "ruleWeights": [{ "no": 1, "weight": 10 }] },
            "name": "您的出生日期？您的出生日期？您的出生日期？您的出生日期？您的出生日期？您的出生日期？您的出生日期？您的出生日期？您的出生日期？您的出生日期？",
            "questionSubmitAnswers": [{
              "answer": "2022-12-08",
              "weightNo": 1
            }],
            "ruleScores": [{
              "no": 1,
              "score": 50.0,
              "weightNo": 10
            }],
            "ruleWeights": [{
              "no": 1,
              "weight": 10.0
            }],
            "type": 5
          }, {
            "code": 5,
            "content": { "value": { "weight": "10", "title": "您的民族？", "value": 1, "options": [{ "value": 1, "label": "汉族", "score": "50" }, { "value": 2, "label": "满族", "score": "50" }], "valid": { "required": 0, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10005", "label": "下拉单选", "form": "select", "type": 8, "dragId": 5, "status": 2, "code": 5, "ruleScores": [{ "no": 1, "score": 50, "weightNo": 10 }, { "no": 2, "score": 50, "weightNo": 10 }], "ruleWeights": [{ "no": 1, "weight": 10 }, { "no": 2, "weight": 10 }] },
            "name": "您的民族？",
            "questionSubmitAnswers": [{
              "answer": "1",
              "weightNo": 1
            }],
            "ruleScores": [{
              "no": 1,
              "score": 50.0,
              "weightNo": 10
            }, {
              "no": 2,
              "score": 50.0,
              "weightNo": 10
            }],
            "ruleWeights": [{
              "no": 1,
              "weight": 10.0
            }, {
              "no": 2,
              "weight": 10.0
            }],
            "type": 8
          }, {
            "code": 6,
            "content": { "value": { "weight": "10", "title": "您的自我介绍？", "score": "50", "value": "/evidence_based/upload_data / 20221223 / id.docx", "valid": { "required": 0, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [0, 1] } }, "id": "10006", "label": "文件类", "form": "upload", "type": 6, "dragId": 6, "status": 2, "code": 6, "ruleScores": [{ "no": 1, "score": 50, "weightNo": 10 }], "ruleWeights": [{ "no": 1, "weight": 10 }] },
            "name": "您的自我介绍？",
            "questionSubmitAnswers": [{
              "answer": "/evidence_based/upload_data/20221223/id.docx",
              "weightNo": 1
            }],
            "ruleScores": [{
              "no": 1,
              "score": 50.0,
              "weightNo": 10
            }],
            "ruleWeights": [{
              "no": 1,
              "weight": 10.0
            }],
            "type": 6
          }, {
            "code": 7,
            "content": { "value": { "weight": "30", "title": "您是否被确诊患有以下癌症？", "value": [1, 2], "options": [{ "value": 1, "label": "肺癌", "score": "100" }, { "value": 2, "label": "肝癌", "score": "100" }, { "value": 3, "label": "结直肠癌", "score": "100" }, { "value": 4, "label": "乳腺癌", "score": "100" }], "valid": { "required": 0, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10009", "label": "下拉多选", "form": "select - multiple", "type": 3, "dragId": 7, "status": 2, "code": 7, "ruleScores": [{ "no": 1, "score": 100, "weightNo": 30 }, { "no": 2, "score": 100, "weightNo": 30 }, { "no": 3, "score": 100, "weightNo": 30 }, { "no": 4, "score": 100, "weightNo": 30 }], "ruleWeights": [{ "no": 1, "weight": 30 }, { "no": 2, "weight": 30 }, { "no": 3, "weight": 30 }, { "no": 4, "weight": 30 }] },
            "name": "您是否被确诊患有以下癌症？",
            "questionSubmitAnswers": [{
              "answer": "1",
              "weightNo": 1
            }, {
              "answer": "2",
              "weightNo": 1
            }],
            "ruleScores": [{
              "no": 1,
              "score": 100.0,
              "weightNo": 30
            }, {
              "no": 2,
              "score": 100.0,
              "weightNo": 30
            }, {
              "no": 3,
              "score": 100.0,
              "weightNo": 30
            }, {
              "no": 4,
              "score": 100.0,
              "weightNo": 30
            }],
            "ruleWeights": [{
              "no": 1,
              "weight": 30.0
            }, {
              "no": 2,
              "weight": 30.0
            }, {
              "no": 3,
              "weight": 30.0
            }, {
              "no": 4,
              "weight": 30.0
            }],
            "type": 3
          }],
          score: 125, status: 1
        }
        this.form.examineName = data.examineName // 考核问卷名称
        if (data.answer) {
          // const questionList = JSON.parse(data.answer)
          const questionList = data.answer
          questionList.forEach((item) => {
            // this.form.formList.push({ ...JSON.parse(item.content), ruleScores: item.ruleScores, ruleWeights: item.ruleWeights })
            this.form.formList.push({ ...item.content, ruleScores: item.ruleScores, ruleWeights: item.ruleWeights })
          })
        }
      } else {
        const data = {
          id: 21,
          examineId: 31,
          examineName: "全部",
          name: "全部",
          excellentHigh: 100,
          excellentLow: 90,
          goodHigh: 89,
          goodLow: 80,
          passHigh: 60,
          passLow: 50,
          scoreConfig: [
            {
              "code": 1,
              "content": {
                "value": {
                  "weight": "10", "title": "单选", "value": null, "options": [{ "value": 1, "label": "选项1", "score": "5" }, { "value": 2, "label": "选项2", "score": "5" }],
                  "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] }
                },
                "id": "10001", "label": "单项选择", "form": "radio", "type": 1, "dragId": 1, "status": 2, "code": 1, "mark": true
              },
              "name": "单选", "ruleScores": [{ "no": 1, "score": 5.0, "weightNo": 10 }, { "no": 2, "score": 5.0, "weightNo": 10 }], "ruleWeights": [{ "no": 1, "weight": 10.0 }, { "no": 2, "weight": 10.0 }], "type": 1
            },
            {
              "code": 2, "content": { "value": { "weight": "30", "title": "多选", "value": [], "options": [{ "value": 1, "label": "选项1", "score": "10" }, { "value": 2, "label": "选项2", "score": "10" }, { "value": 3, "label": "选项3", "score": "10" }], "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10002", "label": "多项选择", "form": "checkbox", "type": 4, "dragId": 2, "status": 2, "code": 2, "mark": true },
              "name": "多选", "ruleScores": [{ "no": 1, "score": 10.0, "weightNo": 30 }, { "no": 2, "score": 10.0, "weightNo": 30 }, { "no": 3, "score": 10.0, "weightNo": 30 }], "ruleWeights": [{ "no": 1, "weight": 30.0 }, { "no": 2, "weight": 30.0 }, { "no": 3, "weight": 30.0 }], "type": 4
            },
            {
              "code": 3, "content": { "value": { "weight": "10", "title": "填空题", "score": "10", "value": null, "valid": { "required": null, "minLen": "2", "maxLen": null, "charTypeRelation": null, "charType": [2], "fileType": [] } }, "id": "10003", "label": "填空类", "form": "input", "type": 2, "dragId": 3, "status": 2, "code": 3, "mark": true },
              "name": "填空题", "ruleScores": [{ "no": 1, "score": 10.0, "weightNo": 10 }], "ruleWeights": [{ "no": 1, "weight": 10.0 }], "type": 2
            },
            {
              "code": 4, "content": { "value": { "weight": "10", "title": "日期时间", "value": null, "score": "10", "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10004", "label": "时间", "form": "date - picker", "type": 5, "dragId": 4, "status": 2, "code": 4, "mark": true },
              "name": "日期时间", "ruleScores": [{ "no": 1, "score": 10.0, "weightNo": 10 }], "ruleWeights": [{ "no": 1, "weight": 10.0 }], "type": 5
            },
            {
              "code": 5, "content": { "value": { "weight": "10", "title": "下拉单选", "value": null, "options": [{ "value": 1, "label": "选项a", "score": "5" }, { "value": 2, "label": "选项b", "score": "5" }], "valid": { "required": 0, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10005", "label": "下拉单选", "form": "select", "type": 8, "dragId": 5, "status": 2, "code": 5, "mark": true },
              "name": "下拉单选", "ruleScores": [{ "no": 1, "score": 5.0, "weightNo": 10 }, { "no": 2, "score": 5.0, "weightNo": 10 }], "ruleWeights": [{ "no": 1, "weight": 10.0 }, { "no": 2, "weight": 10.0 }], "type": 8
            },
            {
              "code": 6, "content": { "value": { "weight": "10", "title": "问卷类型word", "score": "10", "value": null, "valid": { "required": 0, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [0] } }, "id": "10006", "label": "文件类", "form": "upload", "type": 6, "dragId": 6, "status": 2, "code": 6, "mark": true },
              "name": "问卷类型word", "ruleScores": [{ "no": 1, "score": 10.0, "weightNo": 10 }], "ruleWeights": [{ "no": 1, "weight": 10.0 }], "type": 6
            }, {
              "code": 7, "content": { "value": { "weight": "10", "title": "下拉多选", "value": [], "options": [{ "value": 1, "label": "选项q", "score": "3" }, { "value": 2, "label": "选项w", "score": "3" }, { "value": 3, "label": "选项e", "score": "4" }], "valid": { "required": 0, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "10009", "label": "下拉多选", "form": "select - multiple", "type": 3, "dragId": 7, "status": 2, "code": 7, "mark": true },
              "name": "下拉多选", "ruleScores": [{ "no": 1, "score": 3.0, "weightNo": 10 }, { "no": 2, "score": 3.0, "weightNo": 10 }, { "no": 3, "score": 4.0, "weightNo": 10 }], "ruleWeights": [{ "no": 1, "weight": 10.0 }, { "no": 2, "weight": 10.0 }, { "no": 3, "weight": 10.0 }], "type": 3
            }, {
              "code": 8, "content": { "value": { "weight": "10", "title": "文件类型pdf", "score": "10", "value": null, "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [2] } }, "id": "10006", "label": "文件类", "form": "upload", "type": 6, "dragId": 8, "status": 2, "code": 8, "mark": true },
              "name": "文件类型pdf", "ruleScores": [{ "no": 1, "score": 10.0, "weightNo": 10 }], "ruleWeights": [{ "no": 1, "weight": 10.0 }], "type": 6
            }, {
              "code": 9, "content": { "value": { "weight": null, "title": "考核机构类型", "score": null, "value": [], "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "100010", "label": "考核机构类型", "form": "checkbox-org-type", "type": 4, "disabled": false, "dragId": 9, "status": 2, "code": 9, "mark": true },
              "name": "考核机构类型", "ruleScores": [{ "no": 1, "score": 0.0, "weightNo": 0 }], "ruleWeights": [{ "no": 1, "weight": 0.0 }], "type": 4
            }, {
              "code": 10, "content": { "value": { "weight": null, "title": "考核数据时间范围", "score": null, "value": [], "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "100011", "label": "考核数据时间范围", "form": "date-picker-range", "type": 10, "disabled": false, "dragId": 10, "status": 2, "code": 10, "mark": true },
              "name": "考核数据时间范围", "ruleScores": [{ "no": 1, "score": 0.0, "weightNo": 0 }], "ruleWeights": [{ "no": 1, "weight": 0.0 }], "type": 10
            }, {
              "code": 11, "content": { "value": { "weight": null, "title": "考核人员类型", "score": null, "value": [], "valid": { "required": null, "minLen": null, "maxLen": null, "charTypeRelation": null, "charType": [], "fileType": [] } }, "id": "100012", "label": "考核人员类型", "form": "radio-staff-type", "type": 1, "disabled": false, "dragId": 11, "status": 2, "code": 11, "mark": true },
              "name": "考核人员类型", "ruleScores": [{ "no": 1, "score": 0.0, "weightNo": 0 }], "ruleWeights": [{ "no": 1, "weight": 0.0 }], "type": 1
            }],
          startTime: "2023 - 10 - 01",
          endTime: "2023-11-30",
          preventProjectId: "0",
          orgType: "1",
          status: 1
        }
        // 编辑
        this.form.name = data.name // 方案名称
        this.form.examineId = data.examineId // 考核问卷
        this.form.examineName = data.examineName // 考核问卷名称
        this.form.excellentHigh = data.excellentHigh // 优秀分数段 - 高
        this.form.excellentLow = data.excellentLow // 优秀分数段 - 底
        this.form.goodHigh = data.goodHigh // 良好分数段 - 高
        this.form.goodLow = data.goodLow // 良好分数段 - 底
        this.form.passHigh = data.passHigh // 及格分数段 - 高
        this.form.passLow = data.passLow // 及格分数段 - 底
        this.form.startTime = data.startTime // 问卷填写时间 - 开始
        this.form.endTime = data.endTime // 问卷填写时间 - 结束
        this.form.preventProjectId = data.preventProjectId ? data.preventProjectId.split(',') : [] // 考核项目 - 多选
        this.form.orgType = data.orgType ? data.orgType.split(',') : [] // 考核单位 - 多选

        if (data.scoreConfig) {
          // const questionList = JSON.parse(data.scoreConfig)
          const questionList = data.scoreConfig
          questionList.forEach((item) => {
            // ...JSON.parse(item.content)
            this.form.formList.push({ ...item.content, ruleScores: item.ruleScores, ruleWeights: item.ruleWeights })
          })
        }
      }

    },
    async getQuestion1 () {
      try {
        let res = null

        if (this.look) {
          res = await postAppraisalDetail(this.qid)
        } else {
          res = await getRuleById(this.rid)
        }

        if (res.code === 200) {
          if (!this.look) {
            this.form.name = res.data.name // 方案名称
            this.form.examineId = res.data.examineId // 考核问卷
            this.form.examineName = res.data.examineName // 考核问卷名称
            this.form.excellentHigh = res.data.excellentHigh // 优秀分数段 - 高
            this.form.excellentLow = res.data.excellentLow // 优秀分数段 - 底
            this.form.goodHigh = res.data.goodHigh // 良好分数段 - 高
            this.form.goodLow = res.data.goodLow // 良好分数段 - 底
            this.form.passHigh = res.data.passHigh // 及格分数段 - 高
            this.form.passLow = res.data.passLow // 及格分数段 - 底
            this.form.startTime = res.data.startTime // 问卷填写时间 - 开始
            this.form.endTime = res.data.endTime // 问卷填写时间 - 结束
            this.form.preventProjectId = res.data.preventProjectId ? res.data.preventProjectId.split(',') : [] // 考核项目 - 多选
            this.form.orgType = res.data.orgType ? res.data.orgType.split(',') : [] // 考核单位 - 多选

            if (res.data.scoreConfig) {
              const questionList = JSON.parse(res.data.scoreConfig)
              questionList.forEach((item) => {
                this.form.formList.push({ ...JSON.parse(item.content), ruleScores: item.ruleScores, ruleWeights: item.ruleWeights })
              })
            }
          } else {
            this.form.examineName = res.data.examineName // 考核问卷名称
            if (res.data.answer) {
              const questionList = JSON.parse(res.data.answer)
              questionList.forEach((item) => {
                this.form.formList.push({ ...JSON.parse(item.content), ruleScores: item.ruleScores, ruleWeights: item.ruleWeights })
              })
            }
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    handleSubmit () {
      this.$refs.form.validate(async (valid) => {
        try {
          if (!valid) {
            return
          }

          const params = {
            examineId: this.qid,
            ruleId: this.rid,
            examineAnswerSubmitDetailParams: []
          }

          if (this.form.formList.length > 0) {
            this.form.formList.forEach((formItem) => {
              const item = {
                code: formItem.code,
                content: JSON.stringify(formItem),
                name: formItem.value.title,
                type: formItem.type,
                questionSubmitAnswers: [],
                ruleScores: formItem.ruleScores,
                ruleWeights: formItem.ruleWeights
              }

              if (['checkbox', 'select-multiple', 'checkbox-org-type', 'date-picker-range'].includes(formItem.form)) {
                if (formItem.value.value && formItem.value.value.length > 0) {
                  item.questionSubmitAnswers = formItem.value.value.map((m) => {
                    return { answer: m, weightNo: 1 }
                  })
                }
              } else {
                if (formItem.value.value) {
                  item.questionSubmitAnswers = [{ answer: formItem.value.value, weightNo: 1 }]
                }
              }

              params.examineAnswerSubmitDetailParams.push(item)
            })
          }

          const res = await postAppraisalSave(params)

          if (res.code === 200) {
            this.$message.success('保存成功')
            this.$router.go(-1)
          } else {
            this.$message.error('保存失败')
          }
        } catch (error) {
          console.log(error)
        }
      })
    }
  },
  components: {
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
.yy-pages-supervise-appraisal-question {
  .table-bg {
    padding-bottom: 20px;
    h1 {
      text-align: center;
      padding: 20px;
      font-size: 18px;
    }
    ::v-deep .el-form {
      width: 600px;
      height: calc(100vh - 250px);
      margin: 0px auto;
      padding: 0px 20px;
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
    }
  }
}
</style>
