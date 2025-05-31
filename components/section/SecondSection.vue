<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NuxtImg } from '#components'

const description = ref('…loading…')

onMounted(async () => {
  const res  = await fetch('/content/secondsection.json')
  const json = await res.json()
  description.value = json.secondSection
})
</script>

<template>
  <div class="bg-green-1 flex justify-center items-center py-14 h-screen">
    <div
      class="flex flex-col lg:flex-row h-fit
             w-full xl:w-[1581px]
             px-4 md:px-8"
    >
      <div class="flex flex-col w-full lg:max-w-[627px] mb-10 lg:mb-0 lg:mr-auto">
        <div class="border-l-[16px] lg:border-l-[24px] border-white pl-4">
          <h1 class="font-extralight text-white text-[40px] md:text-[48px] lg:text-[56px]">
            Apa itu
          </h1>
          <NuxtImg
            src="/image/white_tealinux.svg"
            class="w-[140px] md:w-[180px] lg:w-[220px] xl:w-[290px]"
          />
        </div>

        <p
          class="text-white text-[18px] md:text-[22px] lg:text-[28px]
                 text-justify leading-relaxed mt-6 lg:mt-auto
                 w-full lg:w-fit      <!-- was w-fit -->
          "
        >
          {{ description }}
        </p>
      </div>

      <NuxtImg
        src="/image/logo_big2.svg"
        alt=""
        class="mx-auto lg:mx-0 w-[260px] md:w-[480px] lg:w-[560px] xl:w-[720px] max-h-[70vh] object-contain"
      />
    </div>
  </div>
</template>