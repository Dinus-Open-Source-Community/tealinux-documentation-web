import { defineNuxtPlugin } from '#app'
// script setup
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/vue-splide'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Splide', Splide)
  nuxtApp.vueApp.component('SplideSlide', SplideSlide)
})
