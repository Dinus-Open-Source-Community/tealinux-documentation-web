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
  splideRef.value?.go(index);
};
async function getData() {
  const res = await fetch('/content/fifthsection.json')
  const json = await res.json()
  slides.value = json.fifthSection
  
}

onMounted(() => {
    getData();

  // Akses instance Splide dari komponen Vue wrapper
  const splideInstance = splideRef.value?.splide;

  if (splideInstance) {
    splideInstance.on('move', (newIndex: number) => {
      currentSlide.value = newIndex;
    });
  }
});
</script>

<template>
  <!-- add horizontal padding for small screens -->
  <section class="bg-green-1 flex flex-col items-center justify-center h-[100vh] px-4 sm:px-8">
    <!-- constrain overall width but allow full‐width below lg -->
    <div class="w-full max-w-[1581px] my-auto">
      <!-- stack arrows & carousel vertically on mobile, horizontally on sm+ -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <LeftButton :on-click="() => goTo(currentSlide - 1)" />

        <Splide :options="splideOptions" ref="splideRef" aria-label="TeaInstaller Carousel">
          <SplideSlide v-for="(slide, i) in slides" :key="i">
            <!-- stack content on xs, row on md+; adjust gaps responsively -->
            <div class="flex flex-col md:flex-row items-center gap-4 md:gap-8 lg:gap-16 mx-auto">
              <!-- add small padding so text doesn't hit edges -->
              <div class="space-y-6 text-white text-center lg:text-left px-2 sm:px-4">
                <h2 class="font-semibold text-2xl sm:text-4xl lg:text-[89px]">
                  {{ slide.title }}
                </h2>
                <p class="text-base sm:text-lg lg:text-[28px]">
                  {{ slide.text }}
                </p>
              </div>
              <!-- allow image to shrink on small screens -->
              <NuxtImg
                :src="slide.img"
                alt=""
                class="w-full sm:w-[600px] lg:w-[850px] lg:h-[575px] shadow-2xl rounded-[30px]"
              />
            </div>
          </SplideSlide>
        </Splide>

        <RightButton :on-click="() => goTo(currentSlide + 1)" theme="green" />
      </div>

      <!-- make pagination scrollable on small widths -->
      <div class="flex space-x-4 overflow-x-auto justify-center py-4">
        <button
          v-for="(_, index) in slides"
          :key="index"
          @click="goTo(index)"
          :class="[
            'duration-300 ease-in-out transition-all h-3 rounded-full cursor-pointer',
            currentSlide === index ? 'bg-white w-[98px]' : 'border-[3px] border-white w-12'
          ]"
        ></button>
      </div>
    </div>
  </section>
</template>
