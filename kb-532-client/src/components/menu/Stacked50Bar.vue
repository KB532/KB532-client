<script setup>
import { computed } from 'vue';

const props = defineProps({
  segments: { type: Array, required: true },
});

const enriched = computed(() => {
  let acc = 0;
  return props.segments.map((s, i) => {
    const start = acc;
    const center = start + s.value / 2;
    acc += s.value;
    return { ...s, start, center, i };
  });
});
</script>

<template>
  <!-- 라벨 -->
  <div class="relative w-[300px]">
    <div
      v-for="s in enriched"
      :key="s.label"
      class="absolute flex items-baseline caption3 whitespace-nowrap"
      :style="{ left: s.start + '%' }"
    >
      <p class="caption3">
        {{ s.label }} {{ s.value }}
        <span class="text-[6px] text-gray-600">%</span>
      </p>
    </div>
  </div>

  <!-- 누적 막대 -->
  <div class="flex h-[7px] w-[300px] overflow-hidden rounded-full bg-gray-200">
    <div
      v-for="(s, i) in enriched"
      :key="s.label"
      class="h-full"
      :style="{
        width: s.value + '%',
        background: s.color,
        borderTopLeftRadius: i === 0 ? '999px' : 0,
        borderBottomLeftRadius: i === 0 ? '999px' : 0,
        borderTopRightRadius: i === enriched.length - 1 ? '999px' : 0,
        borderBottomRightRadius: i === enriched.length - 1 ? '999px' : 0,
      }"
    />
  </div>
</template>
