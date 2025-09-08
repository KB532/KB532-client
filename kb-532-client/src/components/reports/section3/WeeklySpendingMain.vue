<script setup>
import { computed } from 'vue';
import BaseCard from '@/components/common/Card/BaseCard.vue';
import WeeklySpendingChart from './WeeklySpendingChart.vue';

const weeks = [
  { label: '8월 1째주', amount: 360000 },
  { label: '8월 2째주', amount: 480000 },
  { label: '8월 3째주', amount: 120000 },
  { label: '8월 4째주', amount: 400000 },
  { label: '이번 주', amount: 380000, current: true },
];

const averageSpending = computed(() => {
  if (!weeks || weeks.length === 0) return 0;
  const total = weeks.reduce((sum, week) => sum + week.amount, 0);
  return Math.round(total / weeks.length / 10000);
});
</script>

<template>
  <BaseCard>
    <h1 class="subtitle1">일주일에 평균 {{ averageSpending }}만원을 써요</h1>
    <WeeklySpendingChart :weeks="weeks" />
  </BaseCard>
</template>
