<template>
  <v-dialog
    scrollable
    v-if="report"
    v-model="dialog"
    width="70%"
    overlay-color="#525252"
  >
    <v-card>
      <v-card-title class="py-0">
        <v-list flat>
          <v-list-item two-line>
            <v-list-item-avatar tile>
              <v-icon large> mdi-monitor-dashboard </v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t('Scan report') }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t('Target report') }}: {{ report.target }}
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                {{ $t('Report date') }}: {{ report.updated | dateToStr }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-spacer />

        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on" class="mr-2">
              <v-icon> mdi-dots-vertical </v-icon>
            </v-btn>
          </template>
          <v-list flat dense subheader>
            <HostDefActions :host="report.target" />
            <v-divider />
            <v-list-item @click="saveReport">
              <v-list-item-icon class="mr-1">
                <v-icon small> mdi-content-save-outline </v-icon>
              </v-list-item-icon>
              <v-list-item-title> {{ $t('Create report') }} </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-on="on" v-bind="attrs" @click="close">
              <v-icon> mdi-close </v-icon>
            </v-btn>
          </template>
          <span> {{ $t('Close') }} </span>
        </v-tooltip>
      </v-card-title>

      <v-card-text id="report" class="my-4">
        <v-row no-gutters align="center" justify="center">
          <v-col cols="12" v-if="report.item">
            <v-container>
              <h1>
                {{ $t('Scan report') }} - {{ $t('Scanned at') }}
                {{ report.item.startstr | dateToStr }}
              </h1>
            </v-container>
          </v-col>

          <v-col cols="12" v-if="report.host">
            <v-container>
              <ul id="menu">
                <li>
                  <a href="#scansummary" style="color: #42a5f5">
                    {{ $t('Scan summary') }}
                  </a>
                </li>
                <li v-for="(item, index) in report.host" :key="`host${index}`">
                  &ensp;
                  <a
                    :href="item.address[0].item.addr | hrefAddr"
                    :class="item.status[0].item.state"
                  >
                    {{ item | titleAddr }}
                  </a>
                </li>
              </ul>
            </v-container>
          </v-col>

          <v-col cols="12" v-if="report.item">
            <v-container>
              <h2 id="scansummary">{{ $t('Scan summary') }}</h2>
              <p>
                Nmap {{ report.item.version }} was initiated at
                {{ report.item.startstr }} with these arguments:
                <br />
                <i>
                  {{ report.item.args }}
                </i>
                <br />
              </p>
              <p>
                {{ $t('Verbosity') }}:
                {{ report.verbose ? report.verbose[0].item.level : '-' }}
                ; {{ $t('Debug level') }}
                {{ report.debugging ? report.debugging[0].item.level : '-' }}
              </p>
              <p v-if="report.runstats">
                {{ report.runstats[0].finished[0].item.summary }}
              </p>
            </v-container>
          </v-col>

          <v-col cols="12" v-if="report.host">
            <v-container>
              <div
                v-for="(item, index) in report.host"
                :key="`hostdiv${index}`"
                :id="item.address[0].item.addr | idAddr"
              >
                <h2
                  v-if="item.status[0].item.state === 'up'"
                  :class="item.status[0].item.state"
                >
                  {{ item | titleAddr }}
                </h2>
                <h2 v-else :class="item.status[0].item.state">
                  {{ item | titleAddr }}
                  <a
                    @click.prevent="hidden = !hidden"
                    style="
                      background-color: transparent !important;
                      color: #42a5f5;
                    "
                  >
                    <span>
                      <small> ({{ $t('click to expand') }}) </small>
                    </span>
                  </a>
                </h2>
                <div
                  :id="`hostblock_${item.address[0].item.addr}`"
                  :class="
                    item.status[0].item.state === 'up' ? 'unhidden' : 'hidden'
                  "
                >
                  <!-- address -->
                  <div v-if="item.address">
                    <h3>{{ $t('Address') }}</h3>
                    <ul>
                      <li
                        v-for="(item, index) in item.address"
                        :key="`address${index}`"
                        style="display: block"
                      >
                        {{ item.item.addr }} -
                        {{ item.item['vendor'] ? item.item.vendor : '' }}
                        ({{ item.item.addrtype }})
                      </li>
                    </ul>
                  </div>

                  <!-- hostnames -->
                  <div v-if="item.hostnames">
                    <div v-if="item.hostnames[0].hostname">
                      <div v-if="item.hostnames[0].hostname[0].item.name != ''">
                        <h3>{{ $t('Hostnames') }}</h3>
                        <ul>
                          <li
                            v-for="(item, index) in item.hostnames[0].hostname"
                            :key="`hostnames${index}`"
                          >
                            {{ item.item.name }}
                            ({{ item.item.type }})
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <!-- os -->
                  <div v-if="item.os">
                    <div v-if="item.os[0].osmatch">
                      <h3 v-if="item.os[0].osmatch.length">
                        {{ $t('Remote Operating System Detection') }}
                      </h3>
                      <p v-else>
                        {{ $t('Unable to identify operating system') }}.
                      </p>
                      <ul>
                        <li
                          v-for="(item, index) in item.os[0].portused"
                          :key="`portused${index}`"
                        >
                          {{ $t('Used port') }}:
                          <b>
                            {{ item.item.portid }} / {{ item.item.proto }}
                          </b>
                          ( <b> {{ item.item.state }} </b> )
                        </li>
                        <li
                          v-for="(item, index) in item.os[0].osmatch"
                          :key="`osmatch${index}`"
                        >
                          {{ $t('OS Match') }}: <b> {{ item.item.name }} </b> (
                          <b> {{ item.item.accuracy }} % </b> )
                        </li>
                      </ul>

                      <!-- osfingerprint -->
                      <div v-if="item.os[0].osfingerprint">
                        <ul>
                          <li>
                            {{
                              $t(
                                'OS identified but the fingerprint was requested at scan time'
                              )
                            }}.
                            <a
                              @click.prevent="hidden = !hidden"
                              style="
                                background-color: transparent !important;
                                color: #42a5f5;
                              "
                            >
                              <span>
                                <small> ({{ $t('click to expand') }})</small>
                              </span>
                            </a>
                          </li>
                        </ul>
                        <div :class="hidden ? '' : 'hidden'">
                          <ul v-if="!item.os[0].osmatch.length">
                            <li>
                              {{
                                $t('Cannot determine exact operating system')
                              }}. {{ $t('Fingerprint provided below') }}.
                            </li>
                            <li>
                              If you know what OS is running on it, see
                              https://nmap.org/submit/
                            </li>
                          </ul>
                          <table v-else cellspacing="1">
                            <tr class="head">
                              <td>{{ $t('Operating System fingerprint') }}</td>
                            </tr>
                            <tr>
                              <td>
                                <pre
                                  v-for="(item, index) in item.os[0]
                                    .osfingerprint"
                                  :key="`osfingerprint${index}`"
                                >
                                  {{ item.item.fingerprint }}
                                </pre>
                              </td>
                            </tr>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-container>
          </v-col>

          <!--
          <v-col cols="12" v-if="report">
            <v-container id="report-container">

            </v-container>
          </v-col>
          -->
        </v-row>

        <CustomScrollToTop />
      </v-card-text>

      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      report: null,

      hidden: false
    };
  },

  filters: {
    dateToStr: function (value) {
      return value ? new Date(value).toLocaleString() : '-';
    },

    hrefAddr: function (value) {
      return '#host_' + value.replace(/\./g, '_');
    },

    idAddr: function (value) {
      return 'host_' + value.replace(/\./g, '_');
    },

    titleAddr: function (value) {
      if (value.hostnames) {
        return value.hostnames[0]['hostname']
          ? `${value.hostnames[0].hostname[0].item.name}\u00A0(\u00A0${value.address[0].item.addr}\u00A0)`
          : value.address[0].item.addr;
      } else {
        return value.address[0].item.addr;
      }
    }
  },

  computed: {
    hoshelpdeskort: function () {
      return this.host.sort(function (a, b) {
        let aa = a.address[0].item.addr.split('.');
        let bb = b.address[0].item.addr.split('.');
        for (var i = 0; i < aa.length; i++) {
          if ((aa[i] = parseInt(aa[i])) < (bb[i] = parseInt(bb[i]))) return -1;
          else if (aa[i] > bb[i]) return 1;
        }
        return 0;
      });
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
    async onItem(id) {
      try {
        this.report = null;
        this.report = await this.$store.dispatch('api/onmap/findOne', {
          id
        });

        if (this.report) {
          this.$toast.success(
            this.$t('Record received successfully', {
              ip: this.report.target
            })
          );
          this.dialog = true;
        } else {
          this.$toast.error(this.$t('Record not found'));
          this.dialog = false;
        }
      } catch (err) {
        this.$toast.error(this.$t('Record not found'));
        this.close();
      }
    },

    async saveReport() {
      try {
        if (process.browser) {
          const html2pdf = require('html2pdf.js');
          const element = document.getElementById('report');
          await html2pdf(element, {
            margin: 1,
            filename: `ONMAP_${this.report.target} (${new Date(
              this.report.updated
            ).toLocaleDateString()}).pdf`,
            jsPDF: {
              orientation: 'portrait',
              format: 'a4',
              floatPrecision: 16
            }
          });
          this.$toast.success(this.$t('Report created successfully'));
        }
      } catch (err) {
        this.$toast.error(this.$t('An unexpected error has occurred'));
      }
    },

    close() {
      this.dialog = false;
      this.report = null;
    }
  }
};
</script>

<style scoped>
#report {
  scroll-behavior: smooth;
}

h1 {
  font-family: Verdana, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 14pt;
  color: #ffffff;
  background-color: #2a0d45;
  margin: 10px 0px 0px 0px;
  padding: 5px 4px 5px 4px;
  width: 100%;
  border: 1px solid black;
  text-align: left;
}

h2 {
  font-family: Verdana, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 11pt;
  color: #000000;
  margin: 30px 0px 0px 0px;
  padding: 4px;
  width: 100%;
  background-color: #f0f8ff;
  text-align: left;
}

h2.green {
  color: #000000;
  background-color: #ccffcc;
  border-color: #006400;
}

h2.red {
  color: #000000;
  background-color: #ffcccc;
  border-color: #8b0000;
}

h3 {
  font-family: Verdana, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 10pt;
  width: 75%;
  text-align: left;
}

p {
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
  width: 75%;
  text-align: left;
}

p i {
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
  color: #000000;
  background-color: #cccccc;
}

ul {
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
  width: 75%;
  text-align: left;
}

a {
  font-family: Verdana, Helvetica, sans-serif;
  text-decoration: none;
  font-size: 8pt;
  font-weight: bold;
}

li a {
  font-family: Verdana, Helvetica, sans-serif;
  text-decoration: none;
  font-size: 10pt;
  font-weight: bold;
}

a:hover {
  text-decoration: underline;
}

a.up {
  color: #006400;
}

table {
  width: 80%;
  border: 0px;
  margin: 10px;
}

tr {
  vertical-align: top;
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
}

tr.head {
  background-color: #e1e1e1;
  color: #000000;
  font-weight: bold;
}

tr.open {
  background-color: #ccffcc;
  color: #000000;
}

tr.script {
  background-color: #effff7;
  color: #000000;
}

tr.filtered {
  background-color: #f2f2f2;
  color: #000000;
}

tr.closed {
  background-color: #f2f2f2;
  color: #000000;
}

td {
  padding: 2px;
}

#menu li {
  display: inline;
  margin: 0;
  /*margin-right    : 10px;*/
  padding: 0;
  list-style-type: none;
}

#menubox {
  position: fixed;
  bottom: 0px;
  right: 0px;
  width: 120px;
}

.up {
  color: #000000;
  background-color: #ccffcc;
}

.down {
  color: #626262;
  background-color: #f2f2f2;
}

.print_only {
  display: none;
}

.hidden {
  display: none;
}

.unhidden {
  display: block;
}

/* p {
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
  margin: 4px 0;
  width: 75%;
  text-align: left;
}

h1 {
  font-family: Verdana, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 14pt;
  color: #ffffff;
  background-color: #2a0d45;
  margin: 10px 0 0 0;
  padding: 5px 4px 5px 4px;
  width: 100%;
  border: 1px solid black;
  text-align: left;
}

h2 {
  font-family: Verdana, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 11pt;
  color: #000000;
  margin: 8px 0 0 0;
  padding: 4px;
  width: 100%;
  background-color: #f0f8ff;
  text-align: left;
}

h2.green {
  color: #000000;
  background-color: #ccffcc;
}

h2.red {
  color: #000000;
  background-color: #ffcccc;
  border-color: #8b0000;
}

h3 {
  font-family: Verdana, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 10pt;
  width: 75%;
  text-align: left;
}

p {
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
  width: 75%;
  text-align: left;
}

p i {
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
  color: #000000;
  background-color: #cccccc;
}

ul {
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
  text-align: left;
  margin: 0;
  padding: 0px;
}

a {
  font-family: Verdana, Helvetica, sans-serif;
  text-decoration: none;
  font-size: 8pt;
  font-weight: bold;
  background-color: #ffffff;
  color: #000000;
}

li a {
  font-family: Verdana, Helvetica, sans-serif;
  text-decoration: none;
  font-size: 10pt;
  font-weight: bold;
  background-color: #ffffff;
  color: #000000;
}

a:hover {
  text-decoration: underline;
}

a.up {
  color: #006400;
}

table {
  width: 100%;
  border: 0px;
  color: #000000;
  background-color: #000000;
  margin: 10px;
}

tr {
  vertical-align: top;
  font-family: Verdana, Helvetica, sans-serif;
  font-size: 8pt;
  color: #000000;
  background-color: #ffffff;
}

tr.head {
  background-color: #e1e1e1;
  color: #000000;
  font-weight: bold;
}

tr.open {
  background-color: #ccffcc;
  color: #000000;
}
tr.script {
  background-color: #effff7;
  color: #000000;
}

tr.filtered {
  background-color: #f2f2f2;
  color: #000000;
}

tr.closed {
  background-color: #f2f2f2;
  color: #000000;
}

td {
  padding: 2px !important;
}

.up {
  color: #000000;
  background-color: #ccffcc;
}

.down {
  color: #626262;
  background-color: #f2f2f2;
}

.print_only {
  display: none;
}

.hidden {
  display: none;
}

.unhidden {
  display: block;
}

ul {
  list-style-type: none;
}

li {
  display: inline;
} */
</style>
