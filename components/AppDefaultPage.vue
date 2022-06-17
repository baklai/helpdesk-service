<template>
  <v-container align="center">
    <AppLogoImg />
    <v-card flat tile class="text-center" color="transparent">
      <v-card-title>
        <v-spacer />
        <h2 class="text-uppercase" style="letter-spacing: 0.15em">
          {{ app.name }}
        </h2>
        <v-spacer />
      </v-card-title>
      <v-card-subtitle>
        <h4 class="text--secondary ma-6">
          {{ $t(app.description) }}
        </h4>
      </v-card-subtitle>
      <v-card-text>
        <AppCopyright />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    app() {
      return this.$store.state.app;
    }
  }
};
</script>
