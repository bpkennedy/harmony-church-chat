import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/app'
import 'firebase/auth'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  vuetify,
  created () {
    firebase.initializeApp({
      apiKey: "AIzaSyAGkouE3Zs1V0CMUO4lkE4yyKgKHfRO3QY",
      authDomain: "harmony-church-chat.firebaseapp.com",
      databaseURL: "https://harmony-church-chat.firebaseio.com",
      projectId: "harmony-church-chat",
      storageBucket: "",
      messagingSenderId: "486136128526",
      appId: "1:486136128526:web:01d8fa8f0f716f62"
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
}).$mount('#app')
