<script setup>
import MissionIcon from '@/assets/ai/PICTURES.svg';

defineProps({
  username: { type: String, default: '' },
  items: { type: Array, default: () => [] },
});
</script>

<template>
  <div
    class="flex min-h-[473px] flex-col items-center justify-center px-6 pt-24 text-center [background:linear-gradient(180deg,#FFFFFF_15%,rgba(255,188,0,0.6)_100%)]"
  >
    <p class="subtitle2">
      그래서 <span class="subtitle2 text-yellow-400">{{ username }}</span
      >님이
    </p>
    <h2 class="mt-1 title2 leading-snug text-gray-900">
      이번주에 도전해볼 미션을<br />알려드릴게요
    </h2>

    <div class="mt-4">
      <img :src="MissionIcon" alt="이번주 미션" class="w-32 h-auto object-contain" />
    </div>

    <ul class="mt-4 list-disc space-y-1 px-5 text-left mb-12">
      <li v-for="(line, idx) in items" :key="idx" class="body2 break-words whitespace-pre-line">
        {{ line }}
      </li>
    </ul>
  </div>
</template>
