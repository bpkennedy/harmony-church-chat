import Vue from 'vue'
import Vuex from 'vuex'
import { Notify } from 'quasar'
import router from './router.js'
import { getOne } from './boot/firebase'

Vue.use(Vuex)

export const USER_SIGNIN_ACTION = 'USER_SIGNIN_ACTION'
export const USER_AUTH_ACTION = 'USER_AUTH'
export const USER_UNAUTH_ACTION = 'USER_UNAUTH'
export const LOAD_USER_PROFILE_ACTION = 'LOAD_USER_PROFILE_ACTION'

const USER_MUTATION = 'USER_MUTATION'
const USER_PROFILE_MUTATION = 'USER_PROFILE_MUTATION'

export default new Vuex.Store({
  state: {
    user: null,
    profile: null,
  },
  actions: {
    async [USER_SIGNIN_ACTION]({ state }, { email, password }) {
      Vue.prototype.$tp([
        { value: email, type: 'string' },
        { value: password, type: 'string' },
      ])
      try {
        await Vue.prototype.$auth.signInWithEmailAndPassword(email, password)
        router.push('/')
      } catch (error) {
        Notify.create({
          color: 'negative',
          icon: 'report_problem',
          message: error.message,
          position: 'top',
          multiLine: true,
          actions: null,
          buttonColor: 'white',
        })
      }
    },
    [USER_AUTH_ACTION]({ state, commit }, user) {
      commit(USER_MUTATION, user)
    },
    [USER_UNAUTH_ACTION]({ state, commit }) {
      commit(USER_MUTATION, null)
      commit(USER_PROFILE_MUTATION, null)
    },
    async [LOAD_USER_PROFILE_ACTION]({ state, commit }) {
      const userProfile = await getOne({ id: state.user.uid, collection: 'users' })
      commit(USER_PROFILE_MUTATION, userProfile)
    },
  },
  mutations: {
    [USER_MUTATION](state, user) {
      Vue.prototype.$tp([{ value: user, type: 'object|null' }])
      Vue.set(state, 'user', user)
    },
    [USER_PROFILE_MUTATION](state, userProfile) {
      Vue.prototype.$tp([{ value: userProfile, type: 'object|null' }])
      Vue.set(state, 'profile', userProfile)
    }
  }
})
