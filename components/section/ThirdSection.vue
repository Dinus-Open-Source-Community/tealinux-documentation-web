<script setup lang="ts">
import { NuxtImg } from '#components';
import { ref, onMounted } from 'vue'
interface Feature {
  title: string
  description: string
  img: string
}
const features = ref<Feature[]>([])

onMounted(async () => {
  const res = await fetch('content/thirdsection.json')
  const json = await res.json()
  features.value = json.thirdSection
})
</script>

<template>
  <div class="h-fit bg-[url(/public/image/pattern.png)] bg-cover bg-no-repeat">
    <div class=" h-[80vh] flex justify-center items-center">
      <div class="space-y-[138px] w-[1581px]">
        <div class="flex flex-col max-w-[627px] mr-auto">
          <div class="border-l-[24px] border-l-green-1 pl-4">
            <h1 class="font-extralight text-green-1 text-[56px]">Fitur</h1>
            <NuxtImg src="/image/green_tealinux.svg" class="w-[140px] md:w-[180px] lg:w-[220px] xl:w-[290px]" />
          </div>
        </div>
        <div class="flex gap-x-[58px] items-stretch">
          <div class="bg-green-1 relative p-9 rounded-[47px] flex-1" v-for="(feature, idx) in features" :key="idx">
            <div
              class="absolute top-0 -translate-y-1/2 translate-x-[58%] rounded-full border-4 border-white p-8 bg-green-1 shadow-md">
              <NuxtImg :src="feature.img" class="w-[56px]" />
            </div>
            <div class="space-y-5 text-center mt-10">
              <h2 class="text-[28px] text-white">
                {{ feature.title }}
              </h2>
  
              <p class="text-white">
                {{ feature.description }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-screen flex justify-center items-center">
      <h1 class="text-[58px] font-medium text-green-1 my-auto tracking-widest">From <span class="font-extrabold">DOSCOM</span> for <span
        class="font-extrabold">Everyone</span></h1>
    </div>
  </div>


</template>