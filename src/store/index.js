import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    location: [],
    Current_User:{
    }
  },
  mutations: {
    updateData(state, data) {
      state.location = data
    },
    updateUser(state, data) {
      state.Current_User = data
    },
  },
  actions: {

  },
  getters: {
  },
})