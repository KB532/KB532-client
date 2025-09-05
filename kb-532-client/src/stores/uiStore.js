import { defineStore } from 'pinia';

export const useUiStore = defineStore('ui', {
  state: () => ({
    toast: {
      message: '',
      visible: false,
      type: 'info', // 'info' | 'success' | 'error' | 'warn'
      duration: 2000,
      offsetTop: 12,
      _timerId: null,
    },
  }),
  actions: {
    showToast(message, opts = {}) {
      const { type = 'info', duration = 2000, offsetTop = 12 } = opts;

      if (this.toast._timerId) clearTimeout(this.toast._timerId);

      this.toast.message = message;
      this.toast.type = type;
      this.toast.duration = duration;
      this.toast.offsetTop = offsetTop;
      this.toast.visible = true;

      this.toast._timerId = setTimeout(() => {
        this.toast.visible = false;
        this.toast._timerId = null;
      }, duration);
    },
    hideToast() {
      if (this.toast._timerId) clearTimeout(this.toast._timerId);
      this.toast.visible = false;
      this.toast._timerId = null;
    },
  },
});
