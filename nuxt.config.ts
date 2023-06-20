// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "nuxt-swiper",
    "@nuxtjs/supabase",
  ],
  css: [
    "~/assets/main.css",
  ],
})