<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Harmony Church</span>
        <span class="font-weight-light">Chat</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        to="/login"
      >
        <span class="mr-2">LOGIN</span>
      </v-btn>
    </v-app-bar>

    <v-content>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data: () => ({
    //
  }),
};
</script>
