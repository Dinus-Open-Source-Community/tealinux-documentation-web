<script setup lang="ts">
import { ref } from 'vue';
import { NuxtImg } from '#components';
import Footer from '~/components/Footer.vue';
import HeroSection from '~/components/section/HeroSection.vue';
import SecondSection from '~/components/section/SecondSection.vue';
import Tealinux from '~/components/svg/Tealinux.vue';

import '@splidejs/vue-splide/css';
// @ts-ignore: vue-splide has no type declarations
import { Splide, SplideSlide } from '@splidejs/vue-splide';

definePageMeta({
  layout: 'layout',
});

const features = ref([
  {
    title: 'High Quality',
    description: 'Berangkat dari dukungan dari semua pihak sistem operasi ini mengalami penyempurnaan mejadi sistem operasi yang stabil dan berkualitas.',
    img: '/image/high-quality.svg',
  },
  {
    title: 'Nutrition',
    description: 'Dukungan yang kuat dan tersedianya repository yang lengkap menjadikan sistem operasi ini penuh nutrisi.',
    img: '/image/nutrition.svg',
  },
  {
    title: 'Antea-piracy',
    description: 'The opensource has come true, this is the time to revenge.',
    img: '/image/high-quality.svg',
  },
  {
    title: 'Community',
    description: 'Dukungan kuat dari forum dan komunitas dunia virtual maupun komunitas riil menjadikan sistem operasi ini berkembang cepat.',
    img: '/image/community.svg',
  },
]);
</script>

<template>
  <!-- First section -->
  <HeroSection />

  <!-- Second section -->
  <SecondSection/>

  <!-- Third Section -->
  <div class="bg-white h-[800px] flex justify-center items-center">
    <div class="space-y-20 w-[1581px]">
      <div class="flex flex-col max-w-[627px] mr-auto">
        <div class="border-l-[24px] border-l-green-1 pl-4">
          <h1 class="font-extralight text-green-1 text-[56px]">Fitur</h1>
          <Tealinux fill-color="white" />
        </div>
      </div>
      <div class="flex gap-x-[58px] items-stretch">
        <div class="bg-green-1 relative p-9 rounded-[47px] flex-1" v-for="(feature, idx) in features" :key="idx">
          <div
            class="absolute top-0 -translate-y-1/2 translate-x-[58%] rounded-full border-4 border-white p-8 bg-green-1 shadow-md">
            <NuxtImg :src="feature.img" class="w-[56px]" />
          </div>
          <div class="space-y-5 text-center mt-10">
            <h2 class="text-[28px] text-white">
              {{ feature.title }}
            </h2>

            <p class="text-white">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Fourth Section -->
  <div
    class="h-[575px] bg-[url(/public/image/bg_from_doscom_to_everyone.svg)] bg-cover text-center flex items-center justify-center shadow-xl">
    <h1 class="text-[58px] font-medium text-green-1 my-auto">From <span class="font-extrabold">DOSCOM</span> for <span
        class="font-extrabold">Everyone</span></h1>
  </div>

  <!-- Fifth Section -->
  <div class="bg-green-1 flex flex-col justify-center items-center h-screen" aria-label="Splide Basic HTML Example">

    <Splide :options="{ rewind: true }" aria-label="My Favorite Images">
      <SplideSlide>
        <div class="w-[1420px] flex items-center">
          <div class="space-y-6 text-white">
            <h2 class="font-semibold text-[89px]">Tea-Installer</h2>
            <p class="text-[28px]">With our own Installer, installing Arch-based distro never been so easy and
              intuitive.
            </p>
          </div>
          <NuxtImg src="/image/installer.png" alt="" class="w-[850px] h-[575px] shadow-2xl rounded-[30px]" />
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="w-[1420px] flex items-center">
          <div class="space-y-6 text-white">
            <h2 class="font-semibold text-[89px]">Tea-Installer</h2>
            <p class="text-[28px]">With our own Installer, installing Arch-based distro never been so easy and
              intuitive.
            </p>
          </div>
          <NuxtImg src="/image/installer.png" alt="" class="w-[850px] h-[575px] shadow-2xl rounded-[30px]" />
        </div>
      </SplideSlide>
      <SplideSlide>
        <div class="w-[1420px] flex items-center">
          <div class="space-y-6 text-white">
            <h2 class="font-semibold text-[89px]">Tea-Installer</h2>
            <p class="text-[28px]">With our own Installer, installing Arch-based distro never been so easy and
              intuitive.
            </p>
          </div>
          <NuxtImg src="/image/installer.png" alt="" class="w-[850px] h-[575px] shadow-2xl rounded-[30px]" />
        </div>
      </SplideSlide>
    </Splide>
  </div>

  <!-- Sixt Section -->
  <div class="bg-[url(/public/image/background.png)] h-screen">

  </div>

  <!-- Footer -->
  <Footer />
</template>
