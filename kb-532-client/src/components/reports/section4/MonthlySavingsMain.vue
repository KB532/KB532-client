<script setup>
import { ref, computed, onMounted } from 'vue';
import BaseCard from '@/components/common/Card/BaseCard.vue';
import MonthlySavingsChart from './MonthlySavingsChart.vue';
import { getSavingsTrend } from '@/api/savings';

const monthsParam = 6;
const loading = ref(false);
const error = ref('');
const months = ref([]);

const averageSavings = computed(() => {
  if (!months.value.length) return 0;
  const total = months.value.reduce((s, m) => s + (m.amount || 0), 0);
  return total;
});

async function load() {
  loading.value = true;
  error.value = '';
  try {
    const { series } = await getSavingsTrend({ months: monthsParam });
    months.value = series;
  } catch (e) {
    error.value = e.message;
    months.value = [];
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>

<template>
  <BaseCard>
    <div class="flex items-center justify-between mb-2">
      <h1 class="subtitle1">6개월간 {{ averageSavings }}만원을 저금했어요</h1>
    </div>
    <MonthlySavingsChart :months="months" />
  </BaseCard>
</template>
