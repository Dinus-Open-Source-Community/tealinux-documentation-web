<script setup lang="ts">
import '@splidejs/vue-splide/css';
// @ts-ignore: vue-splide has no type declarations
import { ref, watch } from 'vue'
import '@splidejs/vue-splide/css';
// @ts-ignore
import { Splide, SplideSlide } from '@splidejs/vue-splide';
import RightButton from '../button/RightButton.vue';
import LeftButton from '../button/LeftButton.vue';
interface Slide {
  title: string
  text: string
  img: string
}

const slides = ref<Slide[]>([])

const splideRef = ref();
const currentSlide = ref(0);

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
  const res = await fetch('/content/fifthsection.json')
  const json = await res.json()
  slides.value = json.fifthSection
  
}

onMounted(() => {
    getData();

    const splideInstance = splideRef.value?.splide
  if (splideInstance) {
    splideInstance.on('move', (newIndex: number) => {
      currentSlide.value = newIndex
    })
  }
});
</script>

<template>
  <!-- add horizontal padding for small screens -->
  <section class="bg-green-1 flex flex-col items-center justify-center h-screen lg:px-[8%] px-[5%]">
    <!-- constrain overall width but allow full‐width below lg -->
    <div class="w-full my-auto">
      <!-- stack arrows & carousel vertically on mobile, horizontally on sm+ -->
      <div class="flex flex-col-reverse sm:flex-row items-center justify-center gap-4">
        <LeftButton :on-click="() => goTo(currentSlide - 1)" class="md:block hidden"/>
        <Splide :options="splideOptions" ref="splideRef" aria-label="TeaInstaller Carousel">
          <SplideSlide v-for="(slide, i) in slides" :key="i">
            <!-- stack content on xs, row on md+; adjust gaps responsively -->
            <div class="flex flex-col-reverse md:flex-row items-center gap-4 lg:gap-8 mx-auto px-[4%]">
              <!-- add small padding so text doesn't hit edges -->
              <div class="space-y-2 text-white md:text-left text-center lg:text-left lg:w-1/2">
                <h2 class="font-semibold text-xl sm:text-2xl lg:text-[56px]">
                  {{ slide.title }}
                </h2>
                <p class="text-base sm:text-lg lg:text-xl break-words">
                  {{ slide.text }}
                </p>
              </div>
              <!-- allow image to shrink on small screens -->
              <NuxtImg
                :src="slide.img"
                alt=""
                class="w-[400px] md:w-[525px] lg:w-[650px] shadow-2xl rounded-[30px]"
              />
            </div>
          </SplideSlide>
        </Splide>

        <RightButton :on-click="() => goTo(currentSlide + 1)" theme="green" class="md:block hidden"/>
      </div>

    </div>
    <div class="flex space-x-4 overflow-x-auto justify-center py-6">
      <button
        v-for="(_, index) in slides"
        :key="index"
        @click="goTo(index)"
        :class="[
          'duration-300 ease-in-out transition-all lg:h-3 h-2 rounded-full cursor-pointer',
          currentSlide === index ? 'bg-white lg:w-[98px] w-[64px]' : 'border-[3px] border-white w-9 lg:w-12'
        ]"
      ></button>
    </div>
  </section>
</template>
