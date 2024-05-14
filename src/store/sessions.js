const state = {
  sessions: []
}

const getters = {
  getSessions (state) {
    return state.sessions
  }
}

const mutations = {
  setSessions (state, sessions) {
    state.sessions = sessions
  },
  addNewSession (state, session) {
    state.sessions.push(session)
  }
}

const actions = {
  addNewSession ({ commit }, session) {
    commit('addNewSession', session)
  },
  setSessions ({ commit }, sessions) {
    commit('setSessions', sessions)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
