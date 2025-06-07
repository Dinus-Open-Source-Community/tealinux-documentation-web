<script lang="ts" setup>
const props = defineProps({
  headers: {
    type: Array as () => string[],
    required: false,
  },
  rows: {
    type: Array as () => string[][],
    required: false,
  },
});
</script>

<template>
  <div class="relative overflow-x-auto mt-5 mb-5">
    <!-- Jika pakai props -->
    <table
      v-if="props.headers && props.rows"
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-white-700 uppercase bg-blue-50 dark:bg-[#007163] dark:text-white-400"
      >
        <tr>
          <th
            v-for="(header, index) in props.headers"
            :key="index"
            scope="col"
            class="px-6 py-3 text-white"
          >
            <div class="py-1 px-3">
              {{ header }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in props.rows"
          :key="rowIndex"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
        >
          <td
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            :class="[
              'px-6 py-4 text-white',
              cellIndex === 0
                ? 'font-medium text-gray-900 whitespace-nowrap dark:text-white'
                : '',
            ]"
            scope="row"
          >
            <div class="py-1 px-2">
              {{ cell }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Jika tidak pakai props, render slot -->
    <slot v-else />
  </div>
</template>
