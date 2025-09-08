<script setup>
import BaseFormField from '@/components/common/FormField/BaseFormField.vue';

const form = defineModel('form', {
  type: Object,
  default: () => ({
    name: '',
    rrn: '',
    phone: '',
    password: '',
    password2: '',
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
      v-model="form.name"
      label="이름"
      placeholder="이름을 입력해주세요"
      autocomplete="name"
      :error="props.errors.name"
      required
    />

    <BaseFormField
      v-model="form.rrn"
      label="주민등록번호"
      placeholder="주민등록번호의 숫자 부분만 입력해주세요"
      inputmode="numeric"
      mask="rrn"
      display-mask="rrn"
      :error="props.errors.rrn"
      required
    />

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

    <BaseFormField
      v-model="form.password2"
      label="비밀번호 확인"
      type="password"
      placeholder="비밀번호를 다시 입력해주세요"
      autocomplete="new-password"
      :error="props.errors.password2"
      required
    />
  </form>
</template>
