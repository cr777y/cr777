import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import enterprise from './modules/enterprise'
import settings from './modules/settings'
import user from './modules/user'
import permission from '@/store/modules/permission'
import tagsView from '@/store/modules/tagsView'
import persistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    permission,
    tagsView,
    enterprise
  },
  getters,
  plugins: [persistedState({
    storage: window.sessionStorage,
    reducer(state) {
      return {
        // 只储存state中的assessmentData
        sidebar: state.app.sidebar,
        device: state.app.device,
        user: state.user,
        // permissionAddRoutes: state.permission.addRoutes,
        permissionRoutes: state.permission.routes
      }
    }
  })]
})

export default store
