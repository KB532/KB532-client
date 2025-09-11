<script setup>
import RevealOnView from '@/components/common/Effects/RevealOnView.vue';
import TopMenuBar from '@/components/layouts/TopMenuBar.vue'
import UncategorizedList from '@/components/reports/expense/section1/UncategorizedList.vue';
import ExpenseList from '@/components/reports/expense/section2/ExpenseList.vue';
</script>

<template>
  <TopMenuBar>내 지출 내역</TopMenuBar>
  <RevealOnView :delay="0"><UncategorizedList /></RevealOnView>
  <RevealOnView :delay="100"><ExpenseList /></RevealOnView>
</template>
