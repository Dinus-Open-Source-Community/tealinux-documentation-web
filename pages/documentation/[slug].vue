<script setup>
const slug = useRoute().params.slug
const { data: post } = await useAsyncData(`docs-${slug}`, () => {
  return $fetch(`/api/${slug}`)
})

const copyToClipboard = async (code) => {
  try {
    await navigator.clipboard.writeText(code)
    console.log('Code copied to clipboard')
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}

onMounted(() => {
  const codeBlocks = document.querySelectorAll('pre code')
  
  codeBlocks.forEach((codeBlock) => {
    const container = document.createElement('div')
    container.style.position = 'relative'
    
    const copyButton = document.createElement('button')
    copyButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
      </svg>
    `
    copyButton.className = 'absolute  -top-13 -right-5 transition-colors'
    
    copyButton.addEventListener('click', () => {
      copyToClipboard(codeBlock.textContent)
      copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      `
      setTimeout(() => {
        copyButton.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
        `
      }, 2000)
    })
    
    // Wrap the code block in the container and add the button
    codeBlock.parentNode.replaceChild(container, codeBlock)
    container.appendChild(codeBlock)
    container.appendChild(copyButton)
  })
})
</script>

<template>
    <DocsHeader/>
    <hr class="border border-[#858585]">
    <div class="grid grid-cols-12 md:min-h-screen bg-[#D9D9D9] py-10">
        <div class="col-span-2 md:grid hidden text-center"><DocsSidebar/></div>
        <div class="md:col-span-8 col-span-12 pl-5 pr-3 before:content-[w-10 border-l-2 py-2 pl-3 border-[#858585] ]">
            <ContentRenderer :value="post" class="md:prose-base prose-sm max-w-none prose-code:text-[#227E82] prose-pre:bg-[#B1B1B1] prose-pre:relative"/>
        </div>
        <div class="md:block hidden col-span-2">
            <h1 v-for="(item, index) in post.body.toc.links" :key="index" class="my-2">
                <a class="before:content-[w-10 border-l-2 py-2 pl-3 border-[#858585] ]" :href="'#' + item.id">{{ item.text }}</a>
            </h1>
        </div>
    </div>
</template>

<style>
pre button {
  opacity: 1;
  transition: opacity 0.2s;
}

pre:hover button {
  opacity: 1;
}
</style>