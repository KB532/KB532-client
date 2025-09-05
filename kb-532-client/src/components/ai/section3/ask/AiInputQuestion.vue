<script setup>
import { computed } from 'vue';
import DarkCard from '@/components/common/Card/DarkCard.vue';
import SubmitButton from '@/components/common/Button/SubmitButton.vue';
import InputTextarea from '@/components/common/Input/InputTextarea.vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  maxChars: { type: Number, default: 100 },
  loading: { type: Boolean, default: false },
  locked: { type: Boolean, default: false },
});
const emit = defineEmits(['update:modelValue', 'submit']);
const canSubmit = computed(
  () => props.modelValue.trim().length > 0 && !props.loading && !props.locked,
);
const onSubmit = () => {
  if (canSubmit.value) emit('submit');
};
</script>

<template>
  <section class="p-4 mb-12 space-y-4 min-h-[456px]">
    <h2 class="title2 mt-12">AI 코치에게 물어봐!</h2>

    <DarkCard>
      <div class="flex items-start gap-2">
        <span class="subtitle2 text-yellow-400">TIP</span>
        <div class="space-y-1">
          <p class="body2">궁금한 자산관리 방법을 자세히 질문해봐</p>
          <ul class="list-disc break-words pt-3 space-y-1 text-kb-gray caption2">
            <li>매주 하나의 질문을 할 수 있어요.</li>
            <li>질문을 남기고 전송하기 버튼을 클릭해주세요.</li>
            <li>
              532가 최상의 코칭을 위해 고민하는 데 시간이 필요해요. 답변이 오면 바로 알려드릴게요!
            </li>
          </ul>
        </div>
      </div>
    </DarkCard>

    <InputTextarea
      :model-value="modelValue"
      @update:model-value="(v) => $emit('update:modelValue', v)"
      :max-chars="maxChars"
      placeholder="궁금한 질문을 남겨보세요."
      :readonly="locked"
      :disabled="locked"
    />

    <SubmitButton block :disabled="!canSubmit" :aria-disabled="!canSubmit" @click="onSubmit">
      질문 전송하기
    </SubmitButton>
  </section>
</template>
