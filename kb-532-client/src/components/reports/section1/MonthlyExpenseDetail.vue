<script setup>
import { ref } from 'vue';
import BaseCard from '@/components/common/Card/BaseCard.vue';
import SelectMonth from '@/components/reports/section1/select-month/SelectMonth.vue';
import ExpenseCategoryChart from '@/components/reports/section1/ExpenseCategoryChart.vue';
import ShowDetailButton from '@/components/reports/section1/ShowDetailButton.vue';
import ExpenseDetailList from '@/components/reports/section1/expense-detail-list/ExpenseDetailList.vue';

const isOpenList = ref(false);

const handleClick = () => {
  isOpenList.value = !isOpenList.value;
}
</script>

<template>
  <BaseCard>
    <div class="flex flex-col gap-4">
      <SelectMonth />
      <div class="flex flex-col">
        <h1 class="title1 text-black">3,245,624원</h1>
        <p class="caption2 text-gray-600">
          8월보다 <span class="text-blue-200">258,370원</span> 덜 썼어요
        </p>
      </div>
      <div class="w-full flex flex-col items-center">
        <ExpenseCategoryChart />
      </div>
      <ShowDetailButton v-model="isOpenList" :onClick="handleClick" />
      <ExpenseDetailList v-model="isOpenList" />
    </div>
  </BaseCard>
</template>
