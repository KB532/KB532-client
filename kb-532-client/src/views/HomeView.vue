<script setup>
import ThisMonthExpenseSection from '@/components/main/section1/ThisMonthExpense.vue';
import NextMonthSavingsTarget from '@/components/main/section2/NextMonthSavingsTarget.vue';
import WeeklyReportSummary from '@/components/main/section3/WeeklyReportSummary.vue';
import PopularProducts from '@/components/main/section4/PopularProducts.vue';
import RevealOnView from '@/components/common/Effects/RevealOnView.vue';
</script>

<template>
  <div class="space-y-4 mb-4">
    <RevealOnView :delay="0">
      <ThisMonthExpenseSection />
    </RevealOnView>

    <RevealOnView :delay="100">
      <NextMonthSavingsTarget />
    </RevealOnView>

    <RevealOnView :delay="200">
      <WeeklyReportSummary />
    </RevealOnView>

    <RevealOnView :delay="300">
      <PopularProducts />
    </RevealOnView>
  </div>
</template>
