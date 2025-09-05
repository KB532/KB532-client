<script setup>
import AccordionSection from './AccordionSection.vue';
import FINANCEimg from '@/assets/ai/FINANCE.svg';

// TODO: 실제 API 응답으로 변경
const title = '저축';
const items = [
  '저축률이 지난주보다 2% 상승했어요!',
  '이번 주에는 저축률이 상승세를 보여 긍정적입니다. 작은 목표를 세우고 지켜 나가면 장기적으로 더 큰 저축 효과를 얻을 수 있습니다.',
];
const defaultOpen = false;
</script>

<template>
  <AccordionSection :title="title" :items="items" :defaultOpen="defaultOpen"
    ><template #img>
      <div class="flex justify-center mb-0">
        <img :src="FINANCEimg" class="w-48 h-auto object-contain" />
      </div> </template
  ></AccordionSection>
</template>
