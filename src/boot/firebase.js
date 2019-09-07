import Firebase from 'firebase'
import 'firebase/auth'

export default async ({ Vue }) => {
  Firebase.initializeApp({
    apiKey: 'AIzaSyAGkouE3Zs1V0CMUO4lkE4yyKgKHfRO3QY',
    authDomain: 'harmony-church-chat.firebaseapp.com',
    databaseURL: 'https://harmony-church-chat.firebaseio.com',
    projectId: 'harmony-church-chat',
    storageBucket: '',
    messagingSenderId: '486136128526',
    appId: '1:486136128526:web:01d8fa8f0f716f62'
  })
  Vue.prototype.$auth = Firebase.auth()
  Vue.prototype.$db = Firebase.firestore()
}
