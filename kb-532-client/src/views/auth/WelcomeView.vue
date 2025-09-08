<template>
  <div class="flex flex-col h-screen px-6 overflow-hidden">
    <div class="flex-1 flex flex-col items-center justify-center">
      <img src="@/assets/logo/532LOGO.svg" alt="532 Logo" class="w-32 h-auto mb-2" />
      <h1 class="title3">오삼이</h1>
      <p class="body2 text-kb-gray-dark mt-1">서브 멘트 받아서 넣기...</p>
    </div>

    <div class="pb-10">
      <DarkButton block class="h-12" text-style="button1" @click="onStart"> 시작하기 </DarkButton>
      <p class="caption2 mt-4 text-center text-gray-600">
        이미 계정이 있나요?
        <router-link to="/login" class="text-kb-yellow-positive"> 로그인 </router-link>
      </p>
    </div>
  </div>
</template>
<script setup>
import DarkButton from '@/components/common/Button/DarkButton.vue';
import router from '@/router';

const onStart = () => {
  router.push('/signup');
};
</script>
