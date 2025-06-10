<script setup>
import { ref, h, resolveComponent, computed } from 'vue'

const { data: rawNavigation, pending, error } = await useAsyncData("docs-navigation", () => {
  return queryCollectionNavigation('documentation')
    .where('navigation', '!=', false)
    .order('title', 'ASC') 
});


const getNavigationItems = (items) => {
  if (!items || items.length === 0) return [];
  
  // If there's a top-level collection item with children, return its children
  // Otherwise return the items as-is
  const firstItem = items[0];
  if (firstItem && firstItem.children && firstItem.children.length > 0 && 
      (firstItem.title === 'documentation' || firstItem.path.includes('documentation'))) {
    return firstItem.children;
  }
  
  return items;
};

// Get navigation without the top-level collection title
const navigation = computed(() => {
  if (!rawNavigation.value) return null;
  return getNavigationItems(rawNavigation.value);
});

// Track expanded/collapsed state for each item
const expandedItems = ref(new Set());

const toggleExpanded = (path) => {
  if (expandedItems.value.has(path)) {
    expandedItems.value.delete(path);
  } else {
    expandedItems.value.add(path);
  }
};

// Recursive component for nested navigation (with dropdowns restored)
const NavigationItem = (props) => {
  const { item, level = 0 } = props;
  const hasChildren = item.children && item.children.length > 0;
  const isExpanded = expandedItems.value.has(item.path);
  
  return h('li', {
    class: 'text-[#424242] my-2 font-archivo font-[500]',
    style: { marginLeft: `${level * 16}px` }
  }, [
    // Main navigation item
    h('div', { class: 'flex items-center' }, [
      // Link or span based on whether it has children or is a page
      hasChildren ?
        h('span', {
          class: 'flex-1 cursor-pointer hover:text-blue-600 transition-colors',
          onClick: () => toggleExpanded(item.path)
        }, item.title) :
        h(resolveComponent('NuxtLink'), {
          to: item.path,
          class: 'flex-1 hover:text-blue-600 transition-colors'
        }, item.title),
      
      // Toggle button for items with children
      hasChildren && h('button', {
        onClick: () => toggleExpanded(item.path),
        class: [
          'ml-2 text-gray-500 hover:text-gray-700 transition-transform duration-200',
          { 'rotate-90': isExpanded }
        ]
      }, '▶')
    ]),
    
    // Children navigation (recursive)
    hasChildren && isExpanded && h('ul', {
      class: 'ml-4 mt-2 border-l-2 border-gray-200 pl-4'
    }, item.children.map(child =>
      h(NavigationItem, { 
        item: child, 
        level: level + 1, 
        key: child.path 
      })
    ))
  ]);
};
</script>

<template>
  <div>
    <!-- Error state -->
    <div v-if="error" class="text-red-500">
      Error loading navigation: {{ error }}
    </div>
    
    <!-- Loading state -->
    <div v-else-if="pending" class="text-gray-500">
      Loading navigation...
    </div>
    
    <!-- Navigation tree -->
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
    
    <!-- No navigation found -->
    <div v-else class="text-gray-500">
      No navigation items found
    </div>
  </div>
</template>

<style scoped>
</style>