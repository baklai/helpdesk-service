<template>
  <v-container fill-height align="center">
    <v-row align="center" justify="center">
      <v-col cols="12" xl="10" lg="10" align="center">
        <v-timeline>
          <v-timeline-item small class="my-10">
            <template v-slot:opposite>
              <v-img width="600" src="/img/about/tpk.png"></v-img>
            </template>
            <div class="py-10">
              <h2 class="headline font-weight-light mb-4">
                <strong>
                  {{ $t('Technical support department') }}
                </strong>
              </h2>
              <v-slide-x-transition>
                <div>
                  {{ $t('about-technical-support-department') }}
                </div>
              </v-slide-x-transition>
            </div>
          </v-timeline-item>
          <v-timeline-item small class="my-10">
            <template v-slot:opposite>
              <v-img src="/img/about/sector-mpd.png"></v-img>
            </template>
            <div class="py-10">
              <h2 class="headline font-weight-light mb-4">
                <strong>
                  {{
                    $t(
                      'Sector of telecommunication systems and data transmission networks'
                    )
                  }}
                </strong>
              </h2>
              <div>
                {{ $t('about-sector-of-telecommunication-systems') }}
              </div>
            </div>
          </v-timeline-item>
          <v-timeline-item small class="my-10">
            <template v-slot:opposite>
              <v-img src="/img/about/sector-czi.png"></v-img>
            </template>
            <div class="py-10">
              <h2 class="headline font-weight-light mb-4">
                <strong>
                  {{
                    $t(
                      'Information Security and Information Systems Security Sector'
                    )
                  }}
                </strong>
              </h2>
              <div>
                {{ $t('about-information-security') }}
              </div>
            </div>
          </v-timeline-item>
          <v-timeline-item small class="my-10">
            <template v-slot:opposite>
              <v-img src="/img/about/tpk-rem.png"></v-img>
            </template>
            <div class="py-10">
              <h2 class="headline font-weight-light mb-4">
                <strong>
                  {{ $t('Service center of the department') }}
                </strong>
              </h2>
              <div>
                {{ $t('about-service-center') }}
              </div>
            </div>
          </v-timeline-item>
        </v-timeline>
        <AppCopyright />
      </v-col>
    </v-row>
  </v-container>
</template>

<router>
{
  name: 'about',
  meta: [
    {
      appicon: 'mdi-microsoft-teams'
    },
    {
      apptitle: 'About the technical support'
    },
    {
      appsubtitle: 'About of the technical support department'
    }
  ]
}
</router>

<script>
export default {
  layout({ $auth }) {
    return $auth.loggedIn ? 'apps' : 'default';
  },
  computed: {
    app() {
      return this.$store.state.app;
    }
  }
};
</script>
