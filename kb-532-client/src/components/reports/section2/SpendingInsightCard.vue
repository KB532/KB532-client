<template>
  <BaseCard>
    <SpendingInsightMain category="쇼핑" :percent="10" trend="down" />

    <SpendingComparisonChart
      :prev-label="data.prevLabel"
      :prev-amount="data.prevAmount"
      :curr-label="data.currLabel"
      :curr-amount="data.currAmount"
    />
    <div class="mt-4">
      <SpendingNotices />
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@/components/common/Card/BaseCard.vue';
import SpendingInsightMain from './insights/SpendingInsightMain.vue';
import SpendingComparisonChart from './insights/SpendingComparisonChart.vue';
import SpendingNotices from './insights/SpendingNotices.vue';

const data = {
  prevLabel: '8',
  prevAmount: 378310,
  currLabel: '9',
  currAmount: 345409,
};
</script>
