import request from '@/shared/httpRequest'
export function login(params) {
  return request({
    url: '/api/login',
    method: 'post',
    data: params,
  })
}

export function exit(params) {
  return request({
    url: '/api/exit',
    method: 'post',
    data: params,
  })
}