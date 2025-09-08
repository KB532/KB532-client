<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import LoginInputForm from '@/components/auth/login/LoginInputForm.vue';
import DarkButton from '@/components/common/Button/DarkButton.vue';

const router = useRouter();

const form = ref({
  phone: '',
  password: '',
});

const errors = computed(() => ({
  phone: form.value.phone.replace(/\D/g, '').length >= 9 ? '' : '전화번호를 정확히 입력해주세요.',
  password: form.value.password.length >= 1 ? '' : '비밀번호를 입력해주세요.',
}));

const isFormInvalid = computed(() => Object.values(errors.value).some(Boolean));

function submit() {
  if (isFormInvalid.value) return;
  // TODO: 추후 수정 필요
  router.push('/');
}
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <div class="pt-28">
      <h1 class="title3">
        <span class="text-kb-yellow-positive">로그인</span>을 위한<br />
        정보를 입력해주세요
      </h1>
    </div>

    <div class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-xs">
        <LoginInputForm v-model:form="form" :errors="errors" @submit="submit" />
      </div>
    </div>

    <div class="pb-10">
      <DarkButton block class="h-12" text-style="button1" @click="submit" :disabled="isFormInvalid">
        로그인
      </DarkButton>
    </div>
  </div>
</template>
