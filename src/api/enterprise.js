import request from '@/utils/request'

export function queryEnterpriseInfo(data) {
  return request({
    method: 'post',
    url: '/api/global_service/query_all_enterprise',
    data: data,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}
export function queryEnterpriseBaseInfo(data) {
  return request({
    method: 'post',
    url: '/api/global_service/query_enterprise_base_info',
    data: data,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}
export function queryEnterprise(data) {
  return request({
    method: 'post',
    url: '/api/global_service/query_enterprise',
    data: data,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

