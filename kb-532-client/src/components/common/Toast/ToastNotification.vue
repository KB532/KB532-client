<script setup>
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref } from 'vue';
import { useUiStore } from '@/stores/uiStore';
import { Icon } from '@iconify/vue';

const ui = useUiStore();
const { toast } = storeToRefs(ui);

const iconName = computed(() => {
  switch (toast.value.type) {
    case 'success':
      return 'solar:check-circle-bold';
    case 'error':
      return 'solar:danger-circle-bold';
    case 'warn':
      return 'solar:warning-circle-bold';
    default:
      return 'solar:info-circle-bold';
  }
});

const wrapBgClass = computed(() => {
  return toast.value.type === 'success'
    ? 'bg-green-50 text-green-800'
    : toast.value.type === 'error'
      ? 'bg-red-50 text-red-800'
      : toast.value.type === 'warn'
        ? 'bg-[#FFF7D1] text-[#5b3d00]'
        : 'bg-[#FFFAE6] text-[#3a2a00]';
});

const iconColorClass = computed(() => {
  return toast.value.type === 'success'
    ? 'text-green-700'
    : toast.value.type === 'error'
      ? 'text-red-700'
      : 'text-[#FFBC00]';
});

// 위치 설정
const measuredTop = ref(72);
onMounted(() => {
  const appbar = document.getElementById('appTopBar') || document.querySelector('[data-appbar]');
  const h = appbar?.offsetHeight ?? 56;
  measuredTop.value = h + 16;
});

const finalTop = computed(() => {
  const manual = toast.value.offsetTop ?? 0;
  const topPx = Math.max(manual, measuredTop.value);
  return `calc(env(safe-area-inset-top, 0px) + ${topPx}px)`;
});
</script>

<template>
  <Teleport to="body">
    <Transition name="toss-toast">
      <div
        v-if="toast.visible"
        class="fixed left-1/2 -translate-x-1/2 z-[1000] pointer-events-none"
        :style="{ top: finalTop }"
      >
        <div
          class="pointer-events-auto inline-flex items-center gap-2 rounded-2xl px-4 py-3 shadow-lg backdrop-blur-md flex-nowrap whitespace-nowrap max-w-[calc(100vw-24px)] overflow-x-auto"
          :class="wrapBgClass"
          @click="ui.hideToast()"
          role="status"
          aria-live="polite"
        >
          <Icon :icon="iconName" class="w-5 h-5 shrink-0" :class="iconColorClass" />
          <p class="caption2 whitespace-nowrap">{{ toast.message }}</p>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.toss-toast-enter-active,
.toss-toast-leave-active {
  transition:
    opacity 420ms cubic-bezier(0.22, 1, 0.36, 1),
    transform 420ms cubic-bezier(0.22, 1, 0.36, 1);
}
.toss-toast-enter-from,
.toss-toast-leave-to {
  opacity: 0;
  transform: translate(-50%, -10px) scale(0.98);
}
.toss-toast-enter-to,
.toss-toast-leave-from {
  opacity: 1;
  transform: translate(-50%, 0) scale(1);
}
@media (prefers-reduced-motion: reduce) {
  .toss-toast-enter-active,
  .toss-toast-leave-active {
    transition-duration: 200ms;
  }
}
</style>
