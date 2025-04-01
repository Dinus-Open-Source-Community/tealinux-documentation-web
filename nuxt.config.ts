// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite"
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  modules: ['@nuxt/content', '@nuxt/fonts'],
  devtools: { enabled: true },
  fonts:{
    families: [
      {
        name:'Archivo', provider:'google'
      }
    ]
  },
  css: ['~/assets/css/main.css'],
  vite:{
    plugins:[tailwindcss()]
  }
})
