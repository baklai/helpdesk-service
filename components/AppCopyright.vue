<template>
  <v-card flat tile class="text-center" color="transparent">
    <v-card-text>
      <v-tooltip bottom v-for="item in social" :key="item.title">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            class="mx-4"
            target="_blank"
            :href="item.href"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon> {{ item.icon }} </v-icon>
          </v-btn>
        </template>
        <span> {{ item.title }} </span>
      </v-tooltip>
    </v-card-text>
    <span class="caption grey--text text--lighten-1">
      {{ copyright }}<br />
      All rights reserved.
    </span>
  </v-card>
</template>

<script>
export default {
  computed: {
    social() {
      return this.$store.state.social;
    },
    copyright() {
      return this.$store.getters.copyright;
    }
  }
};
</script>
