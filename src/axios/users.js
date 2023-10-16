import axios from 'axios'
const Auth = '/auth'

// 登录
export const postLogin = params => { return axios.post(`${Auth}/token/login`, params) }
// 验证码
export const captcha = () => { return axios.get(`${Auth}/captcha/login`, { LOAD_ING: true }) }
// 换区token
export const postTokenChange = params => { return axios.post(`${Auth}/token/change`, params) }
// 根据refreshToken重新获取Authorization
export const postTokenRefresh = params => { return axios.post(`${Auth}/token/refresh`, params) }
