// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: 'Generate EvoWish'
    }
  },
  devtools: { enabled: false },
  modules: [
    '@formkit/auto-animate/nuxt',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
  ],
  css: [
    'primeflex/primeflex.css',
    '@/assets/fonts/ChristmasWish/stylesheet.css'
  ],
  i18n: {
    vueI18n: './assets/languages.ts'
  },
  googleFonts: {
    families: {
      'Great Vibes': true,
      'Dancing Script': true
    }
  }
})
