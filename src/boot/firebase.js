import Firebase from 'firebase'
import 'firebase/auth'
import { USER_AUTH_ACTION, USER_UNAUTH_ACTION, LOAD_USER_PROFILE_ACTION } from '../store'

let db = null

const newDocRef = (collection) => {
  return db.collection(collection).doc()
}

export const getOne = async ({ id, collection }) => {
  const doc = await db.collection(collection).doc(id).get()
  if (!doc.exists) {
    throw new Error(`No Resource Found in ${collection} for ${id}`)
  }
  return doc.data()
}

export const getAll = async ({ collection }) => {
  const items = []
  const snapshot = await db.collection(collection).get()
  snapshot.forEach(doc => {
    items.push(doc.data())
  })
  return items
}

export const updateOne = async ({ id, collection, updateSet }) => {
  return db.collection(collection).doc(id).update({
    ...updateSet,
    modified_at: new Date(),
  })
}

export const updateMultiple = async (refSetArray) => {
  await db.runTransaction(t => {
    for (const refSet of refSetArray) {
      t.update(db.collection(refSet.collection).doc(refSet.id), refSet.updateSet)
    }
  })
}

export const createOne = async ({ collection, updateSet }) => {
  const newUid = newDocRef(db, collection)
  return db.collection(collection).set(newUid, {
    uid: newUid,
    ...updateSet,
    created_at: new Date(),
    modified_at: new Date(),
  })
}

export const createMultiple = async (refSetArray) => {
  return db.runTransaction(async t => {
    for (const refSet of refSetArray) {
      const newUid = newDocRef(db, refSet.collection)
      await t.set(newUid, {
        uid: newUid,
        ...refSet.updateSet
      })
    }
  })
}

export default async ({ app, router, store, Vue }) => {
  Firebase.initializeApp({
    apiKey: 'AIzaSyAGkouE3Zs1V0CMUO4lkE4yyKgKHfRO3QY',
    authDomain: 'harmony-church-chat.firebaseapp.com',
    databaseURL: 'https://harmony-church-chat.firebaseio.com',
    projectId: 'harmony-church-chat',
    storageBucket: '',
    messagingSenderId: '486136128526',
    appId: '1:486136128526:web:01d8fa8f0f716f62'
  })
  db = Firebase.firestore()
  Vue.prototype.$db = db
  Vue.prototype.$auth = Firebase.auth()
  Vue.prototype.$auth.onAuthStateChanged(user => {
    if (user) {
      store.dispatch(USER_AUTH_ACTION, user)
      store.dispatch(LOAD_USER_PROFILE_ACTION)
    } else {
      store.dispatch(USER_UNAUTH_ACTION)
    }
  })
}
