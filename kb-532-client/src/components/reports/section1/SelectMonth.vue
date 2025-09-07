<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import SelectMonthModal from '@/components/reports/section1/SelectMonthModal.vue';

const today = new Date();
const selectedMonth = ref(today.getMonth() + 1);
const selectedYear = ref(today.getFullYear());

const showListModal = ref(false);

const selectMonth = (month) => {
  selectedMonth.value = month
  showListModal.value = false
}

const prevMonth = () => {
  if (selectedMonth.value === 1) {
    selectedMonth.value = 12
    selectedYear.value -= 1
  } else {
    selectedMonth.value -= 1
  }
}

const nextMonth = () => {
  if (selectedMonth.value === 12) {
    selectedMonth.value = 1
    selectedYear.value += 1
  } else {
    selectedMonth.value += 1
  }
}
</script>

<template>
  <div class="flex items-center gap-2">
    <Icon
      icon="fluent:triangle-left-12-filled"
      class="text-black size-3"
      @click="prevMonth"
    />
    <div class="flex items-center gap-1 text-black subtitle1">
      <u
        class="cursor-pointer"
        @click="showListModal = true"
      >
        {{ selectedMonth }}월
      </u>
      <p>총 지출</p>
    </div>
    <Icon
      icon="fluent:triangle-left-12-filled"
      class="text-gray-600 size-3 rotate-180"
      @click="nextMonth"
    />
    <SelectMonthModal
      v-model="showListModal"
      :selectedYear="selectedYear"
      @selectMonth="selectMonth"
    />
  </div>
</template>
