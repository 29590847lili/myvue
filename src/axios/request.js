import axios from 'axios'
import store from '@/store/index'
import { Loading, Notification, Message } from 'element-ui'
import { loginTime, compareTime } from '@/utils/index'
import { postTokenRefresh } from '@/axios/users'
// Message

let responseStep = 0
let loadingInstance = null
// 全局的 axios 默认值
axios.defaults.withCredentials = true
axios.defaults.timeout = 10000
axios.defaults.headers['Content-Type'] = 'application/json'

// 发送请求前
axios.interceptors.request.use(function (config) {
  responseStep = responseStep + 1
  config.url = '/api' + config.url
  config.headers.Authorization = 'Bearer ' + localStorage.getItem('Authorization')
  const orgId = localStorage.getItem('orgInfo') ? JSON.parse(localStorage.getItem('orgInfo')).orgId : ''
  config.headers.loginOrgId = orgId
  const roleId = localStorage.getItem('orgInfo') ? JSON.parse(localStorage.getItem('orgInfo')).roleId : ''
  config.headers.loginRoleId = roleId
  if (config.method === 'post' && config.data) {
    config.data.appId = store.state.appId
    config.data.appid = store.state.appId
  } else {
    if (config.url.indexOf('?') > -1) {
      config.url = config.url + '&appId=' + store.state.appId
    } else {
      config.url = config.url + '?appId=' + store.state.appId
    }
  }
  config.headers.preventProjectId = 20
  config.headers.loginOrgId = 0
  const expTime = compareTime()
  if (expTime === 2) { // Authorization 即将过期
    loginTime()
    postTokenRefreshData()
  }
  if (!config.LOAD_ING) loadingInstance = Loading.service(store.state.LoadingoOptions)
  return config
}, function (error) { // 对请求错误做些什么
  responseStep = 0
  if (loadingInstance) loadingInstance.close()
  return Promise.reject(error)
})

// 接口响应后
axios.interceptors.response.use(function (response) {
  if (response.status === 200) {
    const responseData = response.data
    const code = responseData.code
    // 判断下载文件流
    if ((`${response.headers['content-type']}`.toLowerCase() === 'application/vnd.ms-excel;charset=utf-8') || (`${response.headers['content-type']}`.toLowerCase() === 'application/zip;charset=utf-8') || (`${response.headers['content-type']}`.toLowerCase() === 'text/html;charset=UTF-8')) {
      responseStep = responseStep - 1
      if (responseStep === 0) {
        setTimeout(() => {
          if (loadingInstance) loadingInstance.close()
        }, 200)
      }
      return responseData // 请求成功 对响应数据做点什么
    }
    // code: 200 成功处理
    if (code === 200) {
      responseStep = responseStep - 1
      if (responseStep <= 0) setTimeout(() => { if (loadingInstance) loadingInstance.close() }, 300)
      return responseData // 请求成功 对响应数据做点什么
    } else {
      if (loadingInstance) loadingInstance.close()
      responseStep = 0
      Message.error(responseData.msg)
      return responseData
    }
  }
}, function (error) {
  responseStep = responseStep - 1
  if (loadingInstance) loadingInstance.close()
  // 401、403都按未登录处理
  if (error && error.response) {
    const response = error.response
    Notification({
      type: 'error',
      title: '警告',
      message: `网络链接超时，请稍后重试：（status ${response.status}）`
    })
  } else if (error && error.config) {
    Notification({
      type: 'error',
      title: '警告',
      message: '网络链接超时，请稍后重试'
    })
  }
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 换token
const postTokenRefreshData = async () => {
  const params = { refreshToken: localStorage.getItem('refreshToken') }
  const res = await postTokenRefresh(params)
  if (res.code === 200) {
    localStorage.setItem('Authorization', res.data.accessToken)
    localStorage.setItem('refreshToken', res.data.refreshToken)
  }
}
