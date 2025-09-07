<script setup>
import CategoryIcon from '@/components/common/Avatar/IconAvatar.vue';

const props = defineProps({
  category: String,
  amount: Number,
  percent: Number,
});

const categoryLabels = {
  shopping: '쇼핑',
  finance: '보험·대출·기타금융',
  food: '식비',
  transfer: '이체',
  transit: '교통',
  health: '의료·건강·피트니스',
  home: '주거·통신',
  living: '생활',
  snacks: '카페·간식',
  others: '기타 지출'
}
</script>

<template>
  <div class="flex justify-between items-center">
    <div class="flex gap-3">
      <CategoryIcon :category="props.category" />
      <div>
        <p class="body2 text-black">{{ categoryLabels[props.category] || '-' }}</p>
        <p class="caption3 text-gray-600">{{ props.percent }}%</p>
      </div>
    </div>
    <p class="subtitle1 text-black">{{ props.amount }}원</p>
  </div>
</template>
