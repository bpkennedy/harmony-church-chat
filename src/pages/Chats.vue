<template>
  <q-page>
    <q-list>
      <q-item
        v-for="chat of chats"
        :key="chat.uid"
        v-ripple
        clickable
      >
        <q-item-section
          avatar
        >
          <q-avatar>
            <img :src="chatPictureUrl(chat)">
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label
            lines="1"
          >
            {{ chatUserDisplayName(chat) }}
          </q-item-label>
          <q-item-label
            caption
            lines="2"
          >
            <span class="text-weight-bold">{{ chatRecentUserName(chat) }}:</span>
            {{ chat.most_recent_message.message }}
          </q-item-label>
        </q-item-section>
        <q-item-section
          side
          top
        >
          1 min ago
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<style>
</style>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'PageIndex',
  computed: {
    ...mapState([
      'user',
      'chats'
    ]),
    ...mapGetters([
      'chatUserProfilePicUrl',
      'chatUserFullName',
      'chatUserFirstName',
    ]),
  },
  methods: {
    chatPictureUrl(chat) {
      if (chat.participants.length > 2) {
        return 'https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Profile_GroupFriend-RoundedBlack-512.png'
      } else {
        const oppositePersonUid = chat.participants.find(p => p !== this.user.uid)
        return this.chatUserProfilePicUrl(oppositePersonUid)
      }
    },
    chatRecentUserName(chat) {
      if (chat.most_recent_message.from === this.user.uid) {
        return 'You'
      } else {
        return this.chatUserFirstName(chat.most_recent_message.from)
      }
    },
    chatUserDisplayName(chat) {
      if (chat.participants.length > 2) {
        let names
        const participantsMinusCurrentUser = chat.participants.filter(p => p !== this.user.uid)
        for (const participant of participantsMinusCurrentUser) {
          names.push(this.chatUserFirstName(participant))
        }
        return names.join(', ')
      } else {
        const oppositePersonUid = chat.participants.find(p => p !== this.user.uid)
        return this.chatUserFullName(oppositePersonUid)
      }
    },
  },
}
</script>
