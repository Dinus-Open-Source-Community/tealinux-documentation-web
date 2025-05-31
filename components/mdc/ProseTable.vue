<script lang="ts" setup>
defineProps({
  headers: {
    type: Array as () => string[],
    required: true,
  },
  rows: {
    type: Array as () => string[][],
    required: true,
  },
});
</script>

<template>
  <div class="relative overflow-x-auto mt-5 mb-5">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-white-700 uppercase bg-blue-50 dark:bg-[#007163] dark:text-white-400"
      >
        <tr>
          <th
            v-for="(header, index) in headers"
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
          v-for="(row, rowIndex) in rows"
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
  </div>
</template>
