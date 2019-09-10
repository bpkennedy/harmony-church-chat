import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import { getOne, getAll } from './boot/db'
import { login, logout } from './boot/auth'

Vue.use(Vuex)

export const GET_PEOPLE_ACTION = 'GET_PEOPLE_ACTION'
export const USER_SIGNIN_ACTION = 'USER_SIGNIN_ACTION'
export const USER_SIGNOUT_ACTION = 'USER_SIGNOUT_ACTION'
export const USER_AUTH_ACTION = 'USER_AUTH'
export const USER_UNAUTH_ACTION = 'USER_UNAUTH'
export const LOAD_USER_PROFILE_ACTION = 'LOAD_USER_PROFILE_ACTION'

const PEOPLE_MUTATION = 'PEOPLE_MUTATION'
const USER_MUTATION = 'USER_MUTATION'
const USER_PROFILE_MUTATION = 'USER_PROFILE_MUTATION'

export default new Vuex.Store({
  state: {
    user: {},
    profile: {},
    people: [],
  },
  actions: {
    async [GET_PEOPLE_ACTION]({ state, commit }) {
      const people = await getAll({ collection: 'users' })
      commit(PEOPLE_MUTATION, people)
    },
    async [USER_SIGNIN_ACTION]({ state }, { email, password }) {
      Vue.prototype.$tp([
        { value: email, type: 'string' },
        { value: password, type: 'string' },
      ])
      await login(email, password)
      router.push('/')
    },
    async [USER_SIGNOUT_ACTION]({ state, dispatch }) {
      await logout()
      dispatch(USER_UNAUTH_ACTION)
    },
    [USER_AUTH_ACTION]({ state, commit }, user) {
      commit(USER_MUTATION, user)
    },
    [USER_UNAUTH_ACTION]({ state, commit }) {
      commit(USER_MUTATION, {})
      commit(USER_PROFILE_MUTATION, {})
      router.push('/login')
    },
    async [LOAD_USER_PROFILE_ACTION]({ state, commit }) {
      const userProfile = await getOne({ id: state.user.uid, collection: 'users' })
      commit(USER_PROFILE_MUTATION, userProfile)
    },
  },
  mutations: {
    [PEOPLE_MUTATION](state, people) {
      Vue.prototype.$tp([{ value: people, type: 'array' }])
      Vue.set(state, 'people', [...people])
    },
    [USER_MUTATION](state, user) {
      Vue.prototype.$tp([{ value: user, type: 'object' }])
      Vue.set(state, 'user', { ...user })
    },
    [USER_PROFILE_MUTATION](state, userProfile) {
      Vue.prototype.$tp([{ value: userProfile, type: 'object' }])
      Vue.set(state, 'profile', { ...userProfile })
    }
  },
  getters: {
    isLoggedIn: state => {
      return Object.entries(state.profile).length > 0
    }
  }
})
