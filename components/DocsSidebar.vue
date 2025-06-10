<script setup>
const { data: post } = await useAsyncData("docs", () => {
  return $fetch("/api/navigation");
});

// Track expanded/collapsed state for each item
const expandedItems = ref(new Set());

const toggleExpanded = (index) => {
  if (expandedItems.value.has(index)) {
    expandedItems.value.delete(index);
  } else {
    expandedItems.value.add(index);
  }
};

// Debug: Let's see what the data looks like
watchEffect(() => {
  console.log('Navigation data:', post.value);
});
</script>

<template>
  <div>
    <!-- Debug info -->
    <div v-if="!post" class="text-red-500">Loading...</div>
    <div v-else class="text-blue-500 mb-4">Data loaded: {{ typeof post }} - {{ Array.isArray(post) ? 'Array' : 'Object' }}</div>
    
    <!-- Handle if post is an array -->
    <ul v-if="Array.isArray(post)">
      <li
        v-for="(item, index) in post"
        :key="index"
        class="text-[#424242] my-2 font-archivo font-[500]"
      >
        <!-- Main navigation item -->
        <div class="flex items-center">
          <NuxtLink 
            v-if="item.page !== false && (!item.children || item.children.length === 0)" 
            :to="item.path"
            class="flex-1"
          >
            {{ item.title }}
          </NuxtLink>
          <span 
            v-else 
            class="flex-1 cursor-pointer"
            @click="item.children && item.children.length > 0 ? toggleExpanded('array-' + index) : null"
          >
            {{ item.title }}
          </span>
          
          <!-- Toggle button for items with children -->
          <button
            v-if="item.children && item.children.length > 0"
            @click="toggleExpanded('array-' + index)"
            class="ml-2 text-gray-500 hover:text-gray-700 transition-transform duration-200"
            :class="{ 'rotate-90': expandedItems.has('array-' + index) }"
          >
            ▶
          </button>
        </div>

        <!-- Sub-navigation (children) -->
        <ul 
          v-if="item.children && item.children.length > 0 && expandedItems.has('array-' + index)"
          class="ml-4 mt-2 border-l-2 border-gray-200 pl-4"
        >
          <li
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            class="text-[#424242] my-1 font-archivo font-[400] text-sm"
          >
            <NuxtLink 
              v-if="child.page !== false"
              :to="child.path"
              class="block hover:text-blue-600 transition-colors"
            >
              {{ child.title }}
            </NuxtLink>
            <span v-else class="block text-gray-600">
              {{ child.title }}
            </span>
          </li>
        </ul>
      </li>
    </ul>
    
    <!-- Handle if post is an object with children -->
    <ul v-else-if="post && post.children">
      <li
        v-for="(item, index) in post.children"
        :key="index"
        class="text-[#424242] my-2 font-archivo font-[500]"
      >
        <!-- Main navigation item -->
        <div class="flex items-center">
          <NuxtLink 
            v-if="item.page !== false && (!item.children || item.children.length === 0)" 
            :to="item.path"
            class="flex-1"
          >
            {{ item.title }}
          </NuxtLink>
          <span 
            v-else 
            class="flex-1 cursor-pointer"
            @click="item.children && item.children.length > 0 ? toggleExpanded('obj-' + index) : null"
          >
            {{ item.title }}
          </span>
          
          <!-- Toggle button for items with children -->
          <button
            v-if="item.children && item.children.length > 0"
            @click="toggleExpanded('obj-' + index)"
            class="ml-2 text-gray-500 hover:text-gray-700 transition-transform duration-200"
            :class="{ 'rotate-90': expandedItems.has('obj-' + index) }"
          >
            ▶
          </button>
        </div>

        <!-- Sub-navigation (children) -->
        <ul 
          v-if="item.children && item.children.length > 0 && expandedItems.has('obj-' + index)"
          class="ml-4 mt-2 border-l-2 border-gray-200 pl-4"
        >
          <li
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            class="text-[#424242] my-1 font-archivo font-[400] text-sm"
          >
            <NuxtLink 
              v-if="child.page !== false"
              :to="child.path"
              class="block hover:text-blue-600 transition-colors"
            >
              {{ child.title }}
            </NuxtLink>
            <span v-else class="block text-gray-600">
              {{ child.title }}
            </span>
          </li>
        </ul>
      </li>
    </ul>
    
    <!-- Fallback: show raw data structure for debugging -->
    <div v-else class="text-gray-600">
      <p>Debug - Raw data:</p>
      <pre class="text-xs bg-gray-100 p-2 rounded">{{ JSON.stringify(post, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
</style>