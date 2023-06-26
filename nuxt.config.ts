// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "nuxt-icon",
    "nuxt-swiper",
    "@nuxtjs/supabase",
    "@vueuse/motion/nuxt",
  ],
  css: [
    "vuetify/lib/styles/main.sass",
    "@/assets/main.css",
  ],
  app: {
    pageTransition: {
      name: "page",
      mode: "out-in",
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    define: {
      "process.env.DEBUG": false,
    },
  },
})