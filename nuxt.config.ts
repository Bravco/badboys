// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "nuxt-swiper",
    "@nuxtjs/supabase",
    "@vueuse/motion/nuxt",
    "@nuxt/image",
  ],
  css: [
    "@mdi/font/css/materialdesignicons.css",
    "vuetify/lib/styles/main.sass",
    "@/assets/main.css",
  ],
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
    head: {
      htmlAttrs: {
        lang: "sk",
      },
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  nitro: {
    compressPublicAssets: true,
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
})