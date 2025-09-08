<script setup>
import BankSelect from '@/components/auth/BankSelect.vue';
import BaseFormField from '@/components/common/FormField/BaseFormField.vue';

const form = defineModel('form', {
  type: Object,
  default: () => ({
    bank: '',
    bankId: '',
    password: '',
  }),
});

const props = defineProps({
  errors: { type: Object, required: true },
});

const emit = defineEmits(['submit']);
</script>

<template>
  <form class="space-y-2" @submit.prevent="emit('submit')">
    <BankSelect v-model="form.bank" :error="props.errors.bank" />

    <BaseFormField
      v-model="form.bankId"
      label="은행 ID"
      placeholder="은행 ID를 입력해주세요"
      :error="props.errors.bankId"
    />

    <BaseFormField
      v-model="form.password"
      label="은행 비밀번호"
      type="password"
      placeholder="은행 비밀번호를 입력해주세요"
      :error="props.errors.password"
    />
  </form>
</template>
