<template>
  <v-menu
    offset-y
    open-on-hover
    max-width="400"
    v-model="menu"
    v-if="$auth.hasScope('app:user-online')"
  >
    <template v-slot:activator="{ on: menu, attrs }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on: tooltip }">
          <v-btn
            icon
            class="mx-2"
            v-bind="attrs"
            v-on="{ ...tooltip, ...menu }"
          >
            <v-badge
              overlap
              color="info"
              :content="users.length"
              v-if="users.length"
            >
              <v-icon> mdi-account-multiple-outline </v-icon>
            </v-badge>
            <v-icon v-else> mdi-account-multiple-outline </v-icon>
          </v-btn>
        </template>
        <span> {{ $t('Online users') }} </span>
      </v-tooltip>
    </template>
    <v-card>
      <v-list flat dense subheader max-height="600">
        <v-subheader class="text-uppercase">
          {{ $t('Online users') }}
        </v-subheader>
        <v-list-item
          dense
          v-for="(item, index) in users"
          :key="index"
          class="pl-2 pr-6"
        >
          <v-list-item-icon class="mx-2">
            <v-icon> mdi-account-circle-outline </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> {{ item.name }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  data() {
    return {
      menu: false
    };
  },
  computed: {
    users() {
      return this.$store.state.helper.users;
    }
  }
};
</script>
