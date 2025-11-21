// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import lara from "@primeuix/themes/lara";
export default defineNuxtConfig({
  app: {
    head: {
      title: "Tealinux",
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/image/logo_head.svg" },
      ],
    },
  },
  compatibilityDate: "2024-11-01",
  modules: [
    "@nuxt/content",
    "@nuxt/fonts",
    "@nuxt/image",
    "@primevue/nuxt-module",
    "@nuxtjs/mdc",
  ],
  devtools: { enabled: true },
  watchers: {
    chokidar: {
      usePolling: true,
    },
  },
  nitro: {
    watchOptions: {
      usePolling: true,
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
    server: {
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 3000,
        clientPort: 3000,
      },
    },
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
  primevue: {
    options: {
      theme: {
        preset: lara,
      },
    },
  },
});
