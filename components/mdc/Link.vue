<script setup lang="ts">
import CardLink from "./CardLink.vue";
let singlelink: boolean = false;
let next: boolean = false;
let prev: boolean = false;

defineProps({
  prev: {
    type: Object as () => { title: string; description: string; href: string },
    required: false,
  },
  next: {
    type: Object as () => { title: string; description: string; href: string },
    required: false,
  },
});
</script>

<template>
  <div
    class="w-full max-w-6xl mx-auto mt-16 flex flex-col md:flex-row justify-between gap-6"
  >
    <div v-if="singlelink">
      <div v-if="prev" class="flex-1">
        <CardLink
          :title="prev.title"
          :description="prev.description"
          :href="prev.href"
        />
      </div>
      <div v-if="next" class="flex-1 text-right">
        <CardLink
          :title="next.title"
          :description="next.description"
          :href="next.href"
        />
      </div>
    </div>
    <div v-if="!singlelink"></div>
  </div>
</template>
