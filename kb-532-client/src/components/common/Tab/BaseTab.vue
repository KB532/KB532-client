<template>
  <div class="bg-gray-100 rounded h-[36px] p-1">
    <div class="relative flex h-full gap-1" role="tablist">
      <div
        class="absolute top-0 bottom-0 left-0 rounded bg-white transition-transform duration-200 ease-out"
        :style="indicatorStyle"
        aria-hidden="true"
      ></div>

      <button
        v-for="(tab, index) in tabs"
        :key="index"
        class="relative z-10 flex-1 flex items-center justify-center rounded focus:outline-none transition-colors duration-150 whitespace-nowrap"
        :class="tab.value === modelValue ? 'caption1 text-black' : 'caption2 text-kb-gray-dark'"
        @click="selectTab(tab.value)"
        role="tab"
        :aria-pressed="tab.value === modelValue"
      >
        {{ tab.label }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    default: () => [],
    validator: (value) =>
      value.every((tab) => typeof tab.label === 'string' && typeof tab.value === 'string'),
  },
  modelValue: { type: String, default: null },
});
const emit = defineEmits(['update:modelValue']);
const selectTab = (value) => emit('update:modelValue', value);

const activeIndex = computed(() => {
  const i = props.tabs.findIndex((t) => t.value === props.modelValue);
  return i < 0 ? 0 : i;
});

const GAP_PX = 4;
const indicatorStyle = computed(() => {
  const count = Math.max(props.tabs.length, 1);
  const totalGap = (count - 1) * GAP_PX;
  return {
    width: `calc((100% - ${totalGap}px) / ${count})`,
    transform: `translateX(calc(${activeIndex.value} * (100% + ${GAP_PX}px)))`,
  };
});
</script>
