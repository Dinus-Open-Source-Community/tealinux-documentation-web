<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watchEffect } from "vue";

const route = useRoute();
const slug = route.params.slug;
const fullPath = Array.isArray(slug) ? slug.join("/") : slug;

const { data: post, error } = await useAsyncData(`docs-${fullPath}`, () => {
  return $fetch(`/api/${fullPath}`);
});

// Breadcrumb
const breadcrumb = computed(() => {
  if (!post.value?.path) return "";

  const pathParts = post.value.path.replace(/^\//, "").split("/");
  
  if (pathParts[0] === "documentation") pathParts.shift();

  return pathParts.map((part) => part.replace(/-/g, " ")).join(" > ");
});

// TOC Active State
const activeId = ref(null);
const observer = ref(null);

onMounted(() => {
  watchEffect(() => {
    if (observer.value) observer.value.disconnect();
    if (!post.value) return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    };

    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) activeId.value = entry.target.id;
      });
    }, observerOptions);

    const elements = document.querySelectorAll(
      ".prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6"
    );
    elements.forEach((el) => observer.value.observe(el));
  });
});

onBeforeUnmount(() => {
  if (observer.value) observer.value.disconnect();
});
</script>

<template>
  <DocsHeader />
  
  <div v-if="post" class="min-h-screen bg-[#D9D9D9] pt-20 md:pt-24">
    <div class="max-w-[1600px] mx-auto">
      <div class="grid grid-cols-12 gap-6 px-4 md:px-6 py-8">
        
        <!-- Sidebar -->
        <aside class="hidden md:block col-span-2">
          <div class="sticky top-24">
            <DocsSidebar />
          </div>
        </aside>

        <!-- Main content -->
        <main class="col-span-12 md:col-span-8">
          <div class="rounded-lg">

            <!-- Breadcrumb -->
            <div class="px-6 md:px-12 py-4 border-b border-gray-400">
              <nav class="flex items-center gap-2 text-sm">
                <NuxtLink to="/" class="text-gray-500 hover:text-primary transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4">
                    <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"/>
                    <path d="m12 5.432 8.159 8.159v6.198A1.875 1.875 0 0 1 18.284 21H15v-4.5a.75.75 0 0 0-.75-.75h-3A.75.75 0 0 0 10.5 16.5V21H5.625A1.875 1.875 0 0 1 3.75 19.125v-6.198Z"/>
                  </svg>
                </NuxtLink>
                <span class="text-gray-400">/</span>
                <span class="text-primary font-medium">{{ breadcrumb }}</span>
              </nav>
            </div>

            <!-- Article -->
            <article class="px-6 md:px-12 py-8">
              <ContentRenderer
                :value="post"
                class="prose md:prose-base prose-sm max-w-none"
              />
            </article>
          </div>
        </main>

        <!-- TOC -->
        <aside class="hidden xl:block col-span-2">
          <div class="sticky top-24">
            <div class="bg-white rounded-lg shadow-sm p-4">
              <h3 class="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                On This Page
              </h3>
              <nav class="toc-content space-y-2">
                <a
                  v-for="(item, index) in post.body?.toc?.links || []"
                  :key="index"
                  :href="'#' + item.id"
                  :style="{ paddingLeft: `${(item.depth - 1) * 12}px` }"
                  :class="[
                    'block text-sm transition-colors py-1',
                    activeId === item.id
                      ? 'text-primary font-medium border-l-2 border-primary pl-3'
                      : 'text-gray-600 hover:text-primary border-l-2 border-transparent pl-3'
                  ]"
                >
                  {{ item.text }}
                </a>
              </nav>
            </div>
          </div>
        </aside>

      </div>
    </div>
  </div>

  <!-- ✅ Loading Baru -->
  <div v-else class="bg-[#D9D9D9] h-screen mt-20">
    <p class="text-center py-10">Loading documentation...</p>
  </div>
</template>

<style scoped>
html {
  scroll-behavior: smooth;
}

.toc-content::-webkit-scrollbar {
  width: 4px;
}
.toc-content::-webkit-scrollbar-thumb {
  background: #cbd5e0;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
