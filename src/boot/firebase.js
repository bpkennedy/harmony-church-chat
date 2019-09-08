import Firebase from 'firebase/app'

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
}
