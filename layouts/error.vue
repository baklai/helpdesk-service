<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" align="center">
        <v-img contain :src="image" height="280" width="400" />
        <h1 class="text-center">
          {{ text }}
        </h1>
        <v-btn rounded outlined class="mt-5" to="/">
          {{ $t('TAKE ME BACK HOME') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: null
    }
  },

  layout({ $auth }) {
    return $auth.loggedIn ? 'apps' : 'default';
  },

  head() {
    return {
      title: this.text
    };
  },

  computed: {
    image() {
      if (this.error.statusCode === 403) {
        return this.$vuetify.theme.dark
          ? '/img/403-light.png'
          : '/img/403-dark.png';
      } else if (this.error.statusCode === 404) {
        return this.$vuetify.theme.dark
          ? '/img/404-light.png'
          : '/img/404-dark.png';
      } else {
        return this.$vuetify.theme.dark
          ? '/img/500-light.png'
          : '/img/500-dark.png';
      }
    },

    text() {
      if (this.error.statusCode === 403) {
        return this.$t('oops-access-to-the-requested-resource-is-denied');
      } else if (this.error.statusCode === 404) {
        return this.$t('oops-that-page-can-t-be-found');
      } else {
        return this.$t('oops-internal-server-error');
      }
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
