<script setup>
import BaseCard from '@/components/common/Card/BaseCard.vue'
import { Icon } from '@iconify/vue'   


</script>

<template>
  <BaseCard>
    <div class="pb-4 flex items-center justify-between w-full">
      <div>
        <p class="subtitle2">다음달 목표 저축률</p>
        <h1 class="caption2 text-black mt-1 flex items-center gap-1">
            <!-- TODO: 카테고리 데이터 받아오기 -->
           <h1 class="caption1 text-red-200">외식비</h1>
            줄이면 달성할 수 있어요!
            <!-- TODO: 카테고리 데이터별 아이콘 지정 -->
          <Icon icon="bxs:bowl-rice" class="w-4 h-auto text-black" />
        </h1>
      </div>
    </div>

  </BaseCard>
</template>
