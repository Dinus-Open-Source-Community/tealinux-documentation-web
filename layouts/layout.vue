<script setup>
import Header from '~/components/Header.vue';
import { useHead } from '#imports'; // pastikan ini ada di Nuxt 3

// Tambahkan script Umami ke head halaman
useHead({
  script: [
    {
      src: "http://localhost:3000/script.js",
      async: true,
      defer: true,
      'data-website-id': 'a8b6e2a4-7596-4ec5-8006-5ed085c3c658',
    },
  ],
});
</script>

<template>
  <div>
    <Header />
    <main>
      <slot />
    </main>
  </div>
</template>
