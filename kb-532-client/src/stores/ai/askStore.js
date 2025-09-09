import { askCoach, getCoachById, getLatestCoach } from '@/api/aiCoaching';

import { defineStore } from 'pinia';

export const useAskStore = defineStore('ask', {
  state: () => ({
    text: '',
    loading: false,
    submitted: false,
    answered: false,
    question: '',
    answer: null,

    ticketId: null,
    _pollTimer: null,
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
      this.ticketId = null;

      try {
        const res = await askCoach(this.text.trim());
        const data = res?.data || {};

        this.question = data.question || this.text.trim();
        this.ticketId = data.id || null;

        if (data.answer && String(data.answer).trim().length > 0) {
          this.setAnswer(data.answer);
          this.loading = false;
          return;
        }

        this._startPolling();
      } catch {
        this.loading = false;
        this.submitted = false;
        this.answered = false;
        this.question = '';
        this.answer = null;
        this.ticketId = null;
        alert('질문 전송에 실패했습니다. 잠시 후 다시 시도해주세요.');
      } finally {
        if (this._pollTimer) this.loading = false;
      }
    },

    setAnswer(text) {
      this.answer = text;
      this.answered = true;
      this._stopPolling();
    },

    reset() {
      this._stopPolling();
      this.text = '';
      this.loading = false;
      this.submitted = false;
      this.answered = false;
      this.question = '';
      this.answer = null;
      this.ticketId = null;
    },

    _startPolling() {
      this._stopPolling();

      const intervalMs = 4000;
      const timeoutMs = 90_000;
      const deadline = Date.now() + timeoutMs;

      const getFn = this.ticketId ? () => getCoachById(this.ticketId) : () => getLatestCoach();

      const tick = async () => {
        try {
          const res = await getFn();
          const a = res?.data?.answer;
          if (a && String(a).trim().length > 0) {
            this.setAnswer(a);
            return;
          }
        } catch {
          //
        }

        if (Date.now() > deadline) {
          this._stopPolling();
        }
      };

      tick();
      this._pollTimer = setInterval(tick, intervalMs);
    },

    _stopPolling() {
      if (this._pollTimer) {
        clearInterval(this._pollTimer);
        this._pollTimer = null;
      }
    },
  },
});
