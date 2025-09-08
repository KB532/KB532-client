<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import SignUpInputForm from '@/components/auth/signup/SignUpInputForm.vue';
import DarkButton from '@/components/common/Button/DarkButton.vue';

const router = useRouter();

const form = ref({
  name: '',
  rrn: '',
  phone: '',
  password: '',
  password2: '',
});

const errors = computed(() => ({
  name: !form.value.name ? '이름을 입력해주세요.' : '',
  rrn: form.value.rrn.replace(/\D/g, '').length === 13 ? '' : '주민등록번호 13자리를 입력해주세요.',
  phone: form.value.phone.replace(/\D/g, '').length >= 9 ? '' : '전화번호를 정확히 입력해주세요.',
  password: form.value.password.length >= 1 ? '' : '비밀번호를 입력해주세요.',
  password2:
    form.value.password2 && form.value.password2 === form.value.password
      ? ''
      : '비밀번호가 일치하지 않습니다.',
}));

const isFormInvalid = computed(() => Object.values(errors.value).some(Boolean));

function submit() {
  if (isFormInvalid.value) return;
  console.log('가입 정보:', form.value);
  router.push('/signup-success');
}
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <div class="pt-28">
      <h1 class="title3 mb-4">
        <span class="text-kb-yellow-positive">회원 가입</span>을 위한 <br />
        정보를 입력해주세요
      </h1>
    </div>

    <div class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-xs">
        <SignUpInputForm v-model:form="form" :errors="errors" @submit="submit" />
      </div>
    </div>

    <div class="pb-10">
      <DarkButton block class="h-12" text-style="button1" @click="submit" :disabled="isFormInvalid">
        회원 가입
      </DarkButton>
    </div>
  </div>
</template>
