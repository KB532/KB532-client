<template>
  <div class="space-y-4 mt-4">
    <div>
      <p class="caption2">{{ prevLabel }}월 {{ formatAmount(prevAmount) }}</p>
      <div class="h-5 rounded bg-[#D9D9D9] mt-1" :style="{ width: prevPercent + '%' }"></div>
    </div>
    <div>
      <p class="caption2">{{ currLabel }}월 {{ formatAmount(currAmount) }}</p>

      <div class="h-5 bg-kb-yellow-negative rounded" :style="{ width: currPercent + '%' }"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  prevLabel: String,
  prevAmount: Number,
  currLabel: String,
  currAmount: Number,
  maxAmount: { type: Number, default: 0 },
});

const basis = computed(() =>
  props.maxAmount > 0 ? props.maxAmount : Math.max(props.prevAmount, props.currAmount),
);

const prevPercent = computed(() =>
  basis.value ? Math.round((props.prevAmount / basis.value) * 100) : 0,
);
const currPercent = computed(() =>
  basis.value ? Math.round((props.currAmount / basis.value) * 100) : 0,
);

function formatAmount(val) {
  return Number(val).toLocaleString('ko-KR') + '원';
}
</script>
