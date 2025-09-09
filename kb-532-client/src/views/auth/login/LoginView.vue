<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import LoginInputForm from '@/components/auth/login/LoginInputForm.vue'
import DarkButton from '@/components/common/Button/DarkButton.vue'
import { login } from '@/api/auth'   

const router = useRouter()

const form = ref({
  phone: '',
  password: '',
})

const errors = computed(() => ({
  phone: form.value.phone.replace(/\D/g, '').length >= 9 ? '' : '전화번호를 정확히 입력해주세요.',
  password: form.value.password.length >= 1 ? '' : '비밀번호를 입력해주세요.',
}))
const isFormInvalid = computed(() => Object.values(errors.value).some(Boolean))

const loading = ref(false)      
const serverError = ref('')      

async function submit() {
  serverError.value = ''
  if (isFormInvalid.value || loading.value) return
  loading.value = true
  try {
    const res = await login({
      phone: form.value.phone,
      password: form.value.password,
    })
    // TODO: 토큰 반환 시 저장 예시
    // localStorage.setItem('accessToken', res.accessToken)
    // localStorage.setItem('refreshToken', res.refreshToken)

    router.push('/') // 로그인 성공 후 이동 경로
  } catch (e) {
    console.error(e)
    serverError.value = e?.message || '로그인에 실패했습니다.'
  } finally {
    loading.value = false
  }
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
        {{ loading ? '로그인 중…' : '로그인' }}
      </DarkButton>
    </div>
  </div>
</template>
