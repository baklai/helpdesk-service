<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" align="center">
        <v-card flat tile class="mx-auto text-center">
          <v-card-title class="text-uppercase">
            <v-spacer /> {{ app.name }} <v-spacer />
          </v-card-title>
          <v-card-subtitle>
            <p class="text-center">
              {{ $t(app.description) }}
            </p>
          </v-card-subtitle>
          <v-card-text>
            <p class="text-h6">
              {{ $t('Service is undergoing scheduled maintenance') }}
            </p>
            <v-btn color="primary" class="my-2" @click="refresh">
              {{ $t('RELOAD PAGE') }}
            </v-btn>
            <p>{{ $t('Sorry for the inconvenience') }}</p>
            <v-tooltip bottom v-for="item in social" :key="item.title">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  class="mx-4"
                  :href="item.href"
                  target="_blank"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon size="24px">
                    {{ item.icon }}
                  </v-icon>
                </v-btn>
              </template>
              <span> {{ item.title }} </span>
            </v-tooltip>
            <p class="my-1 caption grey--text text--lighten-1">
              {{ copyright }}<br />
              All rights reserved.
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    app() {
      return this.$store.state.app;
    },

    social() {
      return this.$store.state.social;
    },

    copyright() {
      return this.$store.getters.copyright;
    }
  },
  methods: {
    refresh() {
      location.reload();
    }
  }
};
</script>
