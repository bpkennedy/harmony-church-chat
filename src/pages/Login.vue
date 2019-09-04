<template>
  <q-page class="flex flex-center">
    <q-form
      class="q-gutter-md"
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input
        v-model="email"
        label="Your email *"
        hint="Email address"
        type="email"
        lazy-rules
        :rules="[ val => emailRegex.test(val) || 'Please type a valid email address']"
      />

      <q-input
        v-model="password"
        type="password"
        label="Your password *"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type your password']"
      />

      <div>
        <q-btn
          label="Submit"
          type="submit"
          color="primary"
        />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
  </q-page>
</template>

<style>
</style>

<script>
function initialState() {
  return {
    email: '',
    password: '',
    emailRegex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  }
}

export default {
  name: 'PageIndex',
  data() {
    return initialState()
  },
  methods: {
    async onSubmit() {
      try {
        await this.$auth.signInWithEmailAndPassword(this.email, this.password)
        this.$router.push('/')
      } catch (error) {
        console.log(error)
        this.$q.notify({
          color: 'negative',
          icon: 'report_problem',
          message: error.message,
          position: 'top',
          multiLine: true,
          actions: null,
          buttonColor: 'white',
        })
      }
    },
    onReset() {
      Object.assign(this.$data, initialState())
    }
  }
}
</script>
