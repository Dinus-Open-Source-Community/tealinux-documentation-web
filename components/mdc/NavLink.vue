<script setup lang="ts">
import { computed } from "vue";
import Card from "./Card.vue";

interface NavCardData {
  title?: string;
  description?: string;
  href?: string;
}

const props = defineProps<{
  prevTitle?: string;
  prevDescription?: string;
  prevHref?: string;
  nextTitle?: string;
  nextDescription?: string;
  nextHref?: string;
}>();

const prev: NavCardData = {
  title: props.prevTitle,
  description: props.prevDescription,
  href: props.prevHref,
};

const next: NavCardData = {
  title: props.nextTitle,
  description: props.nextDescription,
  href: props.nextHref,
};

const hasPrev = computed(() => !!prev.title && !!prev.href);
const hasNext = computed(() => !!next.title && !!next.href);
</script>

<template>
  <div
    class="w-full max-w-6xl mx-auto mt-16 flex flex-col md:flex-row justify-between gap-6"
  >
    <div v-if="hasPrev" class="flex-1">
      <Card
        :title="prev.title!"
        :description="prev.description || ''"
        :href="prev.href!"
      />
    </div>
    <div
      v-if="hasNext"
      class="flex-1"
      :class="{ 'text-right': hasPrev && hasNext }"
    >
      <Card
        :title="next.title!"
        :description="next.description || ''"
        :href="next.href!"
      />
    </div>
  </div>
</template>
