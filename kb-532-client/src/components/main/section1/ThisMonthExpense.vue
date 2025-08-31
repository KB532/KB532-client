<script setup>
import BaseCard from '@/components/common/Card/BaseCard.vue';
import RatioTab from './radiotab/RatioTab.vue';
import DarkButton from '@/components/common/Button/DarkButton.vue';
</script>

<template>
  <BaseCard>
    <div class="pb-4 flex items-center justify-between w-full">
      <div>
        <p class="body1">이번 달 총 지출</p>
        <h1 class="title1 text-black">3,245,624원</h1>
      </div>

      <!-- TODO: 라우터 링크 또는 모달로 변경 필요 -->
      <DarkButton>분석</DarkButton>
    </div>

    <RatioTab />
  </BaseCard>
</template>
