// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: ['@nuxtjs/i18n'],

  ssr: true,

  nitro: {
    preset: 'github_pages',
  },

  app: {
    baseURL: '/annur-site/',
    head: {
      link: [{ rel: 'icon', type: 'image/svg+xml', href: '/annur-site/favicon.svg' }],
    },
  },

  css: ['~/assets/css/main.css'],

  i18n: {
    langDir: 'locales',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'id', name: 'Indonesia', file: 'id.json' },
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
  },

  runtimeConfig: {
    public: {
      supabaseUrl: '',
      supabaseAnonKey: '',
    },
  },
})
