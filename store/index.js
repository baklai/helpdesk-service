import { config } from '@/package.json';

export const state = () => ({
  error: null,

  isMaintenance: null,

  sidebar: null,

  author: {
    name: config.author.name,
    email: config.author.email,
    url: config.author.url
  },

  social: {
    facebook: config.author.social.facebook
      ? {
          icon: 'mdi-facebook',
          title: 'Facebook',
          href: config.author.social.facebook
        }
      : null,
    github: config.author.social.github
      ? {
          icon: 'mdi-github',
          title: 'Github',
          href: config.author.social.github
        }
      : null,
    linkedin: config.author.social.linkedin
      ? {
          icon: 'mdi-linkedin',
          title: 'Linkedin',
          href: config.author.social.linkedin
        }
      : null
  },

  app: {
    name: config.app.name,
    short_name: config.app.short_name,
    description: config.app.description
  }
});

export const getters = {
  copyright: (state) => {
    return `Copyright © ${new Date().getFullYear()} ${state.author.name}.`;
  },

  apppage: (state) => {
    try {
      return $nuxt.$root.$route === 'home'
        ? {
            appicon: 'mdi-apps',
            apptitle: state.app.short_name,
            appsubtitle: state.app.description
          }
        : Object.assign({}, ...$nuxt.$root.$route.meta);
    } catch (err) {}
    return {
      appicon: 'mdi-apps',
      apptitle: state.app.short_name,
      appsubtitle: state.app.description
    };
  },

  error: (state) => state.error
};

export const mutations = {
  sidebar(state, val) {
    state.sidebar = val;
  },

  isMaintenance(state, val) {
    state.isMaintenance = val;
  },

  toggleDarkMode() {
    $nuxt.$root.$vuetify.theme.dark = !$nuxt.$root.$vuetify.theme.dark;
    localStorage.setItem(
      'theme.dark',
      $nuxt.$root.$vuetify.theme.dark.toString()
    );
  },

  setError(state, error) {
    state.error = error;
  },

  clearError(state) {
    state.error = null;
  }
};

export const actions = {
  exportCSV({}, { delimiter = ';', fileName = 'table' }) {
    let data = [];
    const rows = document.querySelectorAll('table tr');
    for (let i = 0; i < rows.length; i++) {
      let row = [];
      let cols = rows[i].querySelectorAll('td, th');
      for (let j = 0; j < cols.length; j++) {
        row.push(cols[j].innerText);
      }
      data.push(row.join(delimiter));
    }
    const csvData = new Blob([data.join('\n')], {
      type: 'text/csv;charset=utf-8'
    });
    const csvUrl = URL.createObjectURL(csvData);
    const hiddenElement = document.createElement('a');
    hiddenElement.href = csvUrl;
    hiddenElement.target = '_blank';
    hiddenElement.download = fileName + '.csv';
    hiddenElement.click();
  }
};
