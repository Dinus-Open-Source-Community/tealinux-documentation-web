<script setup>
import { NuxtImg } from '#components'
import { ref, onMounted, onUnmounted } from 'vue'
import Drawer from 'primevue/drawer'
const routes = ref([
  { label: 'Home', url: '/' },
  { label: 'Docs', url: '/docs' },
  { label: 'Download', url: '/download' },
  { label: 'Contribute', url: 'https://github.com/tealinuxos' },
])

const isScrolled = ref(false)
const showdrawer = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const route = useRoute()
</script>

<template>
  <div :class="[
    'fixed top-0 left-0 right-0 z-50',
    'flex items-center px-[7%]',
    'transition-all duration-300 ease-in-out',
    isScrolled
      ? 'bg-white backdrop-blur-md shadow-lg rounded-b-2xl py-4'
      : 'bg-transparent py-3'
  ]">
    <NuxtImg src="/image/logo_head.svg" alt="" class="md:w-[40px] w-[30px]" />
    <div class="md:flex ml-auto gap-x-5 hidden">
      <div v-for="(route, index) in routes" :key="index">
        <NuxtLink :href="route.url" :class="[
          'font-medium text-lg cursor-pointer rounded-full p-3 px-4',
          'transition-all duration-300 ease-in-out',
          'hover:bg-green-1 hover:text-white',
          isScrolled ? 'text-green-1' : 'text-green-0'
        ]">
          {{ route.label }}
        </NuxtLink>
      </div>
    </div>

    <div class="ml-auto md:hidden flex items-center gap-x-2" @click="showdrawer = true">
      <h3 class="font-semibold text-green-1 text-sm">Menu</h3>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-menu-icon lucide-menu stroke-green-1">
        <path d="M4 12h16" />
        <path d="M4 18h16" />
        <path d="M4 6h16" />
      </svg>
    </div>

    <Drawer v-model:visible="showdrawer" :modal="true" :dismissable-mask="true" position="right"
      class="w-[150px]">
      <div class="flex flex-col gap-y-4">
        <div v-for="(route, index) in routes" :key="index">
          <NuxtLink :href="route.url" class="font-medium text-lg cursor-pointer rounded-full p-3 px-4 text-green-1 hover:bg-green-1 hover:text-white transition-all duration-300 ease-in-out">
            {{ route.label }}
          </NuxtLink>
        </div>
      </div>
    </Drawer>
  </div>
</template>