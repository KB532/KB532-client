<script setup>
import { ref, onMounted } from 'vue';
import BaseCard from '@/components/common/Card/BaseCard.vue';
import WeeklySpendingChart from './WeeklySpendingChart.vue';
import { getWeeklySpending } from '@/api/transactions';

const weeks = ref([]);
const averageSpending = ref(0);
const loading = ref(false);
const error = ref('');

onMounted(async () => {
  loading.value = true;
  try {
    const { average, weeks: list } = await getWeeklySpending({ weeks: 5 });
    weeks.value = list;
    averageSpending.value = Math.round(average / 10000);
  } catch (e) {
    error.value = e.message;
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <BaseCard>
    <h1 class="subtitle1">일주일에 평균 {{ averageSpending }}만원을 써요</h1>

    <WeeklySpendingChart :weeks="weeks" />
  </BaseCard>
</template>
