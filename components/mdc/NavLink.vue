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
  <div class="w-full max-w-6xl mx-auto mt-16 flex flex-col md:flex-row  justify-between">
    <div  class="flex-1">
      <div v-if="hasPrev">
      <Card
        :title="props.prevTitle!"
        :description="props.prevDescription!"
        :href="props.prevHref!"
      >
      <template #icon >
          <div class="flex justify-start">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10 text-primary">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z" clip-rule="evenodd" />
          </svg>
          </div>
      </template>
    </Card>
    </div>
  </div>

    <div class="flex-1"></div>

    <div class="flex-1 text-right">
      <div v-if="hasNext">
      <Card
        :title="props.nextTitle!"
        :description="props.nextDescription!"
        :href="props.nextHref!"
      >
        <template #icon >
          <div class="flex justify-end">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-10 text-primary">
            <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm4.28 10.28a.75.75 0 0 0 0-1.06l-3-3a.75.75 0 1 0-1.06 1.06l1.72 1.72H8.25a.75.75 0 0 0 0 1.5h5.69l-1.72 1.72a.75.75 0 1 0 1.06 1.06l3-3Z" clip-rule="evenodd" />
            </svg>
          </div>
        </template>
    </Card>
    </div>
  </div>
  </div>
</template>
