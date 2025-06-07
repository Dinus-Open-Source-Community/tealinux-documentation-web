<script setup lang="ts">
import { computed } from "vue";
import Card from "./Card.vue";

const props = defineProps<{
  prev?: {
    title: string;
    description: string;
    href: string;
  };
  next?: {
    title: string;
    description: string;
    href: string;
  };
}>();

const isFirstPage = computed(() => !props.prev && props.next);
const isLastPage = computed(() => props.prev && !props.next);
const isMiddlePage = computed(() => props.prev && props.next);
</script>

<template>
  <div
    class="w-full max-w-6xl mx-auto mt-16 flex flex-col md:flex-row justify-between gap-6"
  >
    <div v-if="isMiddlePage || isLastPage" class="flex-1">
      <Card
        :title="props.prev!.title"
        :description="props.prev!.description"
        :href="props.prev!.href"
      />
    </div>

    <div
      v-if="isMiddlePage || isFirstPage"
      class="flex-1"
      :class="{ 'text-right': isMiddlePage }"
    >
      <Card
        :title="props.next!.title"
        :description="props.next!.description"
        :href="props.next!.href"
      />
    </div>
  </div>
</template>
