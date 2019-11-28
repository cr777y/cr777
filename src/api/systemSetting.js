import request from '@/utils/request'

export function queryDatabase() {
  return request({
    method: 'post',
    url: '/api/global_service/platform_admin_list_enterprise_db',
    data: {},
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function queryTicketList(data) {
  return request({
    method: 'post',
    url: '/api/global_service/query_ticket_list',
    data: data,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function queryTicket(data) {
  return request({
    method: 'post',
    url: '/api/global_service/query_ticket',
    data: data,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function queryMessageList(data) {
  return request({
    method: 'post',
    url: '/api/global_service/query_system_message_list',
    data: data,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}

export function queryMessage(data) {
  return request({
    method: 'post',
    url: '/api/global_service/query_system_message ',
    data: data,
    headers: {
      'Content-type': 'application/x-www-form-urlencoded'
    }
  })
}
