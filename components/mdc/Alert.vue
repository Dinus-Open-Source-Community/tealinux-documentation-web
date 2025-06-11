<script lang="ts" setup>
const props = defineProps<{
  type?: "success" | "warning" | "danger";
  title?: string;
  message?: string;
}>();

const typeStyles = {
  success: {
    border: "border-green-700",
    text: "text-green-700",
    iconClass: "text-green-700",
    iconPath:
      "M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm13.707-1.293a1 1 0 0 0-1.414-1.414L11 12.586l-1.793-1.793a1 1 0 0 0-1.414 1.414l2.5 2.5a1 1 0 0 0 1.414 0l4-4Z",
  },
  warning: {
    border: "border-yellow-600",
    text: "text-yellow-700",
    iconClass: "text-yellow-600",
    iconPath:
      "M9 9a3 3 0 0 1 3-3m-2 15h4m0-3c0-4.1 4-4.9 4-9A6 6 0 1 0 6 9c0 4 4 5 4 9h4Z",
  },
  danger: {
    border: "border-red-700",
    text: "text-red-700",
    iconClass: "text-red-700",
    iconPath:
      "M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v5a1 1 0 1 0 2 0V8Zm-1 7a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H12Z",
  },
};

const currentStyle = typeStyles[props.type || "danger"];
</script>

<template>
  <div
    role="alert"
    :class="`border-s-4 bg-[#D9D9D9] p-4 rounded-xl shadow-sm ${currentStyle.border}`"
  >
    <div class="flex items-center gap-2" :class="currentStyle.text">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="size-5"
        :class="currentStyle.iconClass"
      >
        <path
          fill-rule="evenodd"
          :d="currentStyle.iconPath"
          clip-rule="evenodd"
        />
      </svg>

      <strong class="font-medium">
        {{ title || "Something went wrong" }}
      </strong>
    </div>

    <p class="mt-2 text-md" :class="currentStyle.text">
      {{
        message ||
        "An unexpected error occurred. Please try again later or contact support."
      }}
    </p>
  </div>
</template>
