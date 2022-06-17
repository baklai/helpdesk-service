<template>
  <v-img
    :max-height="height"
    :max-width="width"
    :src="
      $vuetify.theme.dark ? '/img/logo-app-light.png' : '/img/logo-app-dark.png'
    "
  />
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 184
    },
    height: {
      type: Number,
      default: 184
    }
  }
};
</script>
