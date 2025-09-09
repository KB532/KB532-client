<!-- src/views/auth/SignUpView.vue -->
<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import SignUpInputForm from '@/components/auth/signup/SignUpInputForm.vue'
import DarkButton from '@/components/common/Button/DarkButton.vue'
import { signup } from '@/api/auth' // ← 회원가입 API

const router = useRouter()

const form = ref({
  name: '',
  rrn: '',
  phone: '',
  password: '',
  password2: '',
})

const errors = computed(() => ({
  name: !form.value.name ? '이름을 입력해주세요.' : '',
  // 숫자만 기준: 앞 6자리 + 뒤 1자리 = 7자리 형태 허용
  rrn: form.value.rrn.replace(/\D/g, '').length === 7 ? '' : '주민번호 앞자리를 입력해주세요.',
  phone: form.value.phone.replace(/\D/g, '').length >= 9 ? '' : '전화번호를 정확히 입력해주세요.',
  password: form.value.password.length >= 1 ? '' : '비밀번호를 입력해주세요.',
  password2:
    form.value.password2 && form.value.password2 === form.value.password
      ? ''
      : '비밀번호가 일치하지 않습니다.',
}))

const isFormInvalid = computed(() => Object.values(errors.value).some(Boolean))

const loading = ref(false)
const serverError = ref('')

async function submit() {
  serverError.value = ''
  if (isFormInvalid.value || loading.value) return
  loading.value = true
  try {
    // 서버 포맷은 api/auth.js의 signup()에서 하이픈/포맷 처리
    await signup({
      name: form.value.name,
      rrn: form.value.rrn,
      phone: form.value.phone,
      password: form.value.password,
    })
    router.push('/signup-success') // 성공 후 이동 경로
  } catch (e) {
    console.error(e)
    serverError.value = e?.message || '회원가입에 실패했습니다.'
  } finally {
    loading.value = false
  }
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
        <p v-if="serverError" class="mt-2 text-xs text-red-500 px-1">{{ serverError }}</p>
      </div>
    </div>

    <div class="pb-10">
      <DarkButton
        block
        class="h-12"
        text-style="button1"
        @click="submit"
        :disabled="isFormInvalid || loading"
      >
        {{ loading ? '가입 중…' : '회원 가입' }}
      </DarkButton>
    </div>
  </div>
</template>
