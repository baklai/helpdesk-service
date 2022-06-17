<template>
  <v-dialog
    eager
    persistent
    scrollable
    v-model="dialog"
    max-width="600"
    overlay-color="#525252"
  >
    <v-card>
      <v-card-title class="pt-0">
        <v-list flat>
          <v-list-item two-line class="pa-0">
            <v-list-item-avatar tile>
              <v-icon x-large> mdi-account-circle-outline </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ title }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ status }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-spacer />
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-on="on" v-bind="attrs" @click="close">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </template>
          <span> {{ $t('Close') }} </span>
        </v-tooltip>
      </v-card-title>
      <v-card-text>
        <v-form ref="form" lazy-validation @submit.prevent="save()">
          <v-row>
            <v-col cols="12">
              <v-card flat class="my-2">
                <v-card-text>
                  <v-text-field
                    clearable
                    type="text"
                    :label="$t('User login')"
                    :rules="rules.require"
                    v-model.trim="user.login"
                    prepend-icon="mdi-account-outline"
                  />

                  <v-text-field
                    clearable
                    type="email"
                    :label="$t('User email')"
                    v-model.trim="user.email"
                    prepend-icon="mdi-email-outline"
                  />

                  <v-text-field
                    clearable
                    type="text"
                    :label="$t('User name')"
                    :rules="rules.require"
                    v-model.trim="user.name"
                    prepend-icon="mdi-account-circle-outline"
                  />

                  <v-text-field
                    clearable
                    :label="$t('User password')"
                    prepend-icon="mdi-lock-outline"
                    :type="showeye ? 'text' : 'password'"
                    :rules="!IDItem ? rules.password : []"
                    v-model.trim="user.password"
                    :counter="21"
                    :append-icon="
                      showeye ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                    "
                    @click:append="showeye = !showeye"
                  />

                  <v-switch
                    flat
                    inset
                    dense
                    color="success"
                    :label="$t('Activated account')"
                    v-model="user.isActive"
                  />
                  <v-switch
                    flat
                    inset
                    dense
                    color="success"
                    :label="$t('Admin account')"
                    v-model="user.isAdmin"
                  />
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-card class="mx-auto" flat>
                <v-card-title>
                  <v-icon left>
                    {{
                      user.scope.length
                        ? 'mdi-account-lock-open-outline'
                        : 'mdi-account-lock-outline'
                    }}
                  </v-icon>
                  {{ $t('Scope list') }}
                  <span class="mx-2">
                    ( {{ user.scope.length }} / {{ scopes.length }} )
                  </span>
                  <v-spacer />

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-on="on"
                        v-bind="attrs"
                        class="mx-2"
                        @click="user.scope = []"
                      >
                        <v-icon> mdi-checkbox-multiple-blank-outline </v-icon>
                      </v-btn>
                    </template>
                    <span> {{ $t('Clear all scopes') }} </span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-on="on"
                        v-bind="attrs"
                        @click="user.scope = scopes.map((v) => v.scope)"
                      >
                        <v-icon> mdi-checkbox-multiple-marked-outline </v-icon>
                      </v-btn>
                    </template>
                    <span> {{ $t('Select all scopes') }} </span>
                  </v-tooltip>
                </v-card-title>
                <v-divider />
                <v-card-text>
                  <v-virtual-scroll
                    :items="scopes"
                    item-height="48"
                    height="280"
                  >
                    <template v-slot:default="{ item }">
                      <v-subheader v-if="!item.scope">
                        <v-spacer />
                        {{ item.comment.toUpperCase() }}
                      </v-subheader>
                      <v-checkbox
                        dense
                        persistent-hint
                        v-model="user.scope"
                        :label="item.comment"
                        :hint="`Score key: ${item.scope}`"
                        :value="item.scope"
                        class="px-2"
                        v-else
                      />
                    </template>
                  </v-virtual-scroll>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn text @click="close"> {{ $t('Cancel') }} </v-btn>
        <v-btn text @click="save"> {{ $t('Save') }} </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      showeye: false,
      dialog: false,
      status: false,
      IDItem: null,

      user: {
        name: null,
        email: null,
        login: null,
        password: null,
        isActive: false,
        isAdmin: false,
        scope: []
      },

      rules: {
        require: [(v) => !!v || this.$t('Field is required')],
        email: [
          (v) => !!v || this.$t('Field is required'),
          (v) =>
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            this.$t('E-mail must be valid')
        ],
        password: [
          (v) => !!v || this.$t('Field is required'),
          (v) =>
            (v && v.length >= 4 && v.length <= 21) ||
            this.$t('Password must be equal or more than 4 characters')
        ]
      }
    };
  },

  watch: {
    IDItem: {
      handler: function (value) {
        this.status = value
          ? this.$t('Edit current record')
          : this.$t('Create new record');
      },
      deep: true
    }
  },

  computed: {
    title() {
      return this.$t('User accounts');
    },
    scopes() {
      return this.$store.getters['scope/scopes'];
    }
  },

  methods: {
    async onItem(id) {
      this.onClean();
      this.IDItem = id;
      try {
        this.status = this.IDItem
          ? this.$t('Edit current record')
          : this.$t('Create new record');
        if (this.IDItem) {
          const data = await this.$store.dispatch(
            'api/user/findOne',
            this.IDItem
          );
          this.user = { ...data };
        }
        this.dialog = true;
      } catch (err) {
        colsole.error(err);
        this.$toast.error(err.message);
        this.close();
      }
    },

    async save() {
      if (this.$refs.form.validate()) {
        try {
          if (this.IDItem) {
            await this.$store.dispatch('api/user/updateOne', {
              id: this.IDItem,
              data: {
                ...this.user
              }
            });
            this.$toast.success(this.$t('Record is updated'));
          } else {
            await this.$store.dispatch('api/user/createOne', {
              ...this.user
            });
            this.$toast.success(this.$t('Record is created'));
          }
          this.close();
        } catch (err) {
          colsole.error(err);
          this.$toast.error(err.message);
        }
      } else {
        this.$toast.error(this.$t('Fill in all required fields'));
      }
    },

    close() {
      this.IDItem = null;
      this.dialog = false;
      this.onClean();
      this.$emit('closeEvent');
    },

    onClean: function () {
      this.$refs.form.reset();
      this.$refs.form.resetValidation();
    }
  }
};
</script>
