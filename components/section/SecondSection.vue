<script setup lang="ts">
import { NuxtImg } from '#components'

</script>

<template>
  <div class="bg-green-1 flex justify-center items-center py-[10%] h-screen px-[8%] gap-[5%]">
    <div class="flex flex-col md:justify-start justify-center items-center md:items-start w-full lg:max-w-[627px] lg:gap-y-10 md:gap-y-6 gap-y-2 lg:gap-0 h-full mr-auto">
      <div class=" md:border-l-[16px] border-white md:pl-4 mx-auto md:mx-0">
        <h1 class="font-extralight text-white text-[20px] md:text-[28px] lg:text-[36px] text-center md:text-left">
          Apa itu
        </h1>
        <NuxtImg src="/image/white_tealinux.svg" class="w-[140px] lg:w-[180px]" />
      </div>

      <p class="text-white text-[18px] lg:text-[22px]
             text-justify leading-relaxed mt-6 lg:mt-auto
             w-full lg:w-fit      
      ">
        TeaLinuxOS adalah distro Linux turunan Ubuntu yang dikembangkan oleh Dinus Open Source Community (DOSCOM) dan kawan-kawan, berorientasi pemrograman. Mengusung filosofi “Nikmatnya sebuah racikan”, TeaLinuxOS dikembangkan terbuka dan kolaboratif untuk menghadirkan distro pemrograman bagi dunia pendidikan
      </p>
    </div>

    <NuxtImg src="/image/logo_big2.svg" alt="" class="mx-auto lg:mx-0 lg:w-[484px] md:w-[384px] w-[284px] md:block hidden object-contain" />
  </div>
</template>