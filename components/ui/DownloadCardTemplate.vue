<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
    image: String,
    title: String,
    slug: String
})

const timelineData = ref([
    {
        id: 1,
        title: "Latest",
        description: "Get access to over 20+ pages including a dashboard layout, charts, kanban board, calendar, and pre-order E-commerce & Marketing pages.",
    },
    {
        id: 2,
        title: "Flexs",
        description: "All of the pages and components are first designed in Figma and we keep a parity between the two versions even as we update the project.",
    },
    {
        id: 3,
        title: "Flux",
        description: "Get started with dozens of web components and interactive elements built on top of Tailwind CSS.",
    }
])
</script>
<template>
    <div class="bg-[#016B5E] md:h-3/4 md:w-1/4 w-3/4 h-screen rounded-4xl relative overflow-hidden" style="box-shadow: 0 45px 85px -20px rgba(0, 0, 0, 0.7);">
        <div class="h-2/5 w-full rounded-t-4xl relative bg-cover bg-center"
            :style="{ backgroundImage: `url('${props.image}')` }">
            <h1 class="absolute top-0 left-0 shadow-2xl md:text-xl text-sm px-10 md:py-3 py-1 font-bold rounded-tl-4xl rounded-br-4xl text-white bg-[#016B5E]">
                {{ props.title }}
            </h1>
        </div>
        
        <div class="px-12 py-6 h-3/5 overflow-y-auto">
            <ol class="relative border-s border-gray-300">                  
                <li v-for="(item, index) in timelineData" :key="item.id" 
                    :class="index === timelineData.length - 1 ? 'ms-6' : 'mb-8 ms-6'">
                    <span class="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -start-3 ring-4 ring-white">
                        <svg class="w-3 h-3 text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                        </svg>
                    </span>
                    <div class="ml-2">
                        <h3 class="flex items-center mb-1 md:text-lg text-sm font-semibold text-white">
                            {{ item.title }}
                        </h3>
                        <p class="mb-4 md:text-base font-normal text-sm text-gray-200">
                            {{ item.description }}
                        </p>
                    </div>
                </li>
            </ol>
            <NuxtLink :to="`/download/${props.slug}`">
            <h1 class="absolute bottom-0 right-0 px-10 md:py-3 py-1 md:text-xl text-sm font-bold rounded-tl-4xl rounded-br-4xl text-primary bg-[#F8FFFE]">
                Download
            </h1>
            </NuxtLink>
        </div>
    </div>
</template>