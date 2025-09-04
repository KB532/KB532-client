<script setup>
const { size, variant } = defineProps({
  size: { type: String, default: 'large' }, // large | small
  variant: { type: String, default: 'default' }, // default | outline
});
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-full"
    :class="[
      size === 'large' ? 'px-4 h-8 title3' : 'px-3 h-6 caption3',
      variant === 'default' ? 'bg-[#FFEB99] text-black' : 'bg-gray-200',
    ]"
  >
    <slot />
  </span>
</template>
