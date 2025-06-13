<script setup lang="ts">
defineProps<{
  items: string[];
}>();
</script>

<template>
  <ol class="space-y-3">
    <li
      v-for="(item, index) in items"
      :key="index"
      class="text-body-color dark:text-dark-6 flex text-base"
    >
      <span
        class="bg-primary mr-2.5 flex h-[26px] w-full max-w-[26px] items-center justify-center rounded text-base text-white"
      >
        {{ index + 1 }}
      </span>
      {{ item }}
    </li>
  </ol>
</template>
