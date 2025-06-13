<script setup>
import { ref } from 'vue';
import pattern from '/img/patten-download.png';


useHead({
  title: 'Downloads - TeaLinux',
  meta: [
    { name: 'description', content: 'Download TeaLinux COSMIC and Plasma editions - Modern Linux desktop distributions' }
  ]
})

const editions = ref([
  {
    image: '/img/download-bg1.png',
    title: 'COSMIC EDITION',
    slug: 'cosmic-edition',
    timeline: [
      { id: 1, title: "Latest Release", description: "The newest version featuring the innovative COSMIC desktop environment." },
      { id: 2, title: "Wayland by Default", description: "Experience a modern and secure display server protocol for smoother graphics." },
      { id: 3, title: "Enhanced Performance", description: "Optimized for speed and efficiency on a wide range of hardware." }
    ]
  },
  {
    image: '/img/download-bg1.png',
    title: 'PLASMA EDITION',
    slug: 'plasma-edition',
    timeline: [
      { id: 1, title: "Stable & Powerful", description: "Featuring the highly customizable and feature-rich KDE Plasma desktop." },
      { id: 2, title: "Extensive Tooling", description: "Comes packed with a suite of powerful applications for all your needs." },
      { id: 3, title: "Community Favorite", description: "A beloved choice for users who want control and a beautiful interface." }
    ]
  }
])
</script>

<template>
    <div class="bg-cover" :style="{ backgroundImage: `url('${pattern}')` }">
        <h1 class="before:content-[w-10 border-l-[10px] py-2 pl-3 border-[#858585] ]">Downloads</h1>
        <div class="flex md:flex-row flex-col min-h-screen w-full justify-center items-center md:gap-20 gap-10 py-10">
            <UiDownloadCardTemplate 
                v-for="edition in editions"
                :key="edition.slug"
                :image="edition.image" 
                :title="edition.title" 
                :slug="edition.slug"
                :timeline-data="edition.timeline"
            />
        </div>
    </div>
</template>

<style>
</style>