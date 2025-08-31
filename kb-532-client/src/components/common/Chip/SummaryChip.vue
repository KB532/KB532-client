<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  kind: {
    type: String,
    default: 'success',
    validator: (v) => ['success', 'warning', 'recommend'].includes(v),
  },
  label: { type: String, default: '' },
});

const KIND = {
  success: { label: '성과', icon: 'bxs:party', bg: '#E6F7DB', fg: '#35B100' },
  warning: { label: '경고', icon: 'clarity:warning-solid', bg: '#FFE6E6', fg: '#FF4242' },
  recommend: {
    label: '추천',
    icon: 'material-symbols:thumb-up-rounded',
    bg: '#E7EFFF',
    fg: '#1E61F3',
  },
};

const cfg = computed(() => KIND[props.kind]);
</script>

<template>
  <span
    class="inline-flex items-center justify-center gap-1 rounded-full caption3 w-[53px] h-[21px]"
    :style="{ backgroundColor: cfg.bg, color: cfg.fg }"
  >
    <Icon :icon="cfg.icon" class="w-3 h-auto" aria-hidden="true" />
    <span class="truncate whitespace-nowrap">{{ label || cfg.label }}</span>
  </span>
</template>
