<script setup>
import { NuxtImg } from '#components';
import { ref } from 'vue'

const routes = ref([
  { label: 'Home', url: '#home' },
  { label: 'Docs', url: '#docs' },
  { label: 'About', url: '#about' },
  { label: 'Contribute', url: '#contribute' },
])

const route = useRoute()
</script>

<template>
  <div class="flex items-center mx-[100px] m-7">
    <NuxtImg src="/image/logo_head.svg" alt="" class="w-[57px]"/>
    <div class="flex ml-auto gap-x-7">
      <div v-for="(route, index) in routes" :key="index">
        <!-- <a :href="route.url" :class={"text-green-0 font-medium hover:underline text-xl"}>{{ route.label }}</a> -->
        <NuxtLink :href="route.url" class="text-green-0 font-medium 
        text-xl hover:bg-green-1 
        hover:text-white 
        cursor-pointer 
        rounded-full 
        p-3 px-4
        duration-300 ease-in-out
        ">{{ route.label }}</NuxtLink>
      </div>
    </div>
  </div>
</template>
