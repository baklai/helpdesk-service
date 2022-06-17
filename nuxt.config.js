import dirtree from 'directory-tree';
import dotenv from 'dotenv';
import path from 'path';

import { config } from './package.json';

dotenv.config({
  path:
    process.env.NODE_ENV === 'production'
      ? path.join(__dirname, '.env.prod')
      : path.join(__dirname, '.env.dev')
});

export default {
  telemetry: false,
  ssr: false,

  cli: {
    badgeMessages: [
      `Application: ${process.env.npm_package_name.toUpperCase()}`,
      `Version:     ${process.env.npm_package_version}`
    ],
    bannerColor: 'green'
  },

  publicRuntimeConfig: {
    fileHosting:
      dirtree('./static/docs', {
        extensions: /\.(md|pdf|png|txt|xls|doc|docx|zip|rar|cab|exe|msi)$/,
        attributes: [
          'size',
          'type',
          'extension',
          'atime',
          'mtime',
          'ctime',
          'birthtime'
        ],
        normalizePath: true
      }) || null,
    isMaintenance: process.env.MODE_MAINTENANCE || false
  },

  server: {
    port: process.env.NODE_ENV.PORT,
    host: process.env.NODE_ENV.HOST
  },

  router: {
    prefetchLinks: false
  },

  head: {
    titleTemplate: `${config.app.short_name} • %s`,
    title: config.app.name,
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: config.app.description
      },
      { name: 'google', content: 'notranslate' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  components: true,

  loadingIndicator: {
    name: 'cube-grid',
    color: '#F5F5F5',
    background: '#FFFFFF'
  },

  loading: {
    color: '#2196F3',
    height: '2px'
  },

  css: [
    '@mdi/font/css/materialdesignicons.min.css',
    '~/assets/variables.css',
    '~/assets/vuetify.css'
  ],

  plugins: [
    '~/plugins/clipboard.client',
    '~/plugins/theme.client',
    '~/plugins/helpdesk.client'
  ],

  buildModules: ['@nuxtjs/vuetify', '@nuxtjs/router-extras'],

  modules: [
    '~/modules/socket/index.js',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-socket-io',
    '@nuxtjs/i18n',
    '@nuxtjs/toast'
  ],

  axios: {
    credentials: true,
    baseURL: `${process.env.API_URI}/api/v1/`
  },

  auth: {
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        sameSite: 'strict'
      }
    },
    redirect: {
      login: '/auth/signin',
      logout: '/auth/signin',
      callback: false,
      home: '/'
    },
    resetOnError: true,
    watchLoggedIn: true,
    rewriteRedirects: true,
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/auth/signin',
            method: 'post',
            propertyName: 'token'
          },
          logout: false,
          user: {
            url: '/auth/me',
            method: 'get',
            propertyName: 'user'
          }
        }
      }
    },
    plugins: ['~/plugins/scope.client.js']
  },

  io: {
    warnings: false,
    sockets: [
      {
        url: process.env.API_URI
      }
    ]
  },

  i18n: {
    lazy: true,
    langDir: 'lang/',
    strategy: 'no_prefix',
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        file: 'en-US.json',
        name: 'English'
      },
      {
        code: 'ru',
        iso: 'ru-RU',
        file: 'ru-RU.json',
        name: 'Русский'
      },
      {
        code: 'uk',
        iso: 'uk-UA',
        file: 'uk-UA.json',
        name: 'Українська'
      }
    ],
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'lang',
      redirectOn: 'root'
    },
    vueI18n: {
      fallbackLocale: 'en'
    }
  },

  toast: {
    type: 'default',
    theme: 'toasted-primary',
    position: 'bottom-right',
    icon: 'alert-circle-outline',
    duration: 3000,
    iconPack: 'mdi',
    register: [
      {
        name: 'error',
        message: 'Oops... Something went wrong!',
        options: {
          type: 'error',
          duration: 5000
        }
      }
    ]
  },

  vuetify: {
    font: {
      family: 'Roboto'
    },
    icons: {
      iconfont: 'mdi'
    },
    defaultAssets: false,
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      options: {
        customProperties: true
      },
      themes: {
        light: {
          background: '#FFFFFF',
          themecolor: '#FFFFFF',
          scrollbar: '#FFFFFF',
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          thover: '#FAFAFA'
        },
        dark: {
          background: '#333333',
          themecolor: '#333333',
          scrollbar: '#333333',
          primary: '#2196F3',
          secondary: '#424242',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FB8C00',
          thover: '#424242'
        }
      }
    }
  },

  serverMiddleware: [
    {
      path: '/api/v1',
      handler: '~/server/index.js',
      prefix: false
    }
  ],

  build: {
    publicPath: 'cdn/',
    babel: {
      plugins: [
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-proposal-private-methods', { loose: true }],
        ['@babel/plugin-proposal-private-property-in-object', { loose: true }]
      ]
    }
  }
};
