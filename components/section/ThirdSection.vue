<script setup lang="ts">
import { NuxtImg } from '#components'

interface Feature {
  title: string
  description: string
  img: string
}

interface ThirdSectionData {
  thirdSection: Feature[]
}

// Use Nuxt's useFetch for proper SSR/SSG support
const { data, error } = await useFetch<ThirdSectionData>('/content/thirdsection.json', {
  key: 'third-section-data'
})

// Extract features with fallback
const features = computed(() => data.value?.thirdSection || [])

if (error.value) {
  console.error('Error loading third section data:', error.value)
}
</script>

<template>
  <div class="h-fit bg-[url(/public/image/Pattern.png)] bg-white bg-cover bg-no-repeat">
    <div class="lg:h-[80vh] h-fit flex justify-center items-center px-[8%] py-[5%]">
      <div class="w-full flex flex-col h-full md:justify-start justify-center items-center md:items-start">
        <div class="md:border-l-[16px] border-green-1 md:pl-4">
          <h1 class="font-extralight text-green-1 text-[20px] md:text-[28px] lg:text-[36px] text-center md:text-left">Fitur</h1>
          <NuxtImg src="/image/green_tealinux.svg" class="w-[140px] lg:w-[180px]" />
        </div>

        <!-- flex kolom di mobile, baris di lg+, gap responsif -->
        <div class="flex flex-col lg:flex-row flex-wrap gap-[40px] items-stretch mt-[11%]">
          <div v-for="(feature, idx) in features" :key="idx" class="bg-green-1 relative lg:p-6 md:p-4 p-2 lg:rounded-[36px] md:rounded-[28px] rounded-[24px] lg:space-y-4 space-y-2 flex-1">
            <div class="absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2
             rounded-full lg:border-4 border-2 border-white lg:p-5 md:p-4 p-3 bg-green-1 shadow-md">
              <NuxtImg :src="feature.img" class="lg:w-[48px] md:w-[36px] w-[24px]" />
            </div>
            <div class="lg:space-y-5 md:space-y-2 space-y-1 text-center lg:mt-7 md:mt-5 mt-5">
              <h2 class="md:text-xl font-medium text-white">{{ feature.title }}</h2>
              <p class="text-white font-normal md:text-sm text-xs">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="h-screen flex justify-center items-center">
      <h1 class="lg:text-[48px] md:text-[36px] text-xl font-medium text-green-1 my-auto tracking-widest text-light">
        From <span class="font-extrabold">DOSCOM</span> for
        <span class="font-extrabold">Everyone</span>
      </h1>
    </div>
  </div>
</template>