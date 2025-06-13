<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 24 129"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="0"
      y="0"
      width="24"
      height="129"
      :fill="fill"
      :stroke="stroke"
      :stroke-width="strokeWidth"
    />
  </svg>
</template>

<script setup>
defineProps({
  width: {
    type: [String, Number],
    default: 24
  },
  height: {
    type: [String, Number],
    default: 129
  },
  fill: {
    type: String,
    default: 'white'
  },
  stroke: {
    type: String,
    default: 'white'
  },
  strokeWidth: {
    type: [String, Number],
    default: 0
  }
})
</script>
