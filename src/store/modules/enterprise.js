import { queryEnterpriseInfo } from '@/api/enterprise'
import { Message } from 'element-ui'

const state = {
  enterpriseInfo: []
}

const mutations = {
  SET_ENTERPRISEINFO: (state, enterpriseInfo) => {
    state.enterpriseInfo = enterpriseInfo
  }
}

const actions = {
  setEnterpriseInfo({ commit }, data) {
    queryEnterpriseInfo(data).then(response => {
      if (response.data.error_msg) {
        Message({
          message: response.data.error_msg,
          type: 'error'
        })
      } else {
        console.log(response)
        commit('SET_ENTERPRISEINFO', response.data.data.enterprises)
      }
    }).catch(error => {
      console.log(error)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

