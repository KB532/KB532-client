<script setup>
import AiMission from './AiMission.vue';

// TODO: 실제 API 응답으로 변경
const username = '오삼이';
const items = [
  '카페 결제를 줄이고 작은돈이라도 저금해보기',
  '주중 1번으로 택시비 줄이기',
  '저녁 외식 대신 장보고 요리 3번 해먹기',
];
</script>

<template>
  <AiMission :username="username" :items="items" />
</template>
