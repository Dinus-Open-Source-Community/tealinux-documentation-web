<script setup>
import { ref, h, resolveComponent, computed } from "vue";

const {
  data: rawNavigation,
  pending,
  error,
} = await useAsyncData("docs-navigation", () => {
  return queryCollectionNavigation("documentation").where(
    "navigation",
    "!=",
    false
  );
});

const getNavigationItems = (items) => {
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

const expandedItems = ref(new Set());

const toggleExpanded = (path) => {
  if (expandedItems.value.has(path)) {
    expandedItems.value.delete(path);
  } else {
    expandedItems.value.add(path);
  }
};

const NavigationItem = (props) => {
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
          item.children.map((child) =>
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
  <div class="sticky-navigation-container">
    <!-- Error state -->
    <div v-if="error" class="text-red-500">
      Error loading navigation: {{ error }}
    </div>

    <!-- Loading state -->
    <div v-else-if="pending" class="text-gray-500">Loading navigation...</div>

    <!-- Navigation tree -->
    <nav v-else-if="navigation && navigation.length > 0" class="sticky-nav">
      <ul class="space-y-1">
        <NavigationItem
          v-for="item in navigation"
          :key="item.path"
          :item="item"
          :level="0"
        />
      </ul>
    </nav>

    <!-- No navigation found -->
    <div v-else class="text-gray-500">No navigation items found</div>
  </div>
</template>

<style scoped>
.sticky-navigation-container {
  position: relative;
}

.sticky-nav {
  position: sticky;
  top: 20px; /* Sesuaikan jarak dari atas sesuai kebutuhan */
  max-height: calc(100vh - 40px); /* Sesuaikan tinggi maksimum */
  overscroll-behavior: contain; /* Mencegah scroll mempengaruhi elemen induk */
}

/* Style untuk scrollbar (opsional) */
.sticky-nav::-webkit-scrollbar {
  width: 6px;
}

.sticky-nav::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.sticky-nav::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.sticky-nav::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
