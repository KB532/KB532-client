<script setup>
import { ref } from "vue";
import { Icon } from '@iconify/vue';
import BaseCard from '@/components/common/Card/BaseCard.vue';
import ExpenseListItem from '@/components/reports/expense/ExpenseListItem.vue';
import ExpenseDetailModal from '@/components/reports/expense/ExpenseDetailModal.vue';
import AddExpenseModal from '@/components/reports/expense/AddExpenseModal.vue';

const isAddModalOpen = ref(false);
const isDetailModalOpen = ref(false);
const currentItem = ref(null);

const handleClickAddButton = () => {
  isAddModalOpen.value = true;
}

const handleClickItem = (item) => {
  currentItem.value = item;
  isDetailModalOpen.value = true;
}

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
  <BaseCard class="flex flex-col gap-2">
    <Icon
      icon="material-symbols:add-2-rounded"
      class="fixed top-4 right-8 size-6 rounded-full text-gray-600 hover:text-black active:text-black active:bg-gray-200"
      @click="handleClickAddButton"
    />
    <h1 class="subtitle1 text-black">9월 8일</h1>
    <div class="flex flex-col -mx-4">
      <ExpenseListItem
        v-for="item in data"
        :key="item.id"
        :category="item.category"
        :name="item.name"
        :date="item.date"
        :amount="item.amount"
        @click="handleClickItem(item)"
      />
    </div>
    <ExpenseDetailModal v-model="isDetailModalOpen" :data="currentItem" />
    <AddExpenseModal v-model="isAddModalOpen" />
  </BaseCard>
</template>
