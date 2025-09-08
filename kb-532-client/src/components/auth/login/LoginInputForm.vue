<script setup>
import BaseFormField from '@/components/common/FormField/BaseFormField.vue';

const form = defineModel('form', {
  type: Object,
  default: () => ({
    phone: '',
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
    <BaseFormField
      v-model="form.phone"
      label="전화번호"
      placeholder="전화번호의 숫자 부분만 입력해주세요"
      inputmode="tel"
      mask="tel"
      :error="props.errors.phone"
      required
    />

    <BaseFormField
      v-model="form.password"
      label="비밀번호"
      type="password"
      placeholder="비밀번호를 입력해주세요"
      autocomplete="new-password"
      :error="props.errors.password"
      required
    />
  </form>
</template>
