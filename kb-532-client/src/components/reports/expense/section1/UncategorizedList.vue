<script setup>
import BaseCard from '@/components/common/Card/BaseCard.vue';
import ExpenseListItem from '@/components/reports/expense/ExpenseListItem.vue';

const data = [
  {
    "id": 1,
    "name": "NYUNYU",
    "date": "2025-09-08 19:28",
    "amount": 21500,
    "category": "uncategorized"
  },
  {
    "id": 2,
    "name": "(주)메이타왕에그타르트",
    "date": "2025-09-07 18:52",
    "amount": 10800,
    "category": "uncategorized"
  },
  {
    "id": 3,
    "name": "(주)메이타왕에그타르트",
    "date": "2025-09-07 18:52",
    "amount": 10800,
    "category": "uncategorized"
  },
  {
    "id": 4,
    "name": "(주)메이타왕에그타르트",
    "date": "2025-09-07 18:52",
    "amount": 10800,
    "category": "uncategorized"
  },
];
</script>

<template>
  <BaseCard class="flex flex-col gap-4">
    <div class="flex flex-col gap-1">
      <h1 class="subtitle1">
        <span class="text-red-200">미분류</span>된 지출 내역이 있어요!
      </h1>
      <p class="caption2 text-gray-600">내역을 눌러서 카테고리를 설정해 주세요</p>
    </div>
    <div class="flex flex-col -mx-4 -mb-4">
      <ExpenseListItem
        v-for="item in data"
        :key="item.id"
        :category="item.category"
        :name="item.name"
        :date="item.date"
        :amount="item.amount"
      />
    </div>
  </BaseCard>
</template>
