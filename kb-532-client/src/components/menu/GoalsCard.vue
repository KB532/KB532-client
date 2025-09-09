<script setup>
import Stacked50Bar from '@/components/menu/Stacked50Bar.vue'
import { Icon } from '@iconify/vue'
defineEmits(['edit'])
</script>

<template>
  <section class="rounded-lg bg-gray-100 p-4 min-h-32 flex flex-col justify-center gap-y-7">
    <div class="flex items-center justify-between">
      <h3 class="subtitle1 font-bold">나의 현재 50/30/20 목표</h3>
      <button class="caption3 flex items-center gap-1 text-gray-600" @click="$emit('edit')">
        <span>목표 수정하기</span>
        <Icon icon="material-symbols:arrow-forward-ios-rounded" class="h-3 w-auto" />
      </button>
    </div>

    <!-- 프롭 안 넘김: Stacked50Bar가 API 자동 호출 -->
    <Stacked50Bar />
  </section>
</template>
