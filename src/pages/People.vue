<template>
  <q-page>
    <q-list>
      <q-item
        v-for="person in people"
        :key="person.uid"
        v-ripple
        class="q-my-sm"
        clickable
      >
        <q-item-section
          avatar
        >
          <q-avatar
            color="primary"
            text-color="white"
          >
            <img
              :src="person.profile_pic_url"
            >
          </q-avatar>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ person.first_name + ' ' + person.last_name }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  computed: {
    people() {
      return this.$store.state.people
    }
  },
}
</script>
