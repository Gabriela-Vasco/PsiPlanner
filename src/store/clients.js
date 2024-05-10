const state = {
  clients: []
}

const getters = {
  getClients (state) {
    return state.clients
  }
}

const mutations = {
  setClients (state, clients) {
    state.clients = clients
  },
  addNewClient (state, client) {
    state.clients.push(client)
  }
}

const actions = {
  addNewClient ({ commit }, client) {
    commit('addNewClient', client)
  },
  setClients ({ commit }, clients) {
    commit('setClients', clients)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
