<!-- components/Card.vue -->
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
    class="block w-full max-w-2xl mx-auto p-6 no-underline hover:scale-[1.01] transition-transform"
  >
    <div
      class="bg-slate-900 rounded-2xl p-8 border border-slate-800 hover:border-green-500"
    >
      <div class="flex items-start gap-6">
        <div class="flex-shrink-0">
          <div
            class="w-12 h-12 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5 text-green-400 fill-green-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div class="flex-1">
          <h2 class="text-2xl font-semibold text-white mb-4">{{ title }}</h2>
          <p class="text-slate-400 text-lg leading-relaxed">
            {{ description }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>
