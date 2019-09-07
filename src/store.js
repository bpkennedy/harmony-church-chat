import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// export const SET_WALL_ACTION = 'SET_WALL_ACTION'
// export const SET_WALL_MUTATION = 'SET_WALL_MUTATION'

export default new Vuex.Store({
  state: {
    // wall: true,
  },
  actions: {
    // [SET_WALL_ACTION]({ state, commit }, status) {
    //   commit(SET_WALL_MUTATION, status)
    // }
  },
  mutations: {
    // [SET_WALL_MUTATION](state, status) {
    //   Vue.set(state, 'wall', status)
    // }
  }
})
