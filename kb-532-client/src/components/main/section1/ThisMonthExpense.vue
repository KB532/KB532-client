<script setup>
import BaseCard from '@/components/common/Card/BaseCard.vue';
import RatioTab from './radiotab/RatioTab.vue';
import DarkButton from '@/components/common/Button/DarkButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const goReports = () => {
  router.push('/reports');
};
</script>

<template>
  <BaseCard>
    <div class="pb-4 flex items-center justify-between w-full">
      <div>
        <p class="body1 text-black">이번 달 총 지출</p>
        <h1 class="title1 text-black">3,245,624원</h1>
      </div>

      <!-- 클릭 시 /reports로 라우팅 -->
      <DarkButton @click="goReports">분석</DarkButton>
    </div>

    <RatioTab />
  </BaseCard>
</template>
