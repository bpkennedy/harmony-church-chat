import Firebase from 'firebase/app'
import 'firebase/auth'
import { Notify } from 'quasar'
import { USER_AUTH_ACTION, USER_UNAUTH_ACTION, LOAD_USER_PROFILE_ACTION } from '../store'

let Auth

export const getCurrentUser = () => {
  return Auth.currentUser
}

export const login = async (email, password) => {
  try {
    await Auth.signInWithEmailAndPassword(email, password)
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
}

export const logout = async () => {
  try {
    await Auth.signOut()
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
}

export default async ({ store }) => {
  Auth = Firebase.auth()
  Auth.onAuthStateChanged(user => {
    if (user) {
      store.dispatch(USER_AUTH_ACTION, user)
      store.dispatch(LOAD_USER_PROFILE_ACTION)
    } else {
      store.dispatch(USER_UNAUTH_ACTION)
    }
  })
}
