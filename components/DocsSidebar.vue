<script setup>
const {data:post} = await useAsyncData('docs', () => {
    return $fetch('/api/navigation')
})

</script>
<template>
    <div>
        <ul>
            <li v-for="(item, index) in post" :key="index" class="text-[#424242] my-2">
                <NuxtLink :to="item.path">{{ item.title }}</NuxtLink>
            </li>
        </ul>
    </div>
</template>