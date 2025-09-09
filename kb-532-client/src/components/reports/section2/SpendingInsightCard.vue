<template>
  <BaseCard>
    <SpendingInsightMain
      v-if="loaded && detail"
      :category="detail.subcategory"
      :percent="absPercent(detail.changePercent)"
      :trend="detail.changePercent < 0 ? 'down' : 'up'"
    />

    <SpendingComparisonChart
      v-if="loaded && detail"
      :prev-label="monthLabel(detail.prevMonth)"
      :prev-amount="detail.prevAmount"
      :curr-label="monthLabel(detail.curMonth)"
      :curr-amount="detail.curAmount"
    />

    <div class="mt-4" v-if="loaded">
      <SpendingNotices :warning-text="warning" :recommend-text="action" />
    </div>
  </BaseCard>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import BaseCard from '@/components/common/Card/BaseCard.vue';
import SpendingInsightMain from './insights/SpendingInsightMain.vue';
import SpendingComparisonChart from './insights/SpendingComparisonChart.vue';
import SpendingNotices from './insights/SpendingNotices.vue';
import { getMonthlyComparison } from '@/api/dashboard';

const loading = ref(false);
const loaded = ref(false);
const error = ref('');

const successDetail = ref(null);
const warningDetail = ref(null);
const warning = ref('');
const action = ref('');

const detail = computed(() => successDetail.value || warningDetail.value);

const monthLabel = (ym) => (ym?.split?.('-')?.[1] ? String(parseInt(ym.split('-')[1], 10)) : '');
const absPercent = (n) => Math.abs(Math.round(Number(n || 0)));

onMounted(load);

async function load() {
  try {
    loading.value = true;
    const res = await getMonthlyComparison();
    warning.value = res.warning || '';
    action.value = res.action || '';
    successDetail.value = res.successDetail || null;
    warningDetail.value = res.warningDetail || null;
    loaded.value = true;
    console.log('API 결과:', res);
  } catch (e) {
    error.value = e.message || '데이터 로딩 실패';
    loaded.value = true;
  } finally {
    loading.value = false;
  }
}
</script>
