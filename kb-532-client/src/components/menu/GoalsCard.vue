<script setup>
import { computed } from 'vue';
import Stacked50Bar from '@/components/menu/Stacked50Bar.vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  goals: { type: Array, required: true },
});
defineEmits(['edit']);

const colorMap = {
  필수: '#5AA9FF',
  선택: '#FF8B8B',
  저축: '#FFBC74',
};

const coloredGoals = computed(() =>
  props.goals.map((g) => ({ ...g, color: colorMap[g.label] || g.color })),
);
</script>

<template>
  <section class="rounded-lg bg-gray-100 p-4 h-32 flex flex-col justify-center gap-y-7">
    <div class="flex items-center justify-between">
      <h3 class="subtitle1">나의 현재 50/30/20 목표</h3>
      <button class="caption3 flex items-center gap-1 text-gray-600" @click="$emit('edit')">
        <span>목표 수정하기</span>
        <Icon icon="material-symbols:arrow-forward-ios-rounded" class="h-3 w-auto" />
      </button>
    </div>

    <Stacked50Bar :segments="coloredGoals" />
  </section>
</template>
