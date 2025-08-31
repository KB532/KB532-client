<script setup>
import BaseCard from '@/components/common/Card/BaseCard.vue';
import Chip from '@/components/common/Chip/BaseChip.vue';
import SummaryChip from '@/components/common/Chip/SummaryChip.vue';
</script>

<template>
  <BaseCard>
    <div class="w-full">
      <div class="flex items-center justify-between mb-3">
        <p class="subtitle2">주간 리포트 요약</p>
        <!-- TODO: 버튼 클릭 시 동작 정의 -->
        <Chip size="small" variant="outline" class="shrink-0 whitespace-nowrap">
          전체 리포트 보기 >
        </Chip>
      </div>
      <div class="flex flex-col gap-1">
        <!-- TODO: 요약 텍스트 카테고리, 퍼센트, 감소/증가 변경 필요 -->
        <div class="space-y-2">
          <div class="flex items-center gap-2">
            <SummaryChip kind="success" />
            <p class="caption2 flex-1 m-0">쇼핑 지출이 지난주 대비 20% 감소했습니다.</p>
          </div>

          <div class="flex items-center gap-2">
            <SummaryChip kind="warning" />
            <p class="caption2 flex-1 m-0">외식비가 지난주 대비 15% 증가했습니다.</p>
          </div>

          <div class="flex items-center gap-2">
            <SummaryChip kind="recommend" />
            <p class="caption2 flex-1 m-0">다음 주에는 카페 결제를 주 3회 이하로 줄여보세요!</p>
          </div>
        </div>
      </div>
    </div>
  </BaseCard>
</template>
