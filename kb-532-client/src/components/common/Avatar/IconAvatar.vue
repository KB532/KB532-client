<script setup>
import { Icon } from '@iconify/vue';
import { iconKeyFromSubcategory } from '@/utils/subcategoryIcon.js';

const props = defineProps({
  category: String,
  bg: { type: Boolean, default: true },
  size: { type: String, default: 'size-6' },
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
  income: { icon: 'mdi:cash-plus', color: 'text-[#18A957]' },
  others: { icon: 'codex:etc-horisontal', color: 'text-gray-600' },
  unclassified: { icon: 'material-symbols:question-mark-rounded', color: 'text-red-200' },
};

const key = iconKeyFromSubcategory(props.category);
const current = categoryIcon[key] || categoryIcon.unclassified;
</script>

<template>
  <div
    :class="[
      'inline-flex items-center justify-center rounded-full',
      bg ? `bg-gray-200 ${padding}` : 'bg-transparent p-0',
    ]"
  >
    <Icon :icon="current.icon" :class="[current.color, size]" />
  </div>
</template>
