<script setup>
import MonthlyExpenseDetail from '@/components/reports/section1/MonthlyExpenseDetail.vue';
import SpendingInsightCard from '@/components/reports/section2/SpendingInsightCard.vue';
import WeeklySpendingMain from '@/components/reports/section3/WeeklySpendingMain.vue';
import MonthlySavingsMain from '@/components/reports/section4/MonthlySavingsMain.vue';
</script>
<template>
  <div>
    <MonthlyExpenseDetail />
    <SpendingInsightCard />
    <WeeklySpendingMain />
    <MonthlySavingsMain />
  </div>
</template>
