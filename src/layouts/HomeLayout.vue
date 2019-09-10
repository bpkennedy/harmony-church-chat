<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      class="safe"
    >
      <q-toolbar>
        <q-btn
          v-if="this.$route.name !== 'Login' && !isLoggedIn"
          color="white"
          text-color="black"
          label="Login"
          to="/login"
        />

        <q-avatar
          v-if="isLoggedIn"
          rounded
          aria-label="User Avatar"
          @click="showProfileOptions"
        >
          <img :src="profile.profile_pic_url">
        </q-avatar>
        <q-toolbar-title
          v-if="isLoggedIn || this.$route.name === 'Login'"
        >
          {{ this.$route.name }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer
      v-if="isLoggedIn"
    >
      <q-tabs>
        <q-route-tab
          icon="chat"
          to="/chats"
          exact
          replace
          aria-label="Chat Navigation"
        >
          Chats
        </q-route-tab>
        <q-route-tab
          icon="people"
          to="/people"
          exact
          replace
          aria-label="People Navigation"
        >
          People
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { openURL } from 'quasar'
import { USER_SIGNOUT_ACTION } from '../store'

export default {
  name: 'HomeLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    ...mapState([
      'profile'
    ]),
    ...mapGetters([
      'isLoggedIn',
    ])
  },
  methods: {
    openURL,
    showProfileOptions() {
      this.$q.bottomSheet({
        message: 'Account Options',
        grid: false,
        actions: [
          {
            label: 'Logout',
            icon: 'fas fa-sign-out-alt',
            id: 'logout'
          },
        ]
      }).onOk(action => {
        if (action.id === 'logout') {
          this.$store.dispatch(USER_SIGNOUT_ACTION)
        }
      })
    }
  }
}
</script>

<style lang="stylus">
  .safe {
    padding-top: constant(safe-area-inset-top)!important;
    padding-top: env(safe-area-inset-top)!important;
  }
</style>
