<script setup>
const route = useRoute();
const slug = route.params.slug;

const fullPath = Array.isArray(slug)
  ? slug.join("/")
  : slug;

const { data: post, error } = await useAsyncData(`docs-${fullPath}`, () => {
  return $fetch(`/api/${fullPath}`); 
});

const iconColorClass = computed(() =>
  route.path === '/documentation/introduction' ? 'text-primary' : 'text-[#424242]'
);
</script>
<template>
    <DocsHeader/>
    <hr class="border border-[#858585]">
    <div v-if="post">
      <div class="grid grid-cols-12 md:min-h-screen bg-[#D9D9D9] py-10 font-archivo md:mt-20 mt-13">
        <div class="col-span-2 md:grid hidden text-left pl-9">
          <DocsSidebar/>
        </div>
        <div class="md:col-span-8 col-span-12 pl-5 pr-3 before:content-[w-10 border-l-[1px] py-2 pl-3 border-[#858585] ]">
          <div class="md:px-24 flex gap-4 items-center pb-9 text-sm text-[#424242]">
            <a href="/documentation/introduction">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-4" :class="iconColorClass">
                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
              </svg>
            </a>
            <p class="text-[#424242]"> > </p>
            <p class="text-sm text-primary">{{ post.title }}</p>
          </div>
          <ContentRenderer :value="post" class="md:prose-base prose-sm max-w-none md:px-24 prose-code:text-[#227E82] prose-pre:bg-[#B1B1B1]"/>
        </div>
        <div class="md:block hidden col-span-2">
          <h1 v-for="(item, index) in post.body?.toc?.links || []" :key="index" class="my-2">
            <a :href="'#' + item.id" class="before:content-[w-10 border-l-[1px] py-2 pl-5 text-[#4A4A4A] border-[#858585] ]">
              {{ item.text }}
            </a>
          </h1>
        </div>
      </div>
    </div>
    <div v-else class="bg-[#D9D9D9] h-screen mt-20">
      <p class="text-center py-10">Loading documentation...</p>
    </div>
  </template>
  
