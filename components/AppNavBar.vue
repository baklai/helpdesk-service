<template>
  <v-app-bar app flat clipped-right class="px-2">
    <v-btn icon small @click.stop="drawer = !drawer">
      <v-icon> mdi-chevron-{{ drawer ? 'left' : 'right' }} </v-icon>
    </v-btn>
    <v-avatar tile size="24" class="d-block text-center mx-auto ml-2 mr-2">
      <img
        :src="
          $vuetify.theme.dark
            ? '/img/logo-app-light.png'
            : '/img/logo-app-dark.png'
        "
      />
    </v-avatar>
    <v-toolbar-title>
      {{
        drawer ? $t(appName) : `${$t(appShortName)} • ${$t(apppage.apptitle)}`
      }}
    </v-toolbar-title>
    <v-spacer />
    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-on="on"
          v-bind="attrs"
          class="mx-2"
          @click="fullscreen = !fullscreen"
        >
          <v-icon>
            {{ fullscreen ? 'mdi-fullscreen-exit' : 'mdi-fullscreen' }}
          </v-icon>
        </v-btn>
      </template>
      <span> {{ $t('Full screen') }} </span>
    </v-tooltip>

    <v-tooltip bottom v-if="$config.fileHosting">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          link
          v-on="on"
          v-bind="attrs"
          class="mx-2"
          :to="$helpdesk.cloud.path"
        >
          <v-icon> {{ $helpdesk.cloud.appicon }} </v-icon>
        </v-btn>
      </template>
      <span> {{ $t($helpdesk.cloud.apptitle) }} </span>
    </v-tooltip>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          icon
          v-on="on"
          v-bind="attrs"
          class="mx-2"
          @click.prevent="$store.commit('toggleDarkMode')"
        >
          <v-icon> mdi-theme-light-dark </v-icon>
        </v-btn>
      </template>
      <span> {{ $t('Theme toggle') }} </span>
    </v-tooltip>
    <AppNotification />
    <AppUsersOnline />
    <AppMainMenuBtn />
  </v-app-bar>
</template>

<script>
export default {
  data() {
    return {
      fullscreen: false
    };
  },

  computed: {
    appName() {
      return this.$store.state.app.name;
    },

    appShortName() {
      return this.$store.state.app.short_name;
    },

    apppage() {
      return this.$store.getters.apppage;
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
    fullscreen(value) {
      if (value) {
        this.onFullScreen();
      } else {
        this.offFullScreen();
      }
    }
  },

  mounted() {
    window.addEventListener('fullscreenchange', (event) => {
      this.fullscreen = document.fullscreenElement !== null;
    });
  },

  methods: {
    onFullScreen() {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    },

    offFullScreen() {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  }
};
</script>

<style>
.v-btn::before {
  background-color: transparent !important;
}
</style>
