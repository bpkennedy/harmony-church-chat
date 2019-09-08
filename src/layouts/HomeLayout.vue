<template>
  <q-layout view="lHh Lpr lFf">
    <q-header
      elevated
      class="safe"
    >
      <q-toolbar>
        <q-btn
          v-if="!profile"
          color="white"
          text-color="black"
          label="Login"
          to="/login"
        />

        <q-avatar
          v-else
          rounded
        >
          <img :src="profile.profile_pic_url">
        </q-avatar>
        <q-toolbar-title>{{ this.$route.name }}</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'HomeLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  computed: {
    profile() {
      return this.$store.state.profile
    }
  },
  methods: {
    openURL
  }
}
</script>

<style lang="stylus">
  .safe {
    padding-top: constant(safe-area-inset-top)!important;
    padding-top: env(safe-area-inset-top)!important;
  }
</style>
