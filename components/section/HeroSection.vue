<template>
  <div :class="['bg-white rounded-b-[100px] border-2 flex w-full items-center h-[960px] justify-center gap-1', customClass]">
    <NuxtImg src="/image/logo_big.svg" alt="logo big" class="w-[392px]"/>
    
    <div class="space-y-8">
      <h1 class="text-green-1 font-medium text-[100px]">
        TeaLinux <span class="font-extralight">“Celia”</span>
      </h1>

      <NuxtLink to="#" class="mr-6">
        <button
          class="bg-green-1 text-3xl font-medium rounded-2xl w-[334px] py-4
                 hover:underline duration-200 ease-in-out cursor-pointer text-white">
          Download
        </button>
      </NuxtLink>

      <NuxtLink to="#">
        <button
          class="bg-white text-3xl font-medium text-green-1 border-[3px] border-green-1
                 rounded-2xl w-[334px] py-4 hover:underline duration-200 ease-in-out cursor-pointer">
          How to install?
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  customClass: {
    type: String,
    default: ''
  }
})
</script>
