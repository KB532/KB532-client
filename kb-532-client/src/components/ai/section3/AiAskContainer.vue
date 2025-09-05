<script setup>
import { ref, nextTick, watch, onUnmounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useAskStore } from '@/stores/ai/askStore';
import AiInputQuestion from './ask/AiInputQuestion.vue';
import AiQuestionSubmitted from './ask/AiQuestionSubmitted.vue';
import AiAnswerArrived from './ask/AiAnswerArrived.vue';

const ask = useAskStore();
const { submitted, loading } = storeToRefs(ask);
const sentRef = ref(null);
const showAnswer = ref(false);
const questionAtSubmit = ref('');
let timerId;

watch(submitted, async (v) => {
  if (v) {
    await nextTick();
    sentRef.value?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      window.scrollBy({ top: 200, behavior: 'smooth' });
    }, 100);

    // TODO: 추후 답변 도착 시 표시, 현재는 5초 후 자동 표시
    questionAtSubmit.value = ask.text.trim();
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      showAnswer.value = true;
    }, 5000);
  }
});

const handleSubmit = async () => {
  ask.submit();
};

onUnmounted(() => {
  clearTimeout(timerId);
  if (!ask.submitted) {
    ask.reset();
  }
});
</script>

<template>
  <div>
    <Transition name="slide" mode="out-in">
      <AiInputQuestion
        v-if="!submitted"
        key="input"
        v-model="ask.text"
        :loading="loading"
        :locked="submitted"
        @submit="handleSubmit"
      />
      <div v-else key="submitted" class="relative overflow-hidden min-h-[473px]">
        <Transition name="slide" mode="out-in">
          <AiQuestionSubmitted v-if="!showAnswer" key="question" />
          <AiAnswerArrived
            v-else
            key="answer"
            :question="questionAtSubmit"
            :answer="ask.answer || ''"
          />
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-enter-from {
  transform: translateY(20px);
  opacity: 0;
}

.slide-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0);
  opacity: 1;
}
</style>
