<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  title: { type: String, required: true },
  items: { type: Array, default: () => [] },
  defaultOpen: { type: Boolean, default: false },
});

const open = ref(props.defaultOpen);
const contentRef = ref(null);
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

watch(open, async () => {
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
</script>

<template>
  <div class="w-full">
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

    <div class="transition-[max-height] duration-200 overflow-hidden" :style="{ maxHeight }">
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
