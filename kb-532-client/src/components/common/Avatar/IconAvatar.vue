<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  category: String,
  /** 배경(회색 원) 표시 여부 — 기본 true */
  bg: { type: Boolean, default: true },
  /** 아이콘 크기 Tailwind 클래스 */
  size: { type: String, default: 'size-6' },
  /** 배경이 있을 때만 적용할 패딩 클래스 */
  padding: { type: String, default: 'p-1.5' },
});

const categoryIcon = {
  shopping: { icon: 'mdi:shopping', color: 'text-[#00DE5A]' },
  finance: { icon: 'material-symbols:health-and-safety-rounded', color: 'text-[#A180FF]' },
  food: { icon: 'material-symbols:fork-spoon-rounded', color: 'text-[#FFC831]' },
  transfer: { icon: 'grommet-icons:transaction', color: 'text-[#467CAA]' },
  transit: { icon: 'mdi:bus', color: 'text-[#4AC9FF]' },
  health: { icon: 'solar:health-bold', color: 'text-[#FF5882]' },
  home: { icon: 'f7:house-fill', color: 'text-[#2EA923]' },
  living: { icon: 'icon-park-solid:shopping', color: 'text-[#FF9A42]' },
  snacks: { icon: 'jam:coffee-cup-f', color: 'text-[#B066FF]' },
  others: { icon: 'codex:etc-horisontal', color: 'text-gray-600' },
  unclassified: { icon: 'mdi:help', color: 'text-red-200' },
};

const currentCategory = categoryIcon[props.category] || {
  icon: 'codex:etc-horisontal',
  color: 'text-gray-600',
};
</script>

<template>
  <div
    :class="[
      'inline-flex items-center justify-center rounded-full',
      bg ? `bg-gray-200 ${padding}` : 'bg-transparent p-0',
    ]"
  >
    <Icon :icon="currentCategory.icon" :class="[currentCategory.color, size]" />
  </div>
</template>
