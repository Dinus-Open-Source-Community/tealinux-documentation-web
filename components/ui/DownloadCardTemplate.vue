<script setup>
const props = defineProps({
    image: String
})
</script>
<template>
    <div class="bg-[#016B5E] md:h-3/4 md:w-2/6 w-3/4 h-screen rounded-4xl relative">
        <div class="h-2/5 w-full rounded-t-4xl relative bg-cover bg-center" :style="{backgroundImage: `url('${props.image}')`}">
            <h1 class="absolute top-0 left-0 px-10 py-2 rounded-tl-4xl rounded-br-4xl text-white bg-[#016B5E]">Cosmic Edition</h1>
        </div>
    </div>
</template>