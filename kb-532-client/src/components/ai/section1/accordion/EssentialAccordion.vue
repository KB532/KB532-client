<script setup>
import AccordionSection from './AccordionSection.vue';
import EDITimg from '@/assets/ai/EDIT.svg';

// TODO: 실제 API 응답으로 변경
const title = '필수';
const items = [
  '전기세가 저번달 대비 13,410원이 증가했어요',
  '이번 달에는 전기 사용량을 조금 줄여보는 건 어떨까요?',
];
const defaultOpen = false;
</script>

<template>
  <AccordionSection :title="title" :items="items" :defaultOpen="defaultOpen">
    <template #img>
      <div class="flex justify-center mb-3">
        <img :src="EDITimg" class="w-28 h-auto object-contain" />
      </div>
    </template>
  </AccordionSection>
</template>
