<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch, h, resolveComponent, toValue } from 'vue';
import MiniSearch from 'minisearch';

interface SearchItem {
  id: string;
  title: string;
  content: string;
}

interface NavigationItem {
  path: string;
  title: string;
  children?: NavigationItem[];
}

interface NavigationItemProps {
  item: NavigationItem;
  level?: number;
}

// Search functionality
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

const { data } = await useAsyncData('search', () => $fetch<SearchItem[]>('/api/search'));

if (data.value) {
  miniSearch.addAll(toValue(data.value));
}

// Navigation functionality
const {
  data: rawNavigation,
  pending: navPending,
  error: navError,
} = await useAsyncData<NavigationItem[]>("docs-navigation", () => {
  return queryCollectionNavigation("documentation")
});

const getNavigationItems = (items: NavigationItem[] | null): NavigationItem[] => {
  if (!items || items.length === 0) return [];

  const firstItem = items[0];
  if (
    firstItem &&
    firstItem.children &&
    firstItem.children.length > 0 &&
    (firstItem.title === "documentation" ||
      firstItem.path.includes("documentation"))
  ) {
    return firstItem.children;
  }

  return items;
};

const navigation = computed(() => {
  if (!rawNavigation.value) return null;
  return getNavigationItems(rawNavigation.value);
});

const expandedItems = ref(new Set<string>());
const isMobileMenuOpen = ref(false);
const isMobile = ref(false);

const toggleExpanded = (path: string) => {
  if (expandedItems.value.has(path)) {
    expandedItems.value.delete(path);
  } else {
    expandedItems.value.add(path);
  }
};

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const checkIfMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

// Common handlers
const handleResultClick = () => {
  query.value = '';
  isModalOpen.value = false;
  isMobileMenuOpen.value = false;
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

const handleModalClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
};

const result = computed(() => query.value ? miniSearch.search(toValue(query.value)) : []);

watch(() => route.fullPath, () => {
  query.value = '';
  isModalOpen.value = false;
  isMobileMenuOpen.value = false;
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
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
  document.addEventListener('keydown', focusSearchInput);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIfMobile);
  document.removeEventListener('keydown', focusSearchInput);
});

const NavigationItem = (props: NavigationItemProps) => {
  const { item, level = 0 } = props;
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.value.has(item.path);

  return h(
    "li",
    {
      class: "text-[#424242] my-2 font-archivo font-[500]",
      style: { marginLeft: `${level * 16}px` },
    },
    [
      h("div", { class: "flex items-center" }, [
        hasChildren
          ? h(
              "span",
              {
                class:
                  "flex-1 text-[18px] cursor-pointer hover:bg-[#bab8b3] hover:text-primary rounded-lg pl-3 transition-colors",
                onClick: () => toggleExpanded(item.path),
              },
              item.title
            )
          : h(
              resolveComponent("NuxtLink"),
              {
                to: item.path,
                class: "flex-1 hover:text-primary hover:bg-[#bab8b3] rounded-lg pl-3 mr-2 transition-colors",
                onClick: () => isMobile.value && toggleMobileMenu(),
              },
              item.title
            ),

        hasChildren &&
          h(
            "button",
            {
              onClick: () => toggleExpanded(item.path),
              class: [
                "ml-2 text-gray-500 hover:text-gray-700 transition-transform duration-200",
                { "rotate-90": isExpanded },
              ],
            },
          ),
      ]),

      hasChildren &&
        isExpanded &&
        h(
          "ul",
          {
            class: "ml-4 mt-2 border-l-2 border-gray-200 pl-4",
          },
          item.children?.map((child: NavigationItem) =>
            h(NavigationItem, {
              item: child,
              level: level + 1,
              key: child.path,
            })
          )
        ),
    ]
  );
};
</script>

<template>
  <!-- Header with better spacing and alignment -->
  <div class="px-6 md:px-10 py-3 md:py-4 bg-primary fixed top-0 left-0 right-0 w-full z-[9997] h-50px shadow-md">
    <div class="flex items-center justify-between max-w-[1400px] mx-auto">
      <!-- Logo Section -->
      <NuxtLink to="/" class="flex items-center">
        <h1 class="font-archivo font-extrabold">
          <span class="text-white text-2xl md:text-4xl tracking-wide">TeaLinux</span>
          <span class="text-white text-base md:text-3xl ml-1">Docs</span>
        </h1>
      </NuxtLink>

      <!-- Desktop Right Section -->
      <div class="hidden md:flex items-center gap-3">
        <!-- Search Button -->
        <button
          @click="openModal"
          class="flex items-center gap-3 px-4 py-2 bg-white/95 rounded-full hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md min-w-[280px]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500 flex-shrink-0">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <span class="text-gray-500 flex-1 text-left text-sm">Search...</span>
          <kbd class="hidden lg:inline-flex items-center gap-1 px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs text-gray-600 font-medium">
            <span>⌘</span>
            <span>K</span>
          </kbd>
        </button>

        <!-- Theme Toggle Button -->
        <button class="p-2.5 bg-white/95 rounded-full hover:bg-white transition-all duration-200 shadow-sm hover:shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-600">
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Right Section -->
      <div class="flex md:hidden items-center gap-3">
        <button
          @click="openModal"
          class="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Open search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </button>

        <button
          @click="toggleMobileMenu"
          class="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
          aria-label="Toggle navigation menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Menu Overlay -->
  <Transition name="mobile-menu">
    <div
      v-if="isMobileMenuOpen && isMobile"
      class="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden"
      @click="toggleMobileMenu"
    ></div>
  </Transition>

  <!-- Mobile Menu Sidebar -->
  <Transition name="mobile-menu-content">
    <div
      v-if="isMobileMenuOpen && isMobile"
      class="fixed top-0 left-0 h-full w-72 bg-white z-[9999] shadow-2xl md:hidden overflow-y-auto"
    >
      <div class="p-5 border-b border-gray-200 bg-primary">
        <h2 class="text-xl font-bold text-white font-archivo">TeaLinux Docs</h2>
      </div>
      <div class="p-4">
        <div v-if="navError" class="text-red-500 text-sm">
          Error loading navigation
        </div>

        <div v-else-if="navPending" class="text-gray-500 text-sm">Loading...</div>

        <nav v-else-if="navigation && navigation.length > 0">
          <ul class="space-y-1">
            <NavigationItem
              v-for="item in navigation"
              :key="item.path"
              :item="item"
              :level="0"
            />
          </ul>
        </nav>

        <div v-else class="text-gray-500 text-sm">No navigation items</div>
      </div>
    </div>
  </Transition>

  <!-- Search Modal -->
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
        @click="handleModalClick"
      >
        <div class="w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
          <!-- Search Input -->
          <div class="flex items-center gap-3 p-4 md:p-6 border-b border-gray-200 flex-shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400 flex-shrink-0">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </svg>
            <input
              ref="searchInput"
              v-model="query"
              type="text"
              placeholder="Search documentation..."
              class="flex-1 text-base md:text-lg border-none text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-0 bg-transparent"
              @keydown.esc="closeModal"
            />
            <button
              @click="closeModal"
              class="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
              aria-label="Close search"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-500">
                <path d="m18 6-12 12"></path>
                <path d="m6 6 12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Search Results -->
          <div class="flex-1 overflow-y-auto">
            <div v-if="query && result.length > 0" class="p-4 space-y-2">
              <div
                v-for="link of result"
                :key="link.id"
                class="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-200 border border-transparent hover:border-gray-200 cursor-pointer"
              >
                <NuxtLink :to="link.id" class="block" @click="handleResultClick">
                  <h3 class="text-base md:text-lg font-semibold text-primary hover:text-primary/80 transition-colors">
                    {{ link.title }}
                  </h3>
                  <p class="mt-2 text-sm text-gray-600 line-clamp-2">
                    {{ link.content }}
                  </p>
                </NuxtLink>
              </div>
            </div>

            <div v-else-if="query && result.length === 0" class="p-8 md:p-12 text-center text-gray-500">
              <div class="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-gray-300">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <p class="text-lg font-medium text-gray-700">No results found</p>
              <p class="text-sm mt-1">Try different keywords</p>
            </div>

            <div v-else class="p-8 md:p-12 text-center text-gray-500">
              <div class="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="mx-auto text-gray-300">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <p class="text-lg font-medium text-gray-700">Search TeaLinux Docs</p>
              <p class="text-sm mt-1">Start typing to find documentation</p>
            </div>
          </div>

          <!-- Modal Footer -->
          <div class="px-4 md:px-6 py-3 bg-gray-50 border-t border-gray-200 flex-shrink-0">
            <div class="flex items-center justify-between text-xs md:text-sm text-gray-500">
              <div class="flex items-center gap-1">
                <kbd class="px-2 py-1 bg-white border border-gray-300 rounded text-xs">ESC</kbd>
                <span>to close</span>
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

.modal-enter-from > div,
.modal-leave-to > div {
  transform: scale(0.95) translateY(-20px);
}

.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: opacity 0.3s ease;
}

.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
}

.mobile-menu-content-enter-active, .mobile-menu-content-leave-active {
  transition: transform 0.3s ease;
}

.mobile-menu-content-enter-from, .mobile-menu-content-leave-to {
  transform: translateX(-100%);
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.4);
}

kbd {
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace;
  font-weight: 500;
}
</style>