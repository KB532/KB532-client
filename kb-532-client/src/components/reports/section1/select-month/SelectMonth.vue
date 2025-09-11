<script setup>
import { ref, watch, computed } from 'vue';
import { Icon } from '@iconify/vue';
import SelectMonthModal from './SelectMonthModal.vue';

const emit = defineEmits(['change']);

const today = new Date();
const currentMonth = today.getMonth() + 1;
const currentYear = today.getFullYear();

const selectedMonth = ref(currentMonth);
const selectedYear = ref(currentYear);
const showListModal = ref(false);

const pad2 = (n) => String(n).padStart(2, '0');
const ymString = () => `${selectedYear.value}-${pad2(selectedMonth.value)}`;

const isCurrentMonth = computed(
  () => selectedYear.value === currentYear && selectedMonth.value === currentMonth,
);

const selectMonth = (month) => {
  selectedMonth.value = Number(month);
  showListModal.value = false;
};

const prevMonth = () => {
  if (selectedMonth.value === 1) {
    selectedMonth.value = 12;
    selectedYear.value -= 1;
  } else {
    selectedMonth.value -= 1;
  }
};

const nextMonth = () => {
  if (isCurrentMonth.value) return;
  if (selectedMonth.value === 12) {
    selectedMonth.value = 1;
    selectedYear.value += 1;
  } else {
    selectedMonth.value += 1;
  }
};

watch(
  [selectedYear, selectedMonth],
  () => {
    emit('change', ymString());
  },
  { immediate: true },
);
</script>

<template>
  <div class="flex items-center gap-2">
    <Icon
      icon="fluent:triangle-left-12-filled"
      :class="['size-3', 'cursor-pointer', 'text-black']"
      @click="prevMonth"
    />

    <div class="flex items-center gap-1 text-black subtitle1">
      <u class="cursor-pointer" @click="showListModal = true"> {{ selectedMonth }}월 </u>
      <p>총 지출</p>
    </div>

    <Icon
      icon="fluent:triangle-left-12-filled"
      :class="[
        'size-3',
        'rotate-180',
        isCurrentMonth
          ? 'text-gray-400 opacity-40 pointer-events-none cursor-default'
          : 'text-black cursor-pointer',
      ]"
      @click="nextMonth"
    />

    <SelectMonthModal
      v-model="showListModal"
      :selectedYear="selectedYear"
      @selectMonth="selectMonth"
    />
  </div>
</template>
