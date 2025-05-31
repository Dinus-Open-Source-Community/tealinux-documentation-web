<template>
  <div
    :class="['h-[575px] bg-[url(/public/image/bg_from_doscom_to_everyone.svg)] bg-cover text-center flex items-center justify-center shadow-2xl', customClass]">
    <h1 class="text-[58px] font-medium text-black my-auto">From <span class="font-extrabold">DOSCOM</span> for <span
        class="font-extrabold">Everyone</span></h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{ customClass?: string }>()
</script>