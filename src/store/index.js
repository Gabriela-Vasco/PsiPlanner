import Vue from 'vue'
import Vuex from 'vuex'
import clients from './clients'
import sessions from './sessions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    clients,
    sessions
  }
})
