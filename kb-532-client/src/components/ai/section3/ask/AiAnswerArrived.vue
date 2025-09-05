<script setup>
import { computed } from 'vue';
import FolderImg from '@/assets/ai/FOLDER.svg';
import DarkCard from '@/components/common/Card/DarkCard.vue';

const props = defineProps({
  question: { type: String, default: '' },
  answer: { type: String, default: '' },
});

// TODO: 임시 답변, 추후 AI API 답변 연동
const MOCK_ANSWER = `아래 순서로 시도해보세요.

1) 이번 주 필수 지출 먼저 확인하고 고정비(통신/구독)를 점검해요.
2) 자유 지출 중 빈도가 높은 항목을 한 가지만 줄여도 효과가 커요. (예: 커피/택시)
3) 주 1회 '무지출 데이'를 정하고, 절약한 금액은 자동이체로 저축 계좌에 옮기세요.

필요하면 다음 주에 소비 패턴을 다시 분석해서 구체적인 금액 목표를 드릴게요.`;

const answerText = computed(() =>
  props.answer && props.answer.trim().length > 0 ? props.answer : MOCK_ANSWER,
);
</script>

<template>
  <div class="bg-white p-4 min-h-[456px]">
    <h3 class="title2">AI 코치에게 답변이 왔어요!</h3>
    <div class="mt-4 flex justify-center">
      <img :src="FolderImg" class="w-30 h-auto object-contain" />
    </div>

    <div class="mt-4">
      <DarkCard>
        <!-- Q -->
        <div class="flex items-start gap-2">
          <span class="caption1 text-yellow-400">Q</span>
          <p class="caption2 text-gray-900 break-words">{{ question }}</p>
        </div>

        <div class="my-3 border-t border-dashed border-kb-gray"></div>

        <!-- A -->
        <div class="flex items-start gap-2">
          <span class="caption1 text-yellow-400">A</span>
          <p class="caption2 text-gray-800 whitespace-pre-line break-keep">
            {{ answerText }}
          </p>
        </div>
      </DarkCard>
    </div>
  </div>
</template>
