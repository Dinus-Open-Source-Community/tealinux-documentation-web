<template>
  <button
    @click="props.onClick"
    :class="[
      'p-3 rounded-full w-fit h-fit cursor-pointer',
      bgClass,
      props.class
    ]"
    aria-label="Previous Slide"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :class="['lucide lucide-arrow-left-icon lucide-arrow-left stroke-[4px]', strokeClass]"
    >
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  onClick?: () => void
  theme?: 'green' | 'white'
  class?: string
}>();

// default ke 'green' jika tidak diset
const theme = computed(() => props.theme ?? 'green');

const bgClass = computed(() =>
  theme.value === 'green' ? 'bg-white' : 'bg-green-1'
);

const strokeClass = computed(() =>
  theme.value === 'green' ? 'stroke-green-1' : 'stroke-white'
);
</script>