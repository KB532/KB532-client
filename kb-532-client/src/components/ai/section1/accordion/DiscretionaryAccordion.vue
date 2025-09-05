<script setup>
import AccordionSection from './AccordionSection.vue';
import BUYImage from '@/assets/ai/BUY.svg';

// TODO: 실제 API 응답으로 변경
const title = '자유';
const items = [
  '외식 지출이 많아져서 조금 주의가 필요해요',
  '이번 주에는 외식 빈도를 줄여보는 건 어떨까요?',
];
const defaultOpen = false;
</script>

<template>
  <AccordionSection :title="title" :items="items" :defaultOpen="defaultOpen">
    <template #img>
      <div class="flex justify-center">
        <img :src="BUYImage" class="w-48 h-auto object-contain" />
      </div>
    </template>
  </AccordionSection>
</template>
