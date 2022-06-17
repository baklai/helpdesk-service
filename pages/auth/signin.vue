<template>
  <v-container fill-height fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" align="center">
        <v-card flat color="transparent" max-width="400">
          <v-card-text>
            <v-form ref="loginForm" lazy-validation @submit.prevent="onSignin">
              <v-text-field
                outlined
                clearable
                autofocus
                type="text"
                name="login"
                :label="$t('Login')"
                prepend-inner-icon="mdi-account-circle-outline"
                color="blue darken-1"
                v-model.trim="login"
                :rules="rules.login"
                @keypress.enter="onSignin"
              />
              <v-text-field
                outlined
                clearable
                name="password"
                :label="$t('Password')"
                prepend-inner-icon="mdi-lock-outline"
                color="blue darken-1"
                :type="showeye ? 'text' : 'password'"
                :append-icon="
                  showeye ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                "
                :counter="21"
                v-model.trim="password"
                :rules="rules.password"
                @click:append="showeye = !showeye"
                @click:append-outer="onSignin"
                @keypress.enter="onSignin"
              />
            </v-form>
            <p class="text-center caption px-2">
              {{
                $t(
                  'Please enter your login and password to sign in the application'
                )
              }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<router>
{
  name: 'signin',
  meta: [
    {
      appicon: 'mdi-login-variant'
    },
    {
      apptitle: 'Signin'
    },
    {
      appsubtitle: 'Sign in web application'
    }
  ]
}
</router>

<script>
export default {
  data() {
    return {
      login: '',
      password: '',
      rules: {
        login: [(v) => !!v || this.$t('Login is required')],
        password: [
          (v) => !!v || this.$t('Password is required'),
          (v) =>
            (v && v.length >= 4 && v.length <= 21) ||
            this.$t('Password must be equal or more than 4 characters')
        ]
      },
      showeye: false
    };
  },

  methods: {
    async onSignin() {
      if (this.$refs.loginForm.validate()) {
        try {
          const user = {
            login: this.login,
            password: this.password
          };
          await this.$auth.loginWith('local', {
            data: { ...user }
          });
          this.$refs.loginForm.reset();
          this.$toast.success(this.$t('Authorization passed'));
        } catch (err) {
          this.$toast.error(this.$t(err.response.data.message));
        }
      }
    }
  }
};
</script>
