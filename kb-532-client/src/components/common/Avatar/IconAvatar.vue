<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  category: String,
});

const categoryIcon = {
  shopping: { // 쇼핑
    icon: 'mdi:shopping',
    color: 'text-[#00DE5A]'
  },
  finance: { // 보험·대출·기타금융
    icon: 'material-symbols:health-and-safety-rounded',
    color: 'text-[#A180FF]'
  },
  food: { // 식비
    icon: 'material-symbols:fork-spoon-rounded',
    color: 'text-[#FFC831]'
  },
  transfer: { // 이체
    icon: 'grommet-icons:transaction',
    color: 'text-[#467CAA]'
  },
  transit: { // 교통
    icon: 'mdi:bus',
    color: 'text-[#4AC9FF]'
  },
  health: { // 의료·건강·피트니스
    icon: 'solar:health-bold',
    color: 'text-[#FF5882]'
  },
  home: { // 주거·통신
    icon: 'f7:house-fill',
    color: 'text-[#2EA923]'
  },
  living: { // 생활
    icon: 'icon-park-solid:shopping',
    color: 'text-[#FF9A42]'
  },
  snacks: { // 카페·간식
    icon: 'jam:coffee-cup-f',
    color: 'text-[#B066FF]'
  },
  others: { // 기타 지출
    icon: 'codex:etc-horisontal',
    color: 'text-gray-600'
  }
};

const currentCategory = categoryIcon[props.category] || {
  icon: '', // Todo: 데이터 없을 시 표시할 아이콘 정하기
  color: 'text-gray-600',
};
</script>

<template>
  <div class="bg-gray-200 rounded-full size-fit p-1.5">
    <Icon
      :icon="currentCategory.icon"
      :class="currentCategory.color"
      class="size-6"
    />
  </div>
</template>
