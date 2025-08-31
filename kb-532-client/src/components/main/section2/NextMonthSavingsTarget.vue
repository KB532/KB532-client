<script setup>
import BaseCard from '@/components/common/Card/BaseCard.vue'
import DarkButton from '@/components/common/Button/DarkButton.vue'
import { Icon } from '@iconify/vue'   // ← 추가
</script>

<template>
  <BaseCard>
    <div class="pb-4 flex items-center justify-between w-full">
      <div>
        <p class="subtitle2">다음달 목표 저축률</p>
        <h1 class="caption2 text-black mt-1 flex items-center gap-1">
          외식비 줄이면 달성할 수 있어요!
          <Icon icon="bxs:bowl-rice" class="w-4 h-auto text-black" />
        </h1>
      </div>

      <!-- TODO: 라우터 링크 또는 모달로 변경 필요 -->
      <DarkButton>분석</DarkButton>
    </div>
  </BaseCard>
</template>
