<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue';
import MiniSearch from 'minisearch';


interface SearchItem {
  id: string;
  title: string;
  content: string;
}

const query = ref('');
const isModalOpen = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);
const route = useRoute();
const miniSearch = new MiniSearch<SearchItem>({
  fields: ['title'],
  storeFields: ['title', 'content'],
  searchOptions: {
    prefix: true,
    fuzzy: 0.2,
  },
});

const { data } = await useAsyncData('search', () => $fetch('/api/search'));

if (data.value) {
  miniSearch.addAll(toValue(data.value));
}

const handleResultClick = () => {
  query.value = ''; 
  isModalOpen.value = false;
};

const openModal = () => {
  isModalOpen.value = true;
  nextTick(() => {
    searchInput.value?.focus();
  });
};

const closeModal = () => {
  isModalOpen.value = false;
  query.value = '';
};

// Close modal when clicking outside
const handleModalClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

const result = computed(() => query.value ? miniSearch.search(toValue(query.value)) : []);

watch(() => route.fullPath, () => {
  query.value = '';
  isModalOpen.value = false;
});

const focusSearchInput = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault(); 
    openModal();
  }
  if (event.key === 'Escape' && isModalOpen.value) {
    closeModal();
  }
};

onMounted(() => {
  document.addEventListener('keydown', focusSearchInput);
});

onUnmounted(() => {
  document.removeEventListener('keydown', focusSearchInput);
});
</script>

<template>
  <div class="px-10 md:flex justify-between md:py-4 py-2 items-center font-archivo z-99 bg-primary fixed w-full">
    <h1 class="text-[25px] text-white font-extrabold tracking-wide flex items-center justify-between">
      <div>
      <span class="md:text-[40px] text-xl tracking-wide">TeaLinux</span><span class="text-[17px] md:text-[30px]"> Docs</span>
      </div>
      <svg @click="openModal" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white md:hidden inline-block cursor-pointer">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
    </h1>  
    
    <div class="md:flex hidden gap-4 items-center">
      <button 
        @click="openModal"
        class="flex items-center gap-2 w-full max-w-md px-4 py-2.5 bg-[#ffffff] rounded-full hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <span class="text-gray-500 flex-1 text-left">Search...</span>
        <span class="text-sm text-gray-500 hidden sm:inline-block">CTRL + K</span>
      </button>
      
      <div class="rounded-lg p-3 bg-[#ffffff]">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10" class="text-[#5C5C5C]"/>
        </svg>
      </div>
    </div>
  </div>

  <Teleport to="body">
    <Transition name="modal">
      <div 
        v-if="isModalOpen" 
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        @click="handleModalClick"
      >
        <div class="w-full max-w-2xl mx-4 bg-white rounded-2xl shadow-2xl overflow-hidden animate-modal-enter flex flex-col h-[600px]">
          <div class="flex items-center gap-3 p-6 border-b border-gray-200 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 flex-shrink-0">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              ref="searchInput"
              v-model="query"
              type="text"
              placeholder="Search documentation..."
              class="flex-1 text-lg border-none outline-none bg-transparent"
              @keydown.esc="closeModal"
            />
            <button 
              @click="closeModal"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200 flex-shrink-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="m18 6-12 12"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto min-h-[200px]">
            <div v-if="query && result.length > 0" class="p-4 space-y-2">
              <div
                v-for="link of result"
                :key="link.id"
                class="p-4 rounded-xl bg-gray-50 hover:bg-[#e0dfdf] transition-all duration-200 border border-transparent hover:border-gray-200"
              >
                <NuxtLink :to="link.id" class="block">
                  <h3 
                    @click="handleResultClick" 
                    class="text-lg font-semibold text-primary hover:text-primary transition-colors duration-200"
                  >
                    {{ link.title }}
                  </h3>
                  <p 
                    @click="handleResultClick" 
                    class="mt-2 text-sm text-gray-600 line-clamp-2"
                  >
                    {{ link.content }}
                  </p>
                </NuxtLink>
              </div>
            </div>

            <div v-else-if="query && result.length === 0" class="p-8 text-center text-gray-500">
              <div class="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-gray-300">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <p class="text-lg font-medium">No results found</p>
              <p class="text-sm">Try searching with different keywords</p>
            </div>

            <div v-else class="p-8 text-center text-gray-500">
              <div class="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-gray-300">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <p class="text-lg font-medium">Search TeaLinux Docs</p>
              <p class="text-sm">Start typing to find what you're looking for</p>
            </div>
          </div>

          <div class="px-6 py-4 bg-gray-50 border-t border-gray-200 flex-shrink-0">
            <div class="flex items-center justify-between text-sm text-gray-500">
              <div class="flex items-center gap-4">
                <div class="flex items-center gap-1">
                  <kbd class="px-2 py-1 bg-white border border-gray-300 rounded text-xs">ESC</kbd>
                  <span>to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
}

.modal-enter-from .animate-modal-enter,
.modal-leave-to .animate-modal-enter {
  transform: scale(0.95) translateY(-20px);
}

.animate-modal-enter {
  animation: modalEnter 0.3s ease-out;
}

@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

/* Custom scrollbar for search results */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.3);
}


kbd {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
