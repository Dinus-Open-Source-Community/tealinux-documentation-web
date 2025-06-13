<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NuxtImg } from '#components'

interface Contact {
  name: string
  image: string
}

interface FooterData {
  content: string
  contact: Contact[]
}

defineProps({
  customClass: {
    type: String,
    default: ''
  }
})

const footerData = ref<FooterData>({
  content: '',
  contact: []
})

onMounted(async () => {
  try {
    const res = await fetch('/content/footersection.json')
    const json = await res.json()
    footerData.value = json.sixthsection
  } catch (error) {
    console.error('Error loading footer data:', error)
  }
})
</script>

<template>
  <div :class="['bg-green-1 flex h-fit items-center py-[1%] px-[7%]', customClass]">
    <div class="md:h-[367px] flex md:flex-row flex-col gap-[7%] md:items-center flex-1">
      <NuxtImg src="/image/logo_footer.svg" class="lg:w-[225px] hidden xl:block" />

      <div class="flex flex-col gap-y-4 max-w-[376px]">
        <div class="flex gap-x-2 items-center">
          <NuxtImg src="/image/logo_footer.svg" class="w-[30px] block md:hidden" />
          <h1 class="font-semibold text-white xl:text-[56px] lg:text-[48px] md:text-[44px] sm:text-[32px]">TeaLinux OS</h1>
        </div>
        <p class="text-justify text-white font-light lg:text-base text-xs">
          TeaLinuxOS adalah distro Linux turunan Ubuntu yang dikembangkan oleh Dinus Open Source Community (DOSCOM)
          dan kawan-kawan yang berorientasi pemrograman. Dengan menghadirkan filosofi, “Nikmatnya sebuah racikan”,
          TeaLinuxOS dikembangkan secara terbuka dan bersama-sama untuk menghasilkan distro Linux pemrograman untuk
          dunia pendidikan.
        </p>
      </div>

      <div class="grid grid-cols-2 md:gap-[55px] gap-[25px] flex-shrink-0 mt-[5%] md:mt-0">
        <div v-for="(contact, index) in footerData.contact" :key="index" class="md:col-span-1 col-span-2 flex gap-x-3.5 items-center text-white">
          <NuxtImg :src="contact.image" class="lg:w-[60px] lg:h-[60px] md:w-[42px] md:h-[42px] w-[30px] h-[30px]" />
          <h3 class="font-semibold lg:text-xl md:text-lg text-base whitespace-nowrap">{{ contact.name }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>


