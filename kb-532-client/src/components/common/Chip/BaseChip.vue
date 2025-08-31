<script setup>
const { size, variant } = defineProps({
  size: { type: String, default: 'large' },     // large | small
  variant: { type: String, default: 'default' } // default | outline
})
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-full font-bold"
    :class="[
      size === 'large' ? 'px-4 h-8 text-sm' : 'px-3 h-7 text-xs',
      variant === 'default'
        ? 'bg-[#FFEB99] text-black'
        : 'border border-gray-300 bg-white text-gray-700'
    ]"
  >
    <slot />
  </span>
</template>
