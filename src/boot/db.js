import Vue from 'vue'
import Firebase from 'firebase/app'
import 'firebase/firestore'

let db

const newDocRef = (collection) => {
  return db.collection(collection).doc()
}

export const getOne = async ({ id, collection }) => {
  Vue.prototype.$tp([
    { value: id, type: 'string' },
    { value: collection, type: 'string' }
  ])
  const doc = await db.collection(collection).doc(id).get()
  if (!doc.exists) {
    throw new Error(`No Resource Found in ${collection} for ${id}`)
  }
  return doc.data()
}

export const getAll = async ({ collection }) => {
  Vue.prototype.$tp([
    { value: collection, type: 'string' },
  ])
  const items = []
  const snapshot = await db.collection(collection).get()
  snapshot.forEach(doc => {
    items.push(doc.data())
  })
  return items
}

export const updateOne = async ({ id, collection, updateSet }) => {
  Vue.prototype.$tp([
    { value: id, type: 'string' },
    { value: collection, type: 'string' },
    { value: updateSet, type: 'object' }
  ])
  return db.collection(collection).doc(id).update({
    ...updateSet,
    modified_at: new Date(),
  })
}

export const updateMultiple = async (refSetArray) => {
  Vue.prototype.$tp([
    { value: refSetArray, type: 'array' },
  ])
  await db.runTransaction(t => {
    for (const refSet of refSetArray) {
      t.update(db.collection(refSet.collection).doc(refSet.id), refSet.updateSet)
    }
  })
}

export const createOne = async ({ collection, updateSet }) => {
  Vue.prototype.$tp([
    { value: collection, type: 'string' },
    { value: updateSet, type: 'object' }
  ])
  const newUid = newDocRef(db, collection)
  return db.collection(collection).set(newUid, {
    uid: newUid,
    ...updateSet,
    created_at: new Date(),
    modified_at: new Date(),
  })
}

export const createMultiple = async (refSetArray) => {
  Vue.prototype.$tp([
    { value: refSetArray, type: 'array' },
  ])
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
  db = Firebase.firestore()
}
