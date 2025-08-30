<script setup>
import BaseCard from '@/components/common/Card/BaseCard.vue';
import RatioTab from './radiotab/RatioTab.vue';

</script>

<template>
    <BaseCard>
      <div class="pb-4">
    <p class="body1">이번 달 총 지출</p>
    <h1 class="title1 text-black mt-1">
        3,245,624원    
    </h1></div>
    <RatioTab/>  
  </BaseCard>
</template>
