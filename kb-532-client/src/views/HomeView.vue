<script setup>
import ThisMonthExpenseSection from '@/components/main/section1/ThisMonthExpense.vue'
import NextMonthSavingsTarget from '@/components/main/section2/NextMonthSavingsTarget.vue'
import WeeklyReportSummary from '@/components/main/section3/WeeklyReportSummary.vue';
</script>
<template>
  <div class="space-y-4">   
    <ThisMonthExpenseSection />
    <NextMonthSavingsTarget />
    <WeeklyReportSummary />
  </div>
</template>