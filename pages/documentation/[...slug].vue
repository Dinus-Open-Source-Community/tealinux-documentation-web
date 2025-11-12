<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watchEffect } from "vue";

const route = useRoute();
const slug = route.params.slug;
const fullPath = Array.isArray(slug) ? slug.join("/") : slug;

const { data: post, error } = await useAsyncData(`docs-${fullPath}`, () => {
  return $fetch(`/api/${fullPath}`);
});

// Breadcrumb computation
const breadcrumb = computed(() => {
  if (!post.value?.path) return "";

  const pathParts = post.value.path.replace(/^\//, "").split("/");
  
  if (pathParts[0] === "documentation") {
    pathParts.shift();
  }

  return pathParts.map((part) => part.replace(/-/g, " ")).join(" > ");
});

// Table of Contents Active State
const activeId = ref(null);
const observer = ref(null);

onMounted(() => {
  watchEffect(() => {
    if (observer.value) {
      observer.value.disconnect();
    }

    if (!post.value) return;

    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0,
    };

    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id;
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(
      ".prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6"
    );
    elements.forEach((el) => observer.value.observe(el));
  });
});

onBeforeUnmount(() => {
  if (observer.value) {
    observer.value.disconnect();
  }
});
</script>

<template>
  <DocsHeader />
  
  <div v-if="post" class="min-h-screen bg-[#D9D9D9] pt-20 md:pt-24">
    <div class="max-w-[1600px] mx-auto">
      <div class="grid grid-cols-12 gap-6 px-4 md:px-6 py-8">
        <!-- Sidebar Navigation (Desktop) -->
        <aside class="hidden md:block col-span-2">
          <div class="sticky top-24">
            <DocsSidebar />
          </div>
        </aside>

        <!-- Main Content -->
        <main class="col-span-12 md:col-span-8">
          <div class="rounded-lg">
            <!-- Breadcrumb -->
            <div class="px-6 md:px-12 py-4 border-b border-gray-400">
              <nav class="flex items-center gap-2 text-sm">
                <NuxtLink to="/" class="text-gray-500 hover:text-primary transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-4 h-4"
                  >
                    <path
                      d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z"
                    />
                    <path
                      d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z"
                    />
                  </svg>
                </NuxtLink>
                <span class="text-gray-400">/</span>
                <span class="text-primary font-medium">{{ breadcrumb }}</span>
              </nav>
            </div>

            <!-- Content -->
            <article class="px-6 md:px-12 py-8">
              <ContentRenderer
                :value="post"
                class="prose prose-sm md:prose-base lg:prose-lg max-w-none
                       prose-headings:font-archivo prose-headings:font-bold prose-headings:text-gray-900
                       prose-p:text-gray-700 prose-p:leading-relaxed
                       prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                       prose-code:text-primary prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm prose-code:before:content-none prose-code:after:content-none
                       prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:border prose-pre:border-gray-700
                       prose-ul:list-disc prose-ol:list-decimal
                       prose-li:text-gray-700 prose-li:marker:text-primary
                       prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-gray-50 prose-blockquote:italic
                       prose-img:rounded-lg prose-img:shadow-md
                       prose-table:border prose-table:border-gray-300
                       prose-th:bg-gray-100 prose-th:font-semibold
                       prose-td:border prose-td:border-gray-300"
              />
            </article>
          </div>
        </main>

        <!-- Table of Contents (Desktop) -->
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
                    'block text-sm transition-colors duration-200 py-1',
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

  <!-- Loading State -->
  <div v-else class="min-h-screen bg-[#D9D9D9] pt-20 md:pt-24 flex items-center justify-center">
    <div class="text-center">
      <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4"></div>
      <p class="text-gray-600 font-medium">Loading documentation...</p>
    </div>
  </div>
</template>

<style scoped>
/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar for TOC */
.toc-content::-webkit-scrollbar {
  width: 4px;
}

.toc-content::-webkit-scrollbar-track {
  background: transparent;
}

.toc-content::-webkit-scrollbar-thumb {
  background: #cbd5e0;
  border-radius: 2px;
}

.toc-content::-webkit-scrollbar-thumb:hover {
  background: #a0aec0;
}

/* Ensure proper spacing for nested TOC items */
.toc-content a {
  display: block;
  transition: all 0.2s ease;
}

/* Loading animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>