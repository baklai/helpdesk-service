<template>
  <v-container
    full-height
    class="py-8"
    v-if="$auth.hasScope('statistic:onmap')"
  >
    <v-row class="fill-height"> </v-row>
  </v-container>
</template>

<router>
{
  meta: [
    {
      appicon: 'mdi-chart-bar-stacked'
    },
    {
      apptitle: 'Service statistics'
    },
    {
      appsubtitle: 'Online nmap service of the technical support department'
    }
  ]
}
</router>

<script>
export default {
  async asyncData({ store }) {
    const statistic = await store.dispatch('api/statistic/onmap');

    return {
      ...statistic
    };
  },

  data() {
    return {};
  },

  computed: {
    apppage() {
      return this.$store.getters.apppage;
    }
  }
};
</script>
