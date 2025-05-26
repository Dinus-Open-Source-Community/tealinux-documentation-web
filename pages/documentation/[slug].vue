<script setup>
const slug = useRoute().params.slug;
const { data: post } = await useAsyncData(`docs-${slug}`, () => {
  return $fetch(`/api/${slug}`);
});
</script>

<template>
  <DocsHeader />
  <hr class="border border-[#858585]" />
  <div class="grid grid-cols-12 md:min-h-screen bg-[#D9D9D9] py-10">
    <div class="col-span-2 md:grid hidden text-center"><DocsSidebar /></div>
    <div
      class="md:col-span-8 col-span-12 pl-5 pr-3 before:content-[w-10 border-l-2 py-2 pl-3 border-[#858585] ]"
    >
      <ContentRenderer
        :value="post"
        class="md:prose-base prose-sm max-w-none prose-code:text-[#227E82] prose-pre:bg-[#B1B1B1]"
      />
      <!-- <MDCslot
        :value="post.body"
        tag="article"
        class="md:prose-base prose-sm max-w-none prose-code:text-[#227E82] prose-pre:bg-[#B1B1B1]"
      /> -->
    </div>
    <div class="md:block hidden col-span-2">
      <h1
        v-for="(item, index) in post.body.toc.links"
        :key="index"
        class="my-2"
      >
        <a
          class="before:content-[w-10 border-l-2 py-2 pl-3 border-[#858585] ]"
          href="#"
          +item.id
          >{{ item.text }}</a
        >
      </h1>
    </div>
  </div>
</template>
