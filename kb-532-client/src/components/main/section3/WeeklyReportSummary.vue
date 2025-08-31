<script setup>
import BaseCard from '@/components/common/Card/BaseCard.vue';
import Chip from '@/components/common/Chip/BaseChip.vue';
import SummaryChipGroup from './SummaryChipGroup.vue';
import { Icon } from '@iconify/vue';

// TODO: 실제 API 데이터로 교체
const summaryData = {
  categories: {
    shopping: { label: '쇼핑', icon: 'mdi:cart-outline' },
    dining: { label: '외식비', icon: 'bxs:bowl-rice' },
    cafe: { label: '카페', icon: 'mdi:coffee-outline' },
  },
  shoppingDropPercent: 20,
  diningRisePercent: 15,
  cafeTargetPerWeek: 3,
};
</script>

<template>
  <BaseCard>
    <div class="w-full">
      <div class="flex items-center justify-between mb-3">
        <p class="subtitle2">주간 리포트 요약</p>
        <!-- TODO: 버튼 클릭 시 동작 정의 -->
        <Chip size="small" variant="outline" class="shrink-0 whitespace-nowrap">
          전체 리포트 보기
          <Icon icon="material-symbols:chevron-right" class="w-4 h-auto text-kb-gray-dark" />
        </Chip>
      </div>
      <SummaryChipGroup :data="summaryData">
        <!-- success -->
        <template #success="{ data }"
          >{{ data.categories.shopping.label }} 지출이 지난주보다 {{ data.shoppingDropPercent }}%
          줄었습니다.
        </template>

        <!-- warning -->
        <template #warning="{ data }">
          {{ data.categories.dining.label }}
          가 지난주보다 {{ data.diningRisePercent }}% 증가했습니다.
        </template>

        <!-- recommend -->
        <template #recommend="{ data }">
          다음 주에는 {{ data.categories.cafe.label }} 결제를 주 {{ data.cafeTargetPerWeek }}회
          이하로 줄여보세요!
        </template>
      </SummaryChipGroup>
    </div>
  </BaseCard>
</template>
