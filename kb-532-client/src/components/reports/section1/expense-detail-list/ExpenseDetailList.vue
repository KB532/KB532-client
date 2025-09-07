<script setup>
import ExpenseDetailListItem from '@/components/reports/section1/expense-detail-list/ExpenseDetailListItem.vue';

const expenseDetailData = {
  shopping: {
    category: 'shopping',
    label: '쇼핑',
    amount: 345409,
    percent: 26,
  },
  finance: {
    category: 'finance',
    label: '보험·대출·기타금융',
    amount: 281790,
    percent: 22,
  },
  food: {
    category: 'food',
    label: '식비',
    amount: 246500,
    percent: 19,
  },
  transfer: {
    category: 'transfer',
    label: '이체',
    amount: 219750,
    percent: 17,
  },
  transit: {
    category: 'transit',
    label: '교통',
    amount: 142182,
    percent: 11,
  },
  health: {
    category: 'health',
    label: '의료·건강·피트니스',
    amount: 30000,
    percent: 2,
  },
  home: {
    category: 'home',
    label: '주거·통신',
    amount: 20900,
    percent: 2,
  },
  living: {
    category: 'living',
    label: '생활',
    amount: 12480,
    percent: 1,
  },
  snacks: {
    category: 'snacks',
    label: '카페·간식',
    amount: 5500,
    percent: 0,
  },
  others: {
    category: 'others',
    label: '기타 지출',
    amount: 105088,
    percent: 0,
  },
};
</script>

<template>
  <div class="flex flex-col gap-4 p-2">
    <ExpenseDetailListItem
      v-for="item in expenseDetailData"
      :key="item.category"
      :category="item.category"
      :amount="item.amount"
      :percent="item.percent"
    />
  </div>
</template>
