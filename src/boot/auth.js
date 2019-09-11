import Firebase from 'firebase/app'
import 'firebase/auth'
import {
  USER_AUTH_ACTION,
  USER_UNAUTH_ACTION,
  LOAD_USER_PROFILE_ACTION,
  GET_PEOPLE_ACTION,
  LOAD_CHATS_ACTION
} from '../store'
import { genericError } from '../util'

let Auth
let initialStartup = true

export const getCurrentUser = () => {
  return Auth.currentUser
}

export const login = async (email, password) => {
  try {
    await Auth.signInWithEmailAndPassword(email, password)
  } catch (error) {
    genericError(error.message)
  }
}

export const logout = async () => {
  try {
    await Auth.signOut()
  } catch (error) {
    genericError(error.message)
  }
}

export default async ({ store }) => {
  Auth = Firebase.auth()
  Auth.onAuthStateChanged(user => {
    if (user) {
      store.dispatch(USER_AUTH_ACTION, user)
      store.dispatch(LOAD_USER_PROFILE_ACTION)
      store.dispatch(GET_PEOPLE_ACTION)
      store.dispatch(LOAD_CHATS_ACTION)
    } else {
      if (initialStartup) {
        initialStartup = false
      } else {
        store.dispatch(USER_UNAUTH_ACTION)
      }
    }
  })
}
