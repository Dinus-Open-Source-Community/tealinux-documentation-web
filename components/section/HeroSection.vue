<template>
  <div class="bg-green-1 min-h-[600px] sm:min-h-[680px] lg:min-h-[760px] xl:min-h-[860px] 2xl:min-h-[960px]">

    <div
      :class="[
        // layout wrapper
        'bg-white flex w-full items-center justify-center gap-4',
        // tinggi adaptif
        'min-h-[600px] sm:min-h-[680px] lg:min-h-[760px] xl:min-h-[860px] 2xl:min-h-[960px]',
        // radius bawah tidak terlalu ekstrem di layar pendek
        'rounded-b-[60px] sm:rounded-b-[80px] lg:rounded-b-[100px]',
        customClass
      ]"
    >
      <!-- logo -->
      <NuxtImg
        src="/image/logo_big.svg"
        alt="logo big"
        class="w-[220px] sm:w-[300px] md:w-[340px] lg:w-[392px]"
      />
  
      <!-- text + buttons -->
      <div class="space-y-6 sm:space-y-8 text-center lg:text-left">
        <!-- judul fluid -->
        <h1
          class="font-medium text-green-1 leading-tight
                 text-[40px] sm:text-[60px] md:text-[80px] lg:text-[90px] xl:text-[100px]"
        >
          TeaLinux <span class="font-extralight">“Celia”</span>
        </h1>
  
        <!-- tombol‑tombol -->
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-4">
          <NuxtLink to="#">
            <button
              class="btn-primary w-[334px] cursor-pointer"
            >
              Download
            </button>
          </NuxtLink>
  
          <NuxtLink to="#">
            <button
              class="btn-secondary w-[334px] cursor-pointer"
            >
              How to install?
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ customClass?: string }>()
</script>

