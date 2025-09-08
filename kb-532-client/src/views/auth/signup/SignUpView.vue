<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import BaseFormField from '@/components/common/FormField/BaseFormField.vue';
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
  // TODO: 실제 회원가입 정보 저장 로직 (e.g. Pinia store or API call)
  console.log('가입 정보:', form.value);
  router.push('/signup-success');
}
</script>
<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <div class="flex-1 overflow-y-auto pt-10">
      <h1 class="title3 mb-8">
        <span class="text-kb-yellow-positive">회원 가입</span>을 위한 <br />정보를 입력해주세요
      </h1>

      <form class="space-y-6" @submit.prevent="submit">
        <BaseFormField
          v-model="form.name"
          label="이름"
          placeholder="이름을 입력해주세요"
          autocomplete="name"
          :error="errors.name"
          required
        />

        <BaseFormField
          v-model="form.rrn"
          label="주민등록번호"
          placeholder="주민등록번호의 숫자 부분만 입력해주세요"
          inputmode="numeric"
          mask="rrn"
          display-mask="rrn"
          :error="errors.rrn"
          required
        />

        <BaseFormField
          v-model="form.phone"
          label="전화번호"
          placeholder="전화번호의 숫자 부분만 입력해주세요"
          inputmode="tel"
          mask="tel"
          :error="errors.phone"
          required
        />

        <BaseFormField
          v-model="form.password"
          label="비밀번호"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          autocomplete="new-password"
          :error="errors.password"
          required
        />

        <BaseFormField
          v-model="form.password2"
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호를 다시 입력해주세요"
          autocomplete="new-password"
          :error="errors.password2"
          required
        />
      </form>
    </div>

    <div class="pb-10">
      <DarkButton block class="h-12" text-style="button1" @click="submit" :disabled="isFormInvalid">
        회원 가입
      </DarkButton>
    </div>
  </div>
</template>
