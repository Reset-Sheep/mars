// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss','@vueuse/nuxt','@element-plus/nuxt'],
  compatibilityDate: '2025-07-15',
  css: [
    "@/assets/css/fonts.css"
  ],
  devtools: { enabled: true }
})
