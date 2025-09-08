<script setup>
import { computed } from 'vue';
import BaseCard from '@/components/common/Card/BaseCard.vue';
import MonthlySavingsChart from './MonthlySavingsChart.vue';

const months = [
  { label: '3월', amount: 400000 },
  { label: '4월', amount: 500000 },
  { label: '5월', amount: 500000 },
  { label: '6월', amount: 700000 },
  { label: '7월', amount: 700000 },
  { label: '8월', amount: 900000 },
];

const averageSavings = computed(() => {
  const total = months.reduce((s, m) => s + m.amount, 0);
  return Math.round(total / months.length / 10000);
});
</script>

<template>
  <BaseCard>
    <h1 class="subtitle1">6개월간 {{ averageSavings }}만원을 저금했어요</h1>
    <MonthlySavingsChart :months="months" />
  </BaseCard>
</template>
