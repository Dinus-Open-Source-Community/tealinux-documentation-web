<template>
  <div class="relative overflow-x-auto mt-5 mb-5">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-white-700 uppercase bg-blue-50 dark:bg-[#007163] dark:text-white-400"
      >
        <tr>
          <th scope="col" class="px-6 py-3 text-white">Component</th>
          <th scope="col" class="px-6 py-3 text-white">Requirement</th>
          <th scope="col" class="px-6 py-3 text-white">Recommended</th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            CPU
          </th>
          <td class="px-6 py-4 text-white">
            64-bit x86, ARM (RAS PI 4) architectures
          </td>
          <td class="px-6 py-4 text-white"></td>
        </tr>
        <tr
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            RAM
          </th>
          <td class="px-6 py-4 text-white">4 GB</td>
          <td class="px-6 py-4 text-white">8 GB</td>
        </tr>
        <tr class="bg-white dark:bg-gray-800">
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            Laptop PC Drive Storage
          </th>
          <td class="px-6 py-4 text-white">20 GB</td>
          <td class="px-6 py-4"></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
