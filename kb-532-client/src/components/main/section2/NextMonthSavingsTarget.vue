<script setup>
import BaseCard from '@/components/common/Card/BaseCard.vue';
import Chip from '@/components/common/Chip/BaseChip.vue';
import { Icon } from '@iconify/vue';
import TopSpending from './TopSpending.vue';

// TODO: 실제 API 데이터로 교체
const top3 = [
  { label: '배달 음식', amount: 280000, deltaPercent: 30 },
  { label: '카페', amount: 190000, deltaPercent: 18 },
  { label: '편의점', amount: 120000, deltaPercent: 8 },
];
</script>

<template>
  <BaseCard>
    <div class="pb-4 flex items-center justify-between w-full">
      <div>
        <p class="subtitle2">다음달 목표 저축률</p>
        <h1 class="caption2 text-black mt-1 flex items-center gap-1">
          <!-- TODO: 카테고리 데이터 받아오기 -->
          <h1 class="caption1 text-red-200">외식비</h1>
          줄이면 달성할 수 있어요!
          <!-- TODO: 카테고리 데이터별 아이콘 지정 -->
          <Icon icon="bxs:bowl-rice" class="w-4 h-auto text-black" />
        </h1>
      </div>

      <!-- TODO: 목표 저축률 데이터 받아오기 -->
      <Chip size="large">20%</Chip>
    </div>

    <TopSpending :items="top3" />
  </BaseCard>
</template>
