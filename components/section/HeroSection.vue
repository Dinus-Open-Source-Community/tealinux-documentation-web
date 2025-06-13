<template>
  <div class="bg-green-1 h-screen">
    <div
      :class="[
        // layout wrapper
        'bg-white flex md:flex-row flex-col w-full items-center justify-center gap-4',
        'h-screen',
        // radius bawah tidak terlalu ekstrem di layar pendek
        'rounded-b-[50px] sm:rounded-b-[70px] lg:rounded-b-[80px]',
        customClass,
      ]"
    >
      <!-- logo -->
      <NuxtImg
        src="/image/logo_big.svg"
        alt="logo big"
        class="lg:w-[300px] md:w-[240px] w-[200px]"
      />

      <!-- text + buttons -->
      <div class="space-y-6 text-center lg:text-left">
        <!-- judul fluid -->
        <h1
          class="font-semibold text-green-1 leading-tight lg:text-[60px] md:text-[48px] text-[36px]"
        >
          TeaLinux <span class="font-extralight">“Celia”</span>
        </h1>

        <!-- tombol‑tombol -->
        <div
          class="flex flex-col sm:flex-row sm:items-center sm:justify-center lg:justify-start gap-4"
        >
          <NuxtLink
            to="https://pinguin.dinus.ac.id/iso/tealinuxos/TeaLinuxOS-Arch/2025/release/TeaLinuxOS-Celia-plasma.iso"
          >
            <button class="btn-primary lg:w-[230px] w-[190px] cursor-pointer">
              Download
            </button>
          </NuxtLink>

          <NuxtLink to="#">
            <button class="btn-secondary lg:w-[230px] w-[190px] cursor-pointer">
              How to install?
            </button>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ customClass?: string }>();
</script>
