<template>
  <v-navigation-drawer
    :app="app"
    floating
    touchless
    mini-variant
    v-model="drawer"
    :permanent="drawer"
    :absolute="absolute"
    :color="$auth.loggedIn ? '' : 'transparent'"
    class="pt-3"
  >
    <template v-slot:prepend>
      <router-link :to="$helpdesk.home.path">
        <v-avatar tile size="24" class="d-block text-center mx-auto mb-4">
          <img
            :src="
              $vuetify.theme.dark
                ? '/img/logo-app-light.png'
                : '/img/logo-app-dark.png'
            "
          />
        </v-avatar>
      </router-link>
    </template>
    <v-list flat>
      <v-list-item link :to="$helpdesk.home.path" class="mb-2">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-icon> {{ $helpdesk.home.appicon }} </v-icon>
            </v-list-item-icon>
          </template>
          <span> {{ $t($helpdesk.home.apptitle) }} </span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t($helpdesk.home.apptitle) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item link :to="$helpdesk.about.path" class="my-2">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-icon> {{ $helpdesk.about.appicon }} </v-icon>
            </v-list-item-icon>
          </template>
          <span> {{ $t($helpdesk.about.apptitle) }} </span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t($helpdesk.about.apptitle) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
        :to="$helpdesk.cloud.path"
        v-if="$config.fileHosting"
        class="my-2"
      >
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-icon> {{ $helpdesk.cloud.appicon }} </v-icon>
            </v-list-item-icon>
          </template>
          <span> {{ $t($helpdesk.cloud.apptitle) }} </span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t($helpdesk.cloud.apptitle) }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        link
        class="my-2"
        v-if="$auth.loggedIn"
        @click="drawer = !drawer"
      >
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-icon v-bind="attrs" v-on="on">
              <v-icon> mdi-swap-horizontal </v-icon>
            </v-list-item-icon>
          </template>
          <span> {{ $t('Hide/Show') }} </span>
        </v-tooltip>
        <v-list-item-content>
          <v-list-item-title> {{ $t('Hide/Show') }} </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-spacer />
    <template v-slot:append>
      <v-list flat dense>
        <v-list-item
          link
          class="mb-2 d-none d-lg-block"
          target="_blank"
          v-for="item in social"
          :key="item.title"
          :href="item.href"
        >
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon> {{ item.icon }} </v-icon>
              </v-list-item-icon>
            </template>
            <span> {{ item.title }} </span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title> {{ item.title }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-expand-transition>
        <v-list dense flat v-if="toggle">
          <v-list-item
            link
            class="my-2"
            v-for="locale in locales"
            :key="locale.code"
            @click.prevent.stop="toggleLang(locale.code)"
          >
            <v-tooltip right>
              <template v-slot:activator="{ on, attrs }">
                <v-list-item-title v-bind="attrs" v-on="on" class="text-center">
                  {{ locale.code.toUpperCase() }}
                </v-list-item-title>
              </template>
              <span> {{ locale.name }} </span>
            </v-tooltip>
          </v-list-item>
        </v-list>
      </v-expand-transition>
      <v-list flat dense class="py-0">
        <v-list-item link class="my-2" @click.prevent="toggle = !toggle">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon> mdi-translate </v-icon>
              </v-list-item-icon>
            </template>
            <span> {{ $t('Translations') }} </span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title> {{ $t('Translations') }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          class="my-2"
          @click.prevent="$store.commit('toggleDarkMode')"
        >
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon> mdi-theme-light-dark </v-icon>
              </v-list-item-icon>
            </template>
            <span> {{ $t('Theme toggle') }} </span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title> {{ $t('Theme toggle') }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mx-4" />
        <v-list-item link :to="$helpdesk.signin.path" v-if="!$auth.loggedIn">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon> {{ $helpdesk.signin.appicon }} </v-icon>
              </v-list-item-icon>
            </template>
            <span> {{ $t($helpdesk.signin.apptitle) }} </span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title>
              {{ $t($helpdesk.signin.apptitle) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link v-if="$auth.loggedIn" @click="Logout">
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-list-item-icon v-bind="attrs" v-on="on">
                <v-icon> mdi-logout-variant </v-icon>
              </v-list-item-icon>
            </template>
            <span> {{ $t('Signout') }} </span>
          </v-tooltip>
          <v-list-item-content>
            <v-list-item-title> {{ $t('Signout') }} </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    app: {
      type: Boolean,
      default: true
    },
    absolute: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      toggle: false
    };
  },

  computed: {
    social() {
      return this.$store.state.social;
    },

    locales() {
      return this.$i18n.locales.filter(
        (locale) => locale.code !== this.$i18n.locale
      );
    },

    drawer: {
      get() {
        return this.$store.state.sidebar;
      },
      set(val) {
        this.$store.commit('sidebar', val);
      }
    }
  },

  watch: {
    drawer(value) {
      return value;
    }
  },

  methods: {
    async toggleLang(code) {
      this.toggle = false;
      await this.$i18n.setLocale(code);
    },

    async Logout() {
      this.$toast.success(this.$t('Logout successfully completed'));
      await this.$auth.logout('local');
    }
  }
};
</script>
