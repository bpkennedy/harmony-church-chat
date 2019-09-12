<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      bordered
      class="q-pa-md bg-white text-black"
    >
      <q-toolbar>
        <q-btn
          v-go-back="'/chats'"
          flat
          dense
          class="q-mr-sm"
        >
          <q-icon name="arrow_back_ios" />
          Back
        </q-btn>
        <q-item-section
          avatar
        >
          <q-avatar>
            <img src="https://www.whatsappprofiledpimages.com/wp-content/uploads/2018/07/best-profile-pic13-300x300.jpg">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label
            lines="1"
          >
            <!-- {{ chatUserDisplayName(chat) }} -->
            JimmehBoi
          </q-item-label>
        </q-item-section>
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
    },
  }
}
</script>

<style lang="stylus">
  .safe {
    padding-top: constant(safe-area-inset-top)!important;
    padding-top: env(safe-area-inset-top)!important;
  }
</style>
