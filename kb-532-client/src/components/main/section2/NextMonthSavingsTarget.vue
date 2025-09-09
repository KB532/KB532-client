<script setup>
import { ref, onMounted, computed } from 'vue';
import BaseCard from '@/components/common/Card/BaseCard.vue';
import Chip from '@/components/common/Chip/BaseChip.vue';
import { Icon } from '@iconify/vue';
import TopSpending from './TopSpending.vue';
import { getMonthlyTop3 } from '@/api/dashboard';
import { goals } from '@/stores/goals';

const top3 = ref([]);
const savingsGoal = computed(() => goals.find((g) => g.label === '저축')?.value || 0);

onMounted(async () => {
  try {
    top3.value = await getMonthlyTop3();
  } catch (e) {
    console.error('Top3 불러오기 실패:', e.message);
  }
});
</script>

<template>
  <BaseCard>
    <div class="pb-4 flex items-center justify-between w-full">
      <div>
        <p class="subtitle2">다음달 목표 저축률</p>
        <h1 class="caption2 text-black mt-1 flex items-center gap-1">
          <span class="caption1 text-red-200">
            <!-- {{ top3[0]?.label || '외식비' }} -->
            외식비
          </span>
          줄이면 달성할 수 있어요!
          <!-- TODO: 카테고리 데이터별 아이콘 지정 -->
          <Icon icon="bxs:bowl-rice" class="w-4 h-auto text-black" />
        </h1>
      </div>

      <!-- TODO: 목표 저축률 데이터 받아오기 -->
      <Chip size="large">{{ savingsGoal }}%</Chip>
    </div>

    <TopSpending :items="top3" />
  </BaseCard>
</template>
