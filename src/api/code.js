import request from '@/utils/request'

export function queryCodeInfo(datas) {
  return request({
    method: 'post',
    url: '/api/global_service/query_code_produce_batch_list',
    data: datas,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}
