import { askCoach } from '@/api/aiCoaching';
import { defineStore } from 'pinia';

export const useAskStore = defineStore('ask', {
  state: () => ({
    text: '',
    loading: false,
    submitted: false,
    answered: false,
    question: '',
    answer: null,
  }),
  getters: {
    canSubmit: (s) => s.text.trim().length > 0 && !s.loading && !s.submitted,
  },
  actions: {
    async submit() {
      if (!this.canSubmit) return;

      this.loading = true;
      this.submitted = true;
      this.answered = false;
      this.question = '';
      this.answer = null;

      try {
        // 1. 서버에 질문 전송
        const res = await askCoach(this.text.trim());
        const data = res?.data || {};

        this.question = data.question || this.text.trim();
        this.answer = data.answer ?? '';

        // 2. 답변 즉시 표시
        this.answered = true;
      } catch {
        this.submitted = false;
        this.answered = false;
        this.question = '';
        this.answer = null;
      } finally {
        this.loading = false;
      }
    },

    setAnswer(text) {
      this.answer = text ?? '';
      this.answered = true;
    },

    reset() {
      this.text = '';
      this.loading = false;
      this.submitted = false;
      this.answered = false;
      this.question = '';
      this.answer = null;
    },
  },
});
