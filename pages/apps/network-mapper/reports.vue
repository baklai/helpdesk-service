<template>
  <v-container fill-height fluid class="pa-0" v-resize="onResize">
    <ModalsDelete
      ref="delete"
      @closeEvent="getItems"
      v-if="$auth.hasScope('onmap:delete')"
    />
    <ReportsModalRepScan ref="modal" v-if="$auth.hasScope('onmap:get')" />
    <v-data-table
      dense
      item-key="id"
      fixed-header
      :items="items"
      :headers="headers"
      :loading="loading"
      :items-per-page.sync="filters.perpage"
      :footer-props="{
        itemsPerPageOptions: [10, 15, 20, 25, -1],
        itemsPerPageText: $t('Rows per page'),
        showFirstLastPage: true,
        showCurrentPage: true
      }"
      :height="windowSize.y - 64 - 64 - 59"
      :loading-text="$t('Loading please wait')"
      :no-data-text="$t('No matching records found')"
      class="table-fixed-col"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-icon large left> {{ apppage.appicon }} </v-icon>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title>
                {{ $t(apppage.apptitle) }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ $t(apppage.appsubtitle) }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-spacer />
          <v-responsive width="210" class="mx-2">
            <CustomFilterInput
              v-model="filters.target"
              :label="$t('Search target')"
            />
          </v-responsive>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-on="on"
                v-bind="attrs"
                @click="cleanFilters()"
                class="mx-2"
              >
                <v-icon> mdi-filter-remove-outline </v-icon>
              </v-btn>
            </template>
            <span> {{ $t('Clear filters') }} </span>
          </v-tooltip>
          <v-tooltip bottom v-if="$auth.hasScope('onmap:post')">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-on="on"
                v-bind="attrs"
                @click="onDrawer"
                class="mx-2"
              >
                <v-icon> mdi-access-point-network </v-icon>
              </v-btn>
            </template>
            <span> {{ $t('New scan') }} </span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                v-on="on"
                v-bind="attrs"
                @click="getItems"
                class="mx-2"
              >
                <v-icon> mdi-cached </v-icon>
              </v-btn>
            </template>
            <span> {{ $t('Update records') }} </span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-on="on" v-bind="attrs" class="mx-2">
                <v-icon> mdi-cog-outline </v-icon>
              </v-btn>
            </template>
            <span> {{ $t('Options') }} </span>
          </v-tooltip>
        </v-toolbar>
      </template>

      <template v-slot:[`footer.prepend`]>
        <v-menu top offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text outlined v-bind="attrs" v-on="on">
              <v-icon small left> mdi-tune </v-icon>
              {{ $t('Actions') }}
              <v-icon small right> mdi-chevron-up </v-icon>
            </v-btn>
          </template>
          <v-list flat dense>
            <v-list-item @click="getItems">
              <v-list-item-icon class="mr-2">
                <v-icon small> mdi-cached </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $t('Update records') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="cleanFilters()">
              <v-list-item-icon class="mr-2">
                <v-icon small> mdi-filter-remove-outline </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $t('Clear filters') }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item @click="onDrawer" v-if="$auth.hasScope('onmap:post')">
              <v-list-item-icon class="mr-2">
                <v-icon small> mdi-access-point-network </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $t('New scan') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu top offset-y v-if="$auth.hasScope('onmap:export:table')">
          <template v-slot:activator="{ on, attrs }">
            <v-btn small text outlined v-bind="attrs" v-on="on" class="ml-2">
              <v-icon small left> mdi-file-chart-outline </v-icon>
              {{ $t('Reports') }}
              <v-icon small right> mdi-chevron-up </v-icon>
            </v-btn>
          </template>
          <v-list flat dense>
            <v-list-item
              v-if="$auth.hasScope('onmap:export:table')"
              @click="
                $store.dispatch('exportCSV', {
                  delimiter: ';',
                  fileName: 'onmap'
                })
              "
            >
              <v-list-item-icon class="mr-2">
                <v-icon small> mdi-content-save-outline </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $t('Export records') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>

      <template v-slot:[`header.actions`]="{ header }">
        {{ header.text }}
        <v-icon small> mdi-cog-outline </v-icon>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-menu offset-y open-on-hover>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon> mdi-dots-vertical </v-icon>
            </v-btn>
          </template>
          <v-list flat dense>
            <HostDefActions :host="item.target" />
            <v-divider />
            <v-list-item
              @click="onItemDel(item.id)"
              v-if="$auth.hasScope('onmap:delete')"
            >
              <v-list-item-icon class="mr-1">
                <v-icon small> mdi-trash-can-outline </v-icon>
              </v-list-item-icon>
              <v-list-item-title>
                {{ $t('Delete record') }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
          <v-system-bar>
            <v-spacer />
            <strong> TARGET {{ item.target }} </strong>
            <v-spacer />
          </v-system-bar>
        </v-menu>
      </template>

      <template v-slot:[`item.target`]="{ item }">
        <span
          class="cursor-color-bold"
          @click="$auth.hasScope('onmap:get') ? onItem(item.id) : false"
        >
          {{ item.target }}
        </span>
      </template>

      <template v-slot:[`item.public`]="{ item }">
        <v-icon small left>
          {{
            item.public
              ? 'mdi-account-multiple-outline'
              : 'mdi-account-lock-outline'
          }}
        </v-icon>
        <span>
          {{ item.public ? 'public' : 'privat' }}
        </span>
      </template>

      <template v-slot:[`item.updated`]="{ item }">
        {{ item.updated | dateTimeToStr }}
      </template>

      <template v-slot:[`item.osname`]="{ item }">
        {{ item.osname }}
      </template>

      <template v-slot:[`item.osports`]="{ item }">
        {{ item.osports }}
      </template>
    </v-data-table>
    <DrawersScanner ref="drawer" v-if="$auth.hasScope('onmap:post')" />
  </v-container>
</template>

<router>
{
  meta: [
    {
      appicon: 'mdi-lan'
    },
    {
      apptitle: 'ONMAP Reports'
    },
    {
      appsubtitle: 'Online nmap service of the technical support department'
    }
  ]
}
</router>

<script>
export default {
  data() {
    return {
      windowSize: { x: 0, y: 0 },
      loading: false,
      items: [],

      filters: {
        perpage: 15,
        target: ''
      }
    };
  },

  watch: {
    filters: {
      handler(value) {
        localStorage.setItem(
          `${this.$route.name}.filters`,
          JSON.stringify(value)
        );
      },
      deep: true
    }
  },

  async mounted() {
    this.filters = localStorage[`${this.$route.name}.filters`]
      ? JSON.parse(localStorage.getItem(`${this.$route.name}.filters`))
      : this.filters;
    await this.getItems();
  },

  computed: {
    apppage() {
      return this.$store.getters.apppage;
    },

    headers() {
      return [
        {
          text: '',
          value: 'actions',
          align: 'center',
          width: '32px',
          filterable: false,
          sortable: false
        },
        {
          text: this.$t('Title'),
          value: 'title',
          align: 'start',
          width: '200px',
          filterable: false,
          sortable: true
        },
        {
          text: this.$t('Target'),
          value: 'target',
          align: 'start',
          width: '200px',
          sortable: true,
          filter: (value) => {
            if (!this.filters.target) return true;
            return value.includes(this.filters.target);
          }
        },
        {
          text: this.$t('Report'),
          value: 'public',
          align: 'start',
          width: '150px',
          sortable: true,
          filterable: false
        },
        {
          text: this.$t('Report date'),
          value: 'updated',
          align: 'start',
          width: '180px',
          sortable: true,
          filterable: false
        },
        {
          text: this.$t('OS Name'),
          value: 'osname',
          align: 'start',
          width: '180px',
          sortable: true,
          filterable: false
        },
        {
          text: this.$t('OS Ports'),
          value: 'osports',
          align: 'start',
          width: '180px',
          sortable: true,
          filterable: false
        }
      ];
    }
  },

  filters: {
    dateTimeToStr: function (value) {
      return value ? new Date(value).toLocaleString() : '-';
    }
  },

  methods: {
    onResize() {
      this.windowSize = { x: window.innerWidth, y: window.innerHeight };
    },

    async getItems() {
      try {
        this.loading = true;
        this.items = await this.$store.dispatch('api/onmap/findAll');
        this.$toast.success(this.$t('The list of records has been updated'));
      } catch (err) {
        this.items = [];
      } finally {
        this.loading = false;
      }
    },

    onItem(id) {
      if (this.$auth.hasScope('onmap:get')) {
        this.$refs.modal.onItem(id);
      }
    },

    onDrawer() {
      if (this.$auth.hasScope('onmap:post')) {
        this.$refs.drawer.onItem();
      }
    },

    cleanFilters() {
      this.filters.perpage = 15;
      this.filters.target = '';
    }
  }
};
</script>

<style scoped>
.table-fixed-col >>> thead > tr > th:nth-child(1),
.table-fixed-col >>> tbody > tr > td:nth-child(1) {
  left: 0 !important;
  position: sticky !important;
  z-index: inherit !important;
  background: var(--v-background-base) !important;
}

.table-fixed-col >>> thead > tr > th:nth-child(2),
.table-fixed-col >>> tbody > tr > td:nth-child(2) {
  left: 44px !important;
  position: sticky !important;
  z-index: inherit !important;
  background: var(--v-background-base) !important;
}

.table-fixed-col >>> thead > tr > th:nth-child(3),
.table-fixed-col >>> tbody > tr > td:nth-child(3) {
  left: 194px !important;
  position: sticky !important;
  z-index: inherit !important;
  background: var(--v-background-base) !important;
}

.table-fixed-col >>> thead > tr > th:nth-child(1),
.table-fixed-col >>> thead > tr > th:nth-child(2),
.table-fixed-col >>> thead > tr > th:nth-child(3) {
  z-index: 3 !important;
}

.table-fixed-col >>> tbody > tr:hover > td:nth-child(1),
.table-fixed-col >>> tbody > tr:hover > td:nth-child(2),
.table-fixed-col >>> tbody > tr:hover > td:nth-child(3) {
  background: var(--v-thover-base) !important;
}

.table-fixed-col >>> tbody > tr:hover {
  background: var(--v-thover-base) !important;
}
</style>
