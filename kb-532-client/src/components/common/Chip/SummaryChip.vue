<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  // 'success' | 'warning' | 'recommend'
  kind: {
    type: String,
    default: 'success',
    validator: v => ['success', 'warning', 'recommend'].includes(v),
  },
  // 'md' | 'sm'  
  size: {
    type: String,
    default: 'md',
    validator: v => ['md', 'sm'].includes(v),
  },
  label: { type: String, default: '' },
})

const KIND = {
  success: {
    label: '성과',
    icon: 'bxs:party',
    bg: '#EAF9E9',
    fg: '#16A34A',
  },
  warning: {
    label: '경고',
    icon: 'clarity:warning-solid',
    bg: '#FFE8E8',
    fg: '#DC2626',
  },
  recommend: {
    label: '추천',
    icon: 'material-symbols:thumb-up-rounded',
    bg: '#EAF1FF',
    fg: '#2563EB',
  },
}

const cfg = computed(() => KIND[props.kind])
const sizeClass = computed(() => (props.size === 'sm' ? 'h-7 px-3' : 'h-8 px-3'))
const iconSizeClass = computed(() => (props.size === 'sm' ? 'w-4 h-4' : 'w-4 h-4')) 
</script>

<template>
  <span
    class="inline-flex items-center gap-2 rounded-full font-bold leading-none caption3"
    :class="sizeClass"
    :style="{ backgroundColor: cfg.bg, color: cfg.fg }"
  >
    <Icon :icon="cfg.icon" :class="iconSizeClass" aria-hidden="true" />
    <span>{{ label || cfg.label }}</span>
  </span>
</template>
