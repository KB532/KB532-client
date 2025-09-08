<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import BankSelect from '@/components/auth/BankSelect.vue';
import BaseFormField from '@/components/common/FormField/BaseFormField.vue';
import DarkButton from '@/components/common/Button/DarkButton.vue';

const router = useRouter();
const form = ref({ bank: '', bankId: '', password: '' });

const errors = computed(() => ({
  bank: !form.value.bank ? '은행을 선택해주세요.' : '',
  bankId: !form.value.bankId ? '은행 ID를 입력해주세요.' : '',
  password: form.value.password.length >= 1 ? '' : '비밀번호를 입력해주세요.',
}));

const isFormInvalid = computed(() => Object.values(errors.value).some(Boolean));

function submit() {
  if (isFormInvalid.value) return;
  console.log('연동 정보:', form.value);
  router.push('/account-loading');
}
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <div class="flex-1 overflow-y-auto pt-10 px-0">
      <h1 class="title3 mb-8">
        실제 은행에서 사용하는 <br />
        <span class="text-kb-yellow-positive">아이디/비밀번호</span>를 입력해주세요
      </h1>

      <div class="space-y-6">
        <BankSelect v-model="form.bank" :error="errors.bank" />

        <BaseFormField
          v-model="form.bankId"
          label="은행 ID"
          placeholder="은행 ID를 입력해주세요"
          :error="errors.bankId"
        />

        <BaseFormField
          v-model="form.password"
          label="은행 비밀번호"
          type="password"
          placeholder="은행 비밀번호를 입력해주세요"
          :error="errors.password"
        />
      </div>
    </div>

    <div class="pb-10">
      <DarkButton block class="h-12" text-style="button1" @click="submit" :disabled="isFormInvalid">
        계좌 등록
      </DarkButton>
    </div>
  </div>
</template>
