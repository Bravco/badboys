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
  image: {
    provider: "netlify",
    netlify: {
      baseURL: process.env.IMAGES_URL,
    },
  },
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
      meta: [
        {
          name: "title",
          content: "Bad Boys Pizza — Pizza, Štangle, Cestoviny, Šaláty a viac!",
        },
        {
          name: "description",
          content: "Ak hľadáte lahodné jedlo, Bad Boys Pizza je to pravé miesto! Vďaka širokej škále gastronomických možností si určite nájdete niečo, čo si zamilujete.",
        },
      ],
    },
  },
  build: {
    transpile: [
      "vuetify",
      "@fawmi/vue-google-maps",
    ],
  },
  runtimeConfig: {
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
    },
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