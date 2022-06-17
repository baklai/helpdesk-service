<template>
  <v-navigation-drawer
    app
    right
    clipped
    permanent
    v-if="drawer"
    v-model="drawer"
    width="360"
  >
    <template v-slot:prepend>
      <v-card tile flat>
        <v-list-item two-line>
          <v-list-item-avatar tile>
            <v-icon large> mdi-access-point-network </v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title> {{ $t('ONMAP Scanner') }} </v-list-item-title>
            <v-list-item-subtitle>
              {{ $t('Online network scanner') }}
            </v-list-item-subtitle>
          </v-list-item-content>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs" @click="close">
                <v-icon> mdi-close </v-icon>
              </v-btn>
            </template>
            <span> {{ $t('Close') }} </span>
          </v-tooltip>
        </v-list-item>
      </v-card>
    </template>

    <v-row>
      <v-col cols="12">
        <v-card flat class="mx-auto">
          <v-card-text>
            <v-form
              ref="form"
              lazy-validation
              @submit.prevent="onScan"
              class="pa-2"
            >
              <v-text-field
                clearable
                persistent-hint
                v-model.trim="title"
                type="text"
                :label="$t('Scan title')"
                :hint="$t('Scan report title')"
                prepend-icon="mdi-format-title"
              />
              <br />
              <v-combobox
                chips
                multiple
                clearable
                small-chips
                deletable-chips
                persistent-hint
                disable-lookup
                v-model="range"
                :delimiters="[' ', ';', ',']"
                prepend-icon="mdi-ip-network-outline"
                append-icon=""
                :label="$t('Scan targets')"
                :hint="`${$t(
                  'Examples'
                )}: example.com (Host), 127.0.0.1 (Single), 10.0.10.5-20 (Range), 10.0.2.0/24 (CIDR)`"
              />
              <br />
              <v-combobox
                chips
                multiple
                clearable
                small-chips
                deletable-chips
                persistent-hint
                disable-lookup
                v-model="flags"
                :delimiters="[' ', ';', ',']"
                prepend-icon="mdi-console"
                append-icon=""
                :label="$t('Scan command')"
                :hint="$t('Default command: nmap -P4')"
              />
              <br />
              <v-switch
                dense
                inset
                persistent-hint
                v-model="availability"
                :hint="`${
                  availability
                    ? $t('The scan report is available to everyone')
                    : $t('The scan report is only available to me')
                }`"
                :label="`${
                  availability
                    ? $t('Public scan report')
                    : $t('Private scan report')
                }`"
                class="ml-8"
              />
              <br />
              <br />
              <v-btn block outlined :loading="loading" @click="onScan">
                {{ $t('Run scan') }}
              </v-btn>
              <br />
              <v-select
                return-object
                persistent-hint
                :items="profiles"
                v-model="profile"
                :hint="
                  profile
                    ? `${profile.title} (nmap ${profile.flags.join(' ')})`
                    : $t('Select scan profile')
                "
                item-text="title"
                item-value="flags"
                @change="flags = profile.flags"
                :label="$t('Default scan profiles')"
                prepend-icon="mdi-format-list-text"
              >
              </v-select>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      loading: false,
      title: null,
      range: [],
      flags: [],
      availability: false,
      profile: null,
      targetRules: [
        (v) => !!v || this.$t('Field is required'),
        (v) =>
          this.hostname.test(v) ||
          this.IPv4.test(v) ||
          this.IPv4Range.test(v) ||
          this.IPv4CIDR.test(v) ||
          `${$t(
            'Examples'
          )}: example.com (Host), 127.0.0.1 (Single), 10.0.10.5-20 (Range), 10.0.2.0/24 (CIDR)`
      ]
    };
  },

  watch: {
    drawer(val) {
      val || this.close();
    }
  },

  computed: {
    profiles() {
      return [
        {
          title: this.$t('Intense scan'),
          flags: ['-T4', '-A', '-v']
        },
        {
          title: this.$t('Intense scan plus UDP'),
          flags: ['-sS', '-sU', '-T4', '-A', '-v']
        },
        {
          title: this.$t('Intense scan all TCP ports'),
          flags: ['-p 1-65535', '-T4', '-A', '-v']
        },
        {
          title: this.$t('Intense scan no ping'),
          flags: ['-T4', '-A', '-v', '-Pn']
        },
        {
          title: this.$t('Ping scan'),
          flags: ['-sn']
        },
        {
          title: this.$t('Quick scan'),
          flags: ['-T4', '-F']
        },
        {
          title: this.$t('Quick scan plus'),
          flags: ['-sV', '-T4', '-O', '-F', '--version-light']
        },
        {
          title: this.$t('Quick traceroute'),
          flags: ['-sn', '--traceroute']
        },
        {
          title: this.$t('Slow comprehensive scan'),
          flags: [
            '-sS',
            '-sU',
            '-T4',
            '-A',
            '-v',
            '-PE',
            '-PP',
            '-PS80,443',
            '-PA3389',
            '-PU40125',
            '-PY',
            '-g 53',
            '--script "default or (discovery and safe)"'
          ]
        }
      ];
    },

    hostname() {
      return this.$store.state.regex.hostname;
    },
    IPv4() {
      return this.$store.state.regex.IPv4;
    },
    IPv4Range() {
      return this.$store.state.regex.IPv4Range;
    },
    IPv4CIDR() {
      return this.$store.state.regex.IPv4CIDR;
    }
  },

  methods: {
    onItem() {
      try {
        this.drawer = !this.drawer;
      } catch (err) {
        this.close();
      }
    },

    async onScan() {
      if (this.$refs.form.validate()) {
        try {
          this.$toast.success(this.$t('Scan target run'));
          this.loading = true;
          await this.$store.dispatch('api/onmap/createOne', {
            title: this.title,
            range: this.range,
            flags: this.flags,
            userID: !this.availability ? this.$auth.user.id : null
          });
          this.loading = false;
          this.$toast.success(this.$t('Scan target end'));
        } catch (err) {
          this.loading = false;
          this.$toast.error(this.$t('Scan target error'));
        }
      } else {
        this.$toast.info(this.$t('This functionality is not yet available'));
      }
    },

    close() {
      this.drawer = false;
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    }
  }
};
</script>
