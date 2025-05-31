<script setup lang="ts">
import MiniSearch from 'minisearch';
const query = ref('');
const searchInput = ref<HTMLInputElement | null>(null)
const focusSearchInput = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault() 
    searchInput.value?.focus()
  }
}
onMounted(() => {
  document.addEventListener('keydown', focusSearchInput)
})

onUnmounted(() => {
  document.removeEventListener('keydown', focusSearchInput)
})
</script>
<template>
    <div class="px-10 md:flex hidden justify-between py-4 items-center font-archivo bg-primary ">
        <h1 class="text-[25px] text-white font-extrabold tracking-wide"><span class="text-[40px] tracking-wide">TeaLinux</span> Docs</h1>  
        <div class="flex gap-4 items-center">
            <div class="flex items-center gap-2 w-full max-w-md px-4 py-2.5 bg-[#ffffff] rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
                </svg>
                <input
                type="text"
                placeholder="Search..."
                class="border-none outline-none"
                />
                <span class="text-sm text-gray-500 hidden sm:inline-block">CTRL + K</span>
            </div>
            <div class="rounded-lg p-3 bg-[#ffffff]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10" class="text-[#5C5C5C]"/></svg>
            </div>
        </div>
    </div>
</template>