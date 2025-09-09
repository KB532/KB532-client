<script setup>
import SummaryChipGroup from '@/components/main/section3/SummaryChipGroup.vue';

const props = defineProps({
  warningText: { type: String, default: '' },
  recommendText: { type: String, default: '' },
  warningIcon: { type: String, default: 'bxs:bowl-rice' },
  recommendIcon: { type: String, default: 'mdi:coffee-outline' },
  warningLabel: { type: String, default: '경고' },
  recommendLabel: { type: String, default: '추천' },
});

const summaryData = {
  categories: {
    warning: { label: props.warningLabel, icon: props.warningIcon },
    recommend: { label: props.recommendLabel, icon: props.recommendIcon },
  },
};
</script>

<template>
  <div
    class="h-20 rounded-lg bg-gray-100 px-3 py-2 flex flex-col items-center justify-center text-center"
  >
    <SummaryChipGroup :data="summaryData">
      <template #warning>
        <div v-if="warningText" class="caption2">
          {{ warningText }}
        </div>
      </template>

      <template #recommend>
        <div v-if="recommendText" class="caption2">
          {{ recommendText }}
        </div>
      </template>
    </SummaryChipGroup>
  </div>
</template>
