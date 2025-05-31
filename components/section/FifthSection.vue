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
  <!-- Fifth Section: Carousel -->
  <section class="bg-green-1 flex flex-col justify-center items-center h-[100vh]">
    <div class="flex flex-col justify-center items-center my-auto w-[90%]">
      <div class="flex items-center">
        <LeftButton :onclick="() => goTo(currentSlide - 1)" />
        <Splide :options="splideOptions" ref="splideRef" aria-label="TeaInstaller Carousel">
          <SplideSlide v-for="(slide, i) in slides" :key="i">
            <div class="flex w-fit lg:mx-[3%] flex-col lg:flex-row items-center gap-8 lg:gap-16">
              <div class="space-y-6 text-white text-center lg:text-left">
                <h2 class="font-semibold text-4xl lg:text-[89px]">{{ slide.title }}</h2>
                <p class="text-lg lg:text-[28px]">{{ slide.text }}</p>
              </div>
              <NuxtImg :src="slide.img" alt="" class="w-full lg:w-[850px] lg:h-[575px] shadow-2xl rounded-[30px]" />
            </div>
          </SplideSlide>
        </Splide>
        <RightButton :onclick="() => goTo(currentSlide + 1)" theme="green"/>
      </div>
    </div>
    <!-- 🔘 Custom Pagination -->
    <div class="flex space-x-4 pb-8">
      <button v-for="(_, index) in slides" :key="index" @click="goTo(index)" :class="[
        'duration-300 ease-in-out transition-all h-3 rounded-full cursor-pointer',
        currentSlide === index ? 'bg-white w-[98px]' : 'border-[3px] border-white w-12',
      ]"></button>
    </div>
  </section>
</template>
