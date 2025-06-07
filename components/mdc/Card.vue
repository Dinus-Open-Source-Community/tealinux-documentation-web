<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  href: string;
}>();
</script>

<template>
  <NuxtLink
    :to="href"
    class="block max-w-sm p-6 bg-[#D9D9D9] border border-gray-200 rounded-lg shadow hover:border-[#007163] hover:bg-[#007163]transition-colors duration-200 no-underline"
  >
    <h5
      class="mb-2 text-2xl font-bold tracking-tight text-[#007163] font-archivo"
    >
      {{ title }}
    </h5>
    <p class="font-normal text-gray-700 min-h-[50px]">
      {{ description }}
    </p>
  </NuxtLink>
</template>
