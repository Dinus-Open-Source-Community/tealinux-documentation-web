<script setup lang="ts">
import { ref } from 'vue';

import Footer from '~/components/Footer.vue';
import HeroSection from '~/components/section/HeroSection.vue';
import SecondSection from '~/components/section/SecondSection.vue';
import ThirdSection from '~/components/section/ThirdSection.vue';
import FourthSection from '~/components/section/FourthSection.vue';
import FifthSection from '~/components/section/FifthSection.vue';
import SixthSection from '~/components/section/SixthSection.vue';

definePageMeta({
  layout: 'layout',
});
</script>

<template>
  <!-- First section -->
  <HeroSection />

  <!-- Second section -->
  <SecondSection />

  <ThirdSection />
  

  <FifthSection />

  <!-- Sixt Section -->
  <SixthSection/>
  <!-- Footer -->
  <Footer />
</template>
