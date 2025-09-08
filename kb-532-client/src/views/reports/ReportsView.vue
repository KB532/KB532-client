<script setup>
import MonthlyExpenseDetail from '@/components/reports/section1/MonthlyExpenseDetail.vue';
import SpendingInsightCard from '@/components/reports/section2/SpendingInsightCard.vue';
import WeeklySpendingMain from '@/components/reports/section3/WeeklySpendingMain.vue';
import MonthlySavingsMain from '@/components/reports/section4/MonthlySavingsMain.vue';
import RevealOnView from '@/components/common/Effects/RevealOnView.vue';
</script>
<template>
  <div>
    <RevealOnView :delay="0"><MonthlyExpenseDetail /> </RevealOnView>

    <RevealOnView :delay="100"><SpendingInsightCard /></RevealOnView>
    <RevealOnView :delay="200"><WeeklySpendingMain /></RevealOnView>
    <RevealOnView :delay="300"><MonthlySavingsMain /></RevealOnView>
  </div>
</template>
