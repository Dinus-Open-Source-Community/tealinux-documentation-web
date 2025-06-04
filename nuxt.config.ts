import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  modules: ["@nuxt/content", "@nuxt/fonts", "@nuxtjs/mdc"],

  devtools: { enabled: true },
  watchers: {
    chokidar: {
      usePolling: true,
    }
  },
  nitro: {
    watchOptions: {
      usePolling:true,
    }
  },

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
    server:{
      hmr:{
        port: 3000,
      }
    }
  },
  mdc: {
    components: {
      prose: true,
      map: {
        h1: "Heading",
      },
    },
  },
});
