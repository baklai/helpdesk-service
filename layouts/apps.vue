<template>
  <v-app>
    <AppDrawer />
    <AppNavBar />
    <v-main
      :style="
        !$auth.hasScope('app:selected-html') ? disabledSelectedFromHTML : ''
      "
    >
      <nuxt v-if="!$store.state.isMaintenance" />
      <AppMaintenance v-else />
    </v-main>
    <AppScrollTop />
  </v-app>
</template>

<script>
export default {
  head() {
    return {
      title: this.apppage.apptitle
    };
  },

  data() {
    return {
      disabledSelectedFromHTML: {
        '-webkit-user-select': 'none',
        '-moz-user-select': 'none',
        '-ms-user-select': 'none',
        '-o-user-select': 'none',
        'user-select': 'none'
      }
    };
  },

  computed: {
    apppage() {
      return this.$store.getters.apppage;
    },
    error() {
      return this.$store.getters.error;
    }
  },

  watch: {
    error(value) {
      this.$toast.error(value.response.data.message);
    }
  },

  mounted() {
    this.$helpdesk.socket.emit(
      'userJoined',
      { ...this.$auth.user, room: 'helpdesk' },
      (data) => {
        if (typeof data === 'string') {
          console.error(data);
        } else {
          this.$store.commit('helper/setUser', data);
        }
      }
    );
  },

  methods: {
    // onMessage() {
    //   this.$helpdesk.socket.emit(
    //     'createMessage',
    //     {
    //       text: 'new message',
    //       id: this.$auth.user.id
    //     },
    //     (data) => {
    //       if (typeof data === 'string') {
    //         console.error(data);
    //       } else {
    //         console.log(data);
    //       }
    //     }
    //   );
    // }
  }
};
</script>
