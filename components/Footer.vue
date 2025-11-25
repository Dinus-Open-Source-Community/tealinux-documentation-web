<script setup lang="ts">
import { NuxtImg } from '#components'

interface Contact {
  name: string
  image: string
}

interface FooterData {
  content: string
  contact: Contact[]
}

interface FooterSectionResponse {
  sixthsection: FooterData
}

defineProps({
  customClass: {
    type: String,
    default: ''
  }
})

// Use Nuxt's useFetch for proper SSR/SSG support
const { data, error } = await useFetch<FooterSectionResponse>('/content/footersection.json', {
  key: 'footer-section-data'
})

// Extract footer data with fallback
const footerData = computed(() => data.value?.sixthsection || {
  content: '',
  contact: []
})

// Log error if fetch fails
if (error.value) {
  console.error('Error loading footer data:', error.value)
}
</script>

<template>
  <footer
    :class="[
      'bg-green-1 text-white py-10 px-[7%] flex flex-col md:flex-row md:items-start md:justify-between gap-10',
      customClass
    ]"
  >
    <!-- Left: Logo -->
    <div class="flex flex-col items-start">
      <NuxtImg
        src="/image/logo_footer.svg"
        class="w-[180px] md:w-[225px] mb-4 hidden md:block"
        alt="TeaLinuxOS Logo"
      />
      <div class="flex items-center gap-2 md:hidden mb-3">
        <NuxtImg src="/image/logo_footer.svg" class="w-8 h-8" />
        <h1 class="font-semibold text-xl">TeaLinux OS</h1>
      </div>
      <h1 class="font-semibold text-3xl md:text-5xl hidden md:block mb-3">TeaLinux OS</h1>
    </div>

    <!-- Middle: Deskripsi -->
    <div class="max-w-[420px] flex-1">
      <p class="text-sm md:text-base leading-relaxed text-justify">
        TeaLinuxOS adalah distro Linux turunan Arch Linux yang dikembangkan oleh Dinus Open Source Community (DOSCOM)
        dan kawan-kawan yang berorientasi pemrograman. Dengan menghadirkan filosofi
        <span class="italic">“Nikmatnya sebuah racikan”</span>, TeaLinuxOS dikembangkan secara terbuka dan bersama-sama
        untuk menghasilkan distro Linux pemrograman untuk dunia pendidikan.
      </p>
    </div>

    <!-- Right: Kontak -->
    <div class="flex flex-col gap-4">
      <h2 class="font-semibold text-xl mb-2 border-b border-white/30 pb-1">Kontak Kami</h2>
      <div class="grid grid-cols-2 gap-5">
        <div
          v-for="(contact, index) in footerData.contact"
          :key="index"
          class="flex items-center gap-3 hover:opacity-90 transition"
        >
          <NuxtImg
            :src="contact.image"
            class="w-8 h-8 md:w-10 md:h-10"
            :alt="contact.name"
          />
          <h3 class="font-medium text-sm md:text-base whitespace-nowrap">{{ contact.name }}</h3>
        </div>
      </div>
    </div>
  </footer>
</template>