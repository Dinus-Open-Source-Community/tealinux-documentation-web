<script setup lang="ts">
import { computed } from "vue";
import Card from "./Card.vue";

const props = defineProps<{
  prevTitle?: string;
  prevDescription?: string;
  prevHref?: string;
  nextTitle?: string;
  nextDescription?: string;
  nextHref?: string;
}>();

const hasPrev = computed(() => props.prevTitle && props.prevHref);
const hasNext = computed(() => props.nextTitle && props.nextHref);
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-16 flex justify-between">
    <div v-if="hasPrev" class="flex-1">
      <Card
        :title="props.prevTitle!"
        :description="props.prevDescription!"
        :href="props.prevHref!"
      />
    </div>

    <div v-if="!hasPrev && hasNext" class="flex-1"></div>

    <div v-if="hasNext" class="flex-1 text-right">
      <Card
        :title="props.nextTitle!"
        :description="props.nextDescription!"
        :href="props.nextHref!"
      />
    </div>
  </div>
</template>
