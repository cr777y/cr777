import request from '@/utils/request'

/*
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}*/
export function login(data) {
  return request({
    method: 'post',
    url: '/api/global_service/platform_user_login',
    data: data,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout(data) {
  return request({
    url: 'api/global_service/platform_user_logout',
    method: 'post',
    data: data
  })
}
