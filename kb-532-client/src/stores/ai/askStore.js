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
      try {
        this.question = this.text.trim();
      } finally {
        this.loading = false;
        this.submitted = true;
      }
    },

    setAnswer(text) {
      this.answer = text;
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
