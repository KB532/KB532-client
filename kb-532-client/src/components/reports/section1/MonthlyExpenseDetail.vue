<script setup>
import { ref } from 'vue';
import BaseCard from '@/components/common/Card/BaseCard.vue';
import SelectMonth from '@/components/reports/section1/select-month/SelectMonth.vue';
import ExpenseCategoryChart from '@/components/reports/section1/ExpenseCategoryChart.vue';
import ShowDetailButton from '@/components/reports/section1/ShowDetailButton.vue';
import ExpenseDetailList from '@/components/reports/section1/expense-detail-list/ExpenseDetailList.vue';
import { getMonthlySpending } from '@/api/transactions';

const isOpenList = ref(false);

const total = ref(0);
const deltaAmount = ref(0);
const deltaPercent = ref(0);
const categories = ref([]);

async function onMonthChange(ym) {
  try {
    const res = await getMonthlySpending({ month: ym });
    total.value = res.total;
    deltaAmount.value = res.deltaAmount;
    deltaPercent.value = res.deltaPercent;
    categories.value = res.categories;
  } catch (e) {
    console.error(e);
  }
}

const handleClick = () => {
  isOpenList.value = !isOpenList.value;
};
</script>

<template>
  <BaseCard>
    <div class="flex flex-col gap-4">
      <SelectMonth @change="onMonthChange" />

      <div class="flex flex-col">
        <h1 class="title1 text-black">{{ total.toLocaleString() }}원</h1>
        <p class="caption2 text-gray-600">
          전월보다
          <span :class="deltaAmount >= 0 ? 'text-red-200' : 'text-blue-200'">
            {{ Math.abs(deltaAmount).toLocaleString() }}원
          </span>
          {{ deltaAmount >= 0 ? '더' : '덜' }} 썼어요
        </p>
      </div>

      <div class="w-full flex flex-col items-center">
        <ExpenseCategoryChart :categories="categories" />
      </div>

      <ShowDetailButton v-model="isOpenList" :onClick="handleClick" />
      <ExpenseDetailList v-model="isOpenList" :items="categories" />
    </div>
  </BaseCard>
</template>
