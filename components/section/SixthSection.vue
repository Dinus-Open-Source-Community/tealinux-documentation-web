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
  splideRef.value?.go(index);
};

async function getData() {
  const res = await fetch('/content/sixthsection.json')
  const json = await res.json()
  slides.value = json.sixthSection
  
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
  <div class="bg-[url(/public/image/pattern.png)] h-screen flex items-center justify-center">
    <div class="lg:space-y-[140px]  w-5/6 h-fit relative">
      <div class=" max-w-[627px] mr-auto">
        <div class="border-l-[24px] border-l-green-1 pl-4">
          <h1 class="font-extralight text-green-1 text-[56px]">From the</h1>
          <h1 class="text-[73px] text-green-1 font-semibold">Press</h1>
        </div>
      </div>
      <div class="flex items-center justify-center">
        <LeftButton :onclick="() => goTo(currentSlide - 1)" theme="white" class="mb-auto mt-[5%]"/>
        <Splide :options="splideOptions" ref="splideRef" aria-label="TeaInstaller Carousel" pagination>
          <SplideSlide v-for="(slide, i) in slides" :key="i">
            <div class=" mx-auto text-center font-light text-[35px] w-[55%] space-y-[98px]">
              <p>
                {{ slide.description }}
              </p>

              <div class="space-y-5 flex flex-col items-center justify-center">
                <h3 class="text-green-1 font-medium">{{slide.author}}</h3>
                <NuxtImg src="/image/Black.svg" alt="koma keatas apa yah namanya" class="w-[39px]" />
              </div>
            </div>
          </SplideSlide>
        </Splide>
        <RightButton :onclick="() => goTo(currentSlide + 1)" theme="white" class="mb-auto mt-[5%]"/>
      </div>
    </div>

  </div>
</template>