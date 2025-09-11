<script setup>
import { computed } from 'vue';
import { Icon } from '@iconify/vue';
import { iconKeyFromSubcategory } from '@/utils/subcategoryIcon.js';

const props = defineProps({
  // 주의: 이 값은 '생활/카페·간식'같은 한글 서브카테고리거나,
  // 이미 'snacks' 같은 아이콘 키일 수도 있음. 유틸이 둘 다 처리함.
  category: String,
  bg: { type: Boolean, default: true },
  size: { type: String, default: 'size-6' },
  padding: { type: String, default: 'p-1.5' },
});

const categoryIcon = {
  shopping: { icon: 'mdi:shopping', color: 'text-[#00DE5A]' },
  finance: { icon: 'material-symbols:health-and-safety-rounded', color: 'text-[#A180FF]' }, // 아이콘은 필요시 바꾸기
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

// 반응형: props.category 바뀌면 재계산
const key = computed(() => iconKeyFromSubcategory(props.category));
const current = computed(() => categoryIcon[key.value] || categoryIcon.unclassified);
</script>

<template>
  <div
    :class="[
      'inline-flex items-center justify-center rounded-full',
      props.bg ? `bg-gray-200 ${props.padding}` : 'bg-transparent p-0',
    ]"
  >
    <Icon :icon="current.icon" :class="[current.color, props.size]" />
  </div>
</template>
