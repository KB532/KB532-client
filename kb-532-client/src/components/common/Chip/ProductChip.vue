<!-- src/components/common/Chip/BaseChip.vue -->
<script setup>
import { computed } from 'vue'

// slot 사용 + kb-gray 테마
const { variant, color } = defineProps({
  variant: { type: String, default: 'solid' },  // 'solid' | 'outline'
  color: { type: String, default: 'kb-gray' }, 
})

const colorClass = computed(() => {
  // kb-gray 테마 (커스텀 컬러 전제: bg-kb-gray, text-kb-gray, border-kb-gray)
  if (color === 'kb-gray') {
    return variant === 'solid'
      ? 'bg-kb-gray text-white border border-kb-gray'
      : 'bg-white text-kb-gray border-2 border-kb-gray'
  }
  // fallback
  return variant === 'solid'
    ? 'bg-gray-800 text-white border border-gray-800'
    : 'bg-white text-gray-800 border-2 border-gray-800'
})
</script>

<template>
  <span
    class="inline-flex items-center justify-center rounded-full caption3 whitespace-nowrap leading-none"
    :class="[colorClass]"
  >
    <slot />
  </span>
</template>
