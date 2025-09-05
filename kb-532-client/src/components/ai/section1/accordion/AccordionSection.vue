<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  title: { type: String, required: true },
  items: { type: Array, default: () => [] },
  defaultOpen: { type: Boolean, default: false },
  // ✅ 닫혀 있을 때 미리 보여줄 개수 (1 추천, 0이면 미리보기 안 보임)
  previewCount: { type: Number, default: 1 },
});

const open = ref(props.defaultOpen);
const contentRef = ref(null);
const accordionRef = ref(null);
const maxHeight = ref('0px');

let ro;

const updateHeight = () => {
  if (!contentRef.value) return;
  maxHeight.value = open.value ? `${contentRef.value.scrollHeight}px` : '0px';
};

onMounted(async () => {
  await nextTick();
  updateHeight();
  ro = new ResizeObserver(() => updateHeight());
  if (contentRef.value) ro.observe(contentRef.value);
  window.addEventListener('resize', updateHeight);
});

onBeforeUnmount(() => {
  if (ro && contentRef.value) ro.unobserve(contentRef.value);
  window.removeEventListener('resize', updateHeight);
});

const smoothScrollTo = (target) => {
  const rect = target.getBoundingClientRect();
  const targetY = rect.top + window.pageYOffset - window.innerHeight / 2 + rect.height / 2;
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const duration = 800;
  let start = null;
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  const step = (ts) => {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    window.scrollTo(0, startY + distance * easeOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

watch(open, async (v) => {
  if (v && accordionRef.value) smoothScrollTo(accordionRef.value);
  await nextTick();
  updateHeight();
});

watch(
  () => props.items,
  async () => {
    await nextTick();
    updateHeight();
  },
  { deep: true },
);

const toggle = () => (open.value = !open.value);

// ✅ 닫혀 있을 때만 보여줄 미리보기 (첫 N개)
const previewItems = computed(() =>
  !open.value && props.previewCount > 0 ? props.items.slice(0, props.previewCount) : [],
);
</script>

<template>
  <div class="w-full" ref="accordionRef">
    <button
      type="button"
      @click="toggle"
      class="w-full flex items-center justify-between gap-3"
      :aria-expanded="open"
    >
      <span class="subtitle2">{{ title }}</span>
      <Icon
        icon="material-symbols:arrow-back-ios-new-rounded"
        class="w-4 h-4 transition-transform duration-200"
        :class="open ? 'rotate-90' : '-rotate-90'"
      />
    </button>

    <div v-if="previewItems.length" class="mt-2 cursor-pointer" @click="toggle">
      <ul class="list-disc list-inside">
        <li class="body2 text-gray-800 truncate">
          {{ previewItems[0] }}
        </li>
      </ul>
    </div>

    <div
      class="transition-[max-height] duration-200 ease-in-out overflow-hidden"
      style="transform-origin: top center"
      :style="{ maxHeight }"
    >
      <div ref="contentRef" class="pt-3">
        <slot name="img" />
        <ul class="list-disc pl-4 space-y-2">
          <li v-for="(line, idx) in items" :key="idx" class="body2 break-words whitespace-pre-line">
            {{ line }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
