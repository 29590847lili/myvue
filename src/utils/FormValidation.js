import axios from 'axios'
// 验证冷冻盒编号
export function validatorBoxCode (rule, value, callback) {
  if (!value || value === '') {
    return callback(new Error('请填写冷冻盒编号'))
  } else {
    callback()
    axios.post('/prevent-admin/check/hos-biological-sample-info/boxCode', { boxCode: value }, { LOAD_ING: true }).then(res => {

    })
  }
}
