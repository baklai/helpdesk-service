<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" xl="4" lg="6" md="5" sm="8" xs="8" align="center">
        <AppDefaultPage />
      </v-col>
    </v-row>
  </v-container>
</template>

<router>
{
  name: 'home',
  meta: [
    {
      appicon: 'mdi-home-outline'
    },
    {
      apptitle: 'Technical support'
    },
    {
      appsubtitle: 'Helpdesk of the technical support department'
    }
  ]
}
</router>

<script>
export default {
  layout({ $auth }) {
    return $auth.loggedIn ? 'apps' : 'default';
  },
  methods: {
    onItem() {
      this.$refs.table.onItem(null);
    }
  }
};
</script>
