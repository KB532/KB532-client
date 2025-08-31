<script setup>
import { ref } from 'vue';
import BaseTab from '@/components/common/Tab/BaseTab.vue';
import ExpenseRadioChart from './radiochart/ExpenseRadioChart.vue';
import TargetRatioChart from './radiochart/TargetRatioChart.vue';

const tabs = [
  { label: '지출 비율', value: 'spending' },
  { label: '목표 비율', value: 'goal' },
];

const currentTab = ref('spending');
</script>

<template>
  <BaseTab v-model="currentTab" :tabs="tabs" />

  <div class="mt-4">
    <div v-if="currentTab === 'spending'">
      <!-- TODO: 실제값 데이터로 변경 -->
      <ExpenseRadioChart :actual="{ essential: 60, discretionary: 20, savings: 20 }" />
    </div>
    <div v-else-if="currentTab === 'goal'">
      <TargetRatioChart />
    </div>
  </div>
</template>
