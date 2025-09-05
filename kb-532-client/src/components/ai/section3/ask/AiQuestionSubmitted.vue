<script setup>
import CLOCKimg from '@/assets/ai/CLOCK.svg';
</script>
<template>
  <section class="mt-8 mb-12 min-h-[456px]">
    <div class="p-4">
      <h3 class="title2">AI 코치에게 질문이 전송되었어요</h3>
      <div class="mt-4 flex justify-center">
        <img :src="CLOCKimg" class="w-32 h-auto object-contain" />
      </div>
      <p class="body2 text-gray-800 mt-4 whitespace-pre-line text-center">
        최상의 코칭을 위해 답변을 작성하는 중이에요. <br />답변이 오면 바로 알려드릴게요!
      </p>
    </div>
  </section>
</template>
