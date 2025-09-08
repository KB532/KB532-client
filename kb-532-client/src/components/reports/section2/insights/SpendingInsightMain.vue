<template>
  <header>
    <h2 class="subtitle1 tracking-tight text-gray-900">
      저번 달보다
      <span class="text-gray-900">{{ category }}</span> 지출이
      <span class="text-kb-yellow-positive"> {{ percent }}% </span>
      {{ trendText }}어요!
    </h2>
    <p class="caption3 text-gray-600 mt-1">AI가 소비 내역을 분석했어요.</p>
  </header>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  category: { type: String, required: true }, // ex) '쇼핑'
  percent: { type: Number, required: true }, // ex) 10
  trend: { type: String, required: true }, // 'up' | 'down'
});

const trendText = computed(() => (props.trend === 'up' ? '늘었' : '줄었'));
</script>
