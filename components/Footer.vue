<template>
  <div :class="['bg-green-1 h-[497px] flex items-center justify-center', customClass]">
    <div class="h-[367px] flex gap-x-[79px] items-center">
      <NuxtImg src="/image/logo_footer.svg" class="w-[244px] h-[267px]" />

      <div class="space-y-8 max-w-[376px]">
        <h1 class="font-semibold text-white text-[63px]">TeaLinux OS</h1>
        <p class="text-justify text-white">
          TeaLinuxOS adalah distro Linux turunan Ubuntu yang dikembangkan oleh Dinus Open Source Community (DOSCOM)
          dan kawan-kawan yang berorientasi pemrograman. Dengan menghadirkan filosofi, “Nikmatnya sebuah racikan”,
          TeaLinuxOS dikembangkan secara terbuka dan bersama-sama untuk menghasilkan distro Linux pemrograman untuk
          dunia pendidikan.
        </p>
      </div>

      <div class="grid grid-cols-2 gap-[100px]">
        <div v-for="i in 4" :key="i" class="col-span-1 flex gap-x-3.5 items-center text-white">
          <NuxtImg src="/image/instagram.svg" class="w-[88px] h-[88px]" />
          <h3 class="font-semibold text-4xl">@Doscomedia</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  customClass: {
    type: String,
    default: ''
  }
})
</script>
