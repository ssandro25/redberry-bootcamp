import { createStore } from 'vuex'

export default createStore({
  state: {
    authorized: localStorage.getItem('authorized') ? Boolean(localStorage.getItem('authorized')) : false,
  },

  getters: {
    getAuthorized: state => state.authorized
  },

  mutations: {
  },

  actions: {
    setAuthorized({state}, value) {
      state.authorized = value
      localStorage.setItem('authorized', value.toString())
    }
  },

  modules: {
  }
})
