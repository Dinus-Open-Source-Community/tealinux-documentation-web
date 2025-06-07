import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@nuxt/content", "@nuxt/fonts", "@nuxtjs/mdc"],

  devtools: { enabled: true },

  fonts: {
    families: [
      {
        name: "Archivo",
        provider: "google",
      },
    ],
  },
  css: ["~/assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  mdc: {
    highlight: false,
    components: {
      prose: true,
      map: {
        h1: "Heading",
      },
    },
  },
});
