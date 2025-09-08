<template>
  <div class="flex flex-col h-screen px-6 overflow-hidden">
    <div class="flex-1 flex flex-col items-center justify-center">
      <img src="@/assets/logo/532LOGO.svg" alt="532 Logo" class="w-32 h-auto mb-2" />
      <h1 class="title3">계좌 연동이 완료되었습니다!</h1>
      <p class="body2 text-kb-gray-dark mt-1 text-center">
        이제부터 오삼이가 <br />월급을 관리해 줄 거에요
      </p>
    </div>

    <div class="pb-10">
      <DarkButton block class="h-12" text-style="button1" @click="onAccount">
        로그인 하러 가기
      </DarkButton>
    </div>
  </div>
</template>
<script setup>
import DarkButton from '@/components/common/Button/DarkButton.vue';
import router from '@/router';

const onAccount = () => {
  router.push('/login');
};
</script>
