<script setup lang="ts">
// @ts-ignore: vue-splide has no type declarations
import { ref, watch } from 'vue'
import '@splidejs/vue-splide/css';
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import RightButton from '../button/RightButton.vue';
import LeftButton from '../button/LeftButton.vue';
interface Slide {
  author: string
  description: string
}
const slides = ref<Slide[]>([])
const splideOptions = {
  rewind: true,
  perPage: 1,
  gap: '4rem',
  pagination: false,
  arrows: false,
  autoplay: true,
  interval: 3000,
  breakpoints: {
    640: { gap: '2rem' },
    768: { gap: '3rem' }
  }
}

const splideRef = ref();
const currentSlide = ref(0);

const goTo = (index: number) => {
  if (slides.value.length === 0) return

  let targetIndex = index

  // Handle wraparound manually
  if (index >= slides.value.length) {
    targetIndex = 0  // ke slide pertama jika melewati batas akhir
  } else if (index < 0) {
    targetIndex = slides.value.length - 1  // ke slide terakhir jika kurang dari 0
  }

  splideRef.value?.go(targetIndex)
  currentSlide.value = targetIndex
}

async function getData() {
  const res = await fetch('/content/sixthsection.json')
  const json = await res.json()
  slides.value = json.sixthSection
}

onMounted(() => {
  getData();

  // Akses instance Splide dari komponen Vue wrapper
  const splideInstance = splideRef.value?.splide
  if (splideInstance) {
    splideInstance.on('move', (newIndex: number) => {
      currentSlide.value = newIndex
    })
  }
});
</script>

<template>
  <div
    class="bg-[url(/public/image/Pattern.png)] bg-white text-black bg-cover bg-center min-h-screen flex flex-col md:p-8 lg:px-[7%] px-[3%] py-[20%] md:py-[6%] lg:py-[5%]">
    <div class="flex flex-col flex-1 h-full min-w-full max-w-screen-xl relative lg:gap-y-16 md:gap-y-12 gap-y-6">
      <div class="md:border-l-[16px] border-l-green-1 md:pl-4 text-center md:text-left">
        <h1 class="font-extralight text-green-1 text-[20px] sm:text-[24px] md:text-[28px] lg:text-[36px]">From the</h1>
        <h1 class="text-[40px] sm:text-[44px] md:text-[48px] lg:text-[56px] text-green-1 font-semibold">Press</h1>
      </div>

      <div class="flex items-center justify-center my-auto md:my-0">
        <LeftButton :on-click="() => goTo(currentSlide - 1)" theme="white" class="hidden md:block mb-[5%]" />
        <Splide :options="splideOptions" ref="splideRef" aria-label="TeaInstaller Carousel" class="md:w-[85%] w-full">
          <SplideSlide v-for="(slide, i) in slides" :key="i">
            <div
              class="flex flex-col md:gap-4 lg:gap-8 mx-auto px-[4%] text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl lg:w-[65%] md:w-[75%] w-[85%]">
              <p class="text-center font-light text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                {{ slide.description }}
              </p>

              <div class="flex flex-col items-center justify-center gap-y-2 lg:gap-y-3 mt-4">
                <h3 class="text-green-1 font-medium text-xl sm:text-2xl md:text-3xl">{{ slide.author }}</h3>
                <NuxtImg src="/image/black.svg" alt="Quotation mark" class="w-[20px] lg:w-[28px]" />
              </div>
            </div>
          </SplideSlide>
        </Splide>

        <RightButton :on-click="() => goTo(currentSlide + 1)" theme="white" class="hidden md:block mb-[5%]" />
      </div>
    </div>
  </div>
</template>