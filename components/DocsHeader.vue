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
  <div class="px-10 md:flex justify-between md:py-4 py-2 items-center font-archivo z-[9997] bg-primary fixed w-full">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-[25px] text-white font-extrabold tracking-wide flex items-center">
        <div>
          <NuxtLink to="/">
          <span class="md:text-[40px] text-xl tracking-wide">TeaLinux</span><span class="text-[17px] md:text-[30px]"> Docs</span>
          </NuxtLink>
        </div>
      </h1>

      <div class="flex items-center gap-4">
        <button
          v-if="isMobile"
          @click="toggleMobileMenu"
          class="text-white md:hidden inline-block cursor-pointer"
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

        <button
          v-if="isMobile"
          @click="openModal"
          class="text-white md:hidden inline-block cursor-pointer"
          aria-label="Open search"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
        </button>
      </div>
    </div>

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
        <span class="text-sm text-gray-500 hidden sm:inline-block w-20">CTRL + K</span>
      </button>

      <div class="rounded-lg p-3 bg-[#ffffff]">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 22c5.523 0 10-4.477 10-10c0-.463-.694-.54-.933-.143a6.5 6.5 0 1 1-8.924-8.924C12.54 2.693 12.463 2 12 2C6.477 2 2 6.477 2 12s4.477 10 10 10" class="text-[#5C5C5C]"/>
        </svg>
      </div>
    </div>
  </div>

  <Transition name="mobile-menu">
    <div
      v-if="isMobileMenuOpen && isMobile"
      class="fixed inset-0 z-[9998] bg-black/50 backdrop-blur-sm md:hidden"
      @click="toggleMobileMenu"
    ></div>
  </Transition>

  <Transition name="mobile-menu-content">
    <div
      v-if="isMobileMenuOpen && isMobile"
      class="fixed top-0 left-0 h-full w-64 bg-white z-[9999] shadow-xl md:hidden overflow-y-auto"
    >
      <div class="p-4 border-b border-gray-200">
        <h2 class="text-lg font-semibold">TeaLinux Docs</h2>
      </div>
      <div class="p-4">
        <div v-if="navError" class="text-red-500">
          Error loading navigation: {{ navError }}
        </div>

        <div v-else-if="navPending" class="text-gray-500">Loading navigation...</div>

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

        <div v-else class="text-gray-500">No navigation items found</div>
      </div>
    </div>
  </Transition>

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
              class="flex-1 text-lg border-none text-gray-600 focus:outline-none focus:ring-0 bg-transparent"
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

/* Mobile menu transitions */
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

/* Custom scrollbar */
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