<template>
  <div class="flex flex-col h-screen px-6 overflow-hidden">
    <div class="flex-1 flex flex-col items-center justify-center">
      <img src="@/assets/logo/532LOGO.svg" alt="532 Logo" class="w-32 h-auto mb-2" />
      <h1 class="title3 mb-4">계좌를 연동하고 있습니다...</h1>

      <!-- 토스 느낌 스피너 -->
      <BaseSpinner :size="40" color="#FFBC00" />
    </div>
  </div>
</template>

<script setup>
import BaseSpinner from '@/components/common/Spinner/BaseSpinner.vue';
</script>
