<script setup>
import pattern from '/img/patten-download.png';

useHead({
  title: 'Downloads - TeaLinux',
  meta: [
    { name: 'description', content: 'Download TeaLinux COSMIC and Plasma editions - Modern Linux desktop distributions' }
  ]
})
</script>
<template>
    <div class="bg-cover" :style="{ backgroundImage: `url('${pattern}')` }">
        <h1 class="before:content-[w-10 border-l-[10px] py-2 pl-3 border-[#858585] ]">Downloads</h1>
        <div class="flex md:flex-row flex-col h-screen w-full justify-center items-center gap-20">
            <UiDownloadCardTemplate image="/img/download-bg1.png" title="COSMIC EDITION" slug="cosmic-editon"/>
            <UiDownloadCardTemplate image="/img/download-bg1.png" title="PLASMA EDITION" slug="plasma-edition"/>
        </div>
    </div>
</template>
<style>
</style>