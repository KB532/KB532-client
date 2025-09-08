<script setup>
import ExpenseDetailListItem from '@/components/reports/section1/expense-detail-list/ExpenseDetailListItem.vue';

const props = defineProps({
  modelValue: Boolean,
  items: { type: Array, default: () => [] },
});
</script>

<template>
  <div
    class="flex flex-col px-2 gap-4 transition-all duration-300 ease-in-out overflow-hidden"
    :class="props.modelValue ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'"
  >
    <ExpenseDetailListItem
      v-for="item in props.items"
      :key="item.key"
      :category="item.key"
      :amount="item.amount"
      :percent="Math.round(item.percent)"
    />
  </div>
</template>
