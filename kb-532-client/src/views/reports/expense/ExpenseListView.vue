<script setup>
import RevealOnView from '@/components/common/Effects/RevealOnView.vue';
import UncategorizedList from '@/components/reports/expense/section1/UncategorizedList.vue';
import ExpenseList from '@/components/reports/expense/section2/ExpenseList.vue';
</script>

<template>
  <RevealOnView :delay="0"><UncategorizedList /></RevealOnView>
  <RevealOnView :delay="100"><ExpenseList /></RevealOnView>
</template>
