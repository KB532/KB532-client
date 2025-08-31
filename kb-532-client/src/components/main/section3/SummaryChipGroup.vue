<script setup>
import SummaryChip from '@/components/common/Chip/SummaryChip.vue';

defineProps({
  data: { type: Object, default: () => ({}) },
});
</script>

<template>
  <div class="space-y-2">
    <!-- 성과 -->
    <div v-if="$slots.success" class="flex items-center gap-2">
      <SummaryChip kind="success" />
      <p class="caption2 flex-1 m-0 flex items-center gap-1">
        <slot name="success" :data="data" />
      </p>
    </div>

    <!-- 경고 -->
    <div v-if="$slots.warning" class="flex items-center gap-2">
      <SummaryChip kind="warning" />
      <p class="caption2 flex-1 m-0 flex items-center gap-1">
        <slot name="warning" :data="data" />
      </p>
    </div>

    <!-- 추천 -->
    <div v-if="$slots.recommend" class="flex items-center gap-2">
      <SummaryChip kind="recommend" />
      <p class="caption2 flex-1 m-0 flex items-center gap-1">
        <slot name="recommend" :data="data" />
      </p>
    </div>
  </div>
</template>
