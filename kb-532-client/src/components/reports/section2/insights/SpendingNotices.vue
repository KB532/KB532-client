<script setup>
import SummaryChipGroup from '@/components/main/section3/SummaryChipGroup.vue';
// TODO: 실제 API 데이터로 교체
const summaryData = {
  categories: {
    dining: { label: '식비', icon: 'bxs:bowl-rice' },
    cafe: { label: '카페', icon: 'mdi:coffee-outline' },
  },
  diningRisePercent: 15,
  cafeTargetPerWeek: 3,
};
</script>

<template>
  <div
    class="h-20 rounded-lg bg-gray-100 px-3 py-2 flex flex-col items-center justify-center text-center"
  >
    <SummaryChipGroup :data="summaryData">
      <!-- warning -->
      <template #warning="{ data }">
        <div class="caption2">
          {{ data.categories.dining.label }}
          지출이 저번 달보다 {{ data.diningRisePercent }}% 늘었습니다.
        </div>
      </template>

      <!-- recommend -->
      <template #recommend="{ data }">
        <div class="caption2">
          {{ data.categories.cafe.label }} 주문을 주 {{ data.cafeTargetPerWeek }}회로 줄여보세요!
        </div>
      </template>
    </SummaryChipGroup>
  </div>
</template>
