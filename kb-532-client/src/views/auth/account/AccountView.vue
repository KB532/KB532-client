<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AccountInputForm from '@/components/auth/account/AccountInputForm.vue'
import DarkButton from '@/components/common/Button/DarkButton.vue'
import { registerConnectedId, syncCodefAccounts } from '@/api/codef'

// 은행명 → CODEF 기관 코드 매핑
const BANK_ORG_MAP = {
  'KB국민': '0004',
  '신한':   '0088',
  '하나':   '0081',
  '우리':   '0020',
  'NH농협': '0011',
}
const getOrgCode = (label) => BANK_ORG_MAP[label] || null

const router = useRouter()

const form = ref({ bank: '', bankId: '', password: '' })
const errors = computed(() => ({
  bank: !form.value.bank ? '은행을 선택해주세요.' : '',
  bankId: !form.value.bankId ? '은행 ID를 입력해주세요.' : '',
  password: form.value.password.length >= 1 ? '' : '비밀번호를 입력해주세요.',
}))
const isFormInvalid = computed(() => Object.values(errors.value).some(Boolean))
const loading = ref(false)
const serverError = ref('')

async function submit() {
  serverError.value = ''
  if (isFormInvalid.value || loading.value) return

  const organization = getOrgCode(form.value.bank)
  if (!organization) {
    serverError.value = '지원하지 않는 은행입니다. (기관 코드 매핑을 확인하세요)'
    return
  }

  loading.value = true
  try {
    // 1) connectedId 등록
    const { connectedId } = await registerConnectedId({
      organization,
      id: form.value.bankId,
      password: form.value.password,
      // userId는 내부 기본값 1로 쿼리에 전송
    })

    // 2) 계좌 동기화 (connectedId 있으면 전달)
    await syncCodefAccounts({ organization, connectedId })

    // 3) 완료 후 이동
    router.push('/account-loading') // 필요 시 다른 경로로 변경
  } catch (e) {
    console.error(e)
    serverError.value = e?.message || '계좌 등록/동기화 중 오류가 발생했습니다.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col h-screen overflow-hidden">
    <div class="pt-28">
      <h1 class="title3">
        실제 은행에서 사용하는 <br />
        <span class="text-kb-yellow-positive">아이디/비밀번호</span>를 입력해주세요
      </h1>
    </div>

    <div class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-xs">
        <AccountInputForm v-model:form="form" :errors="errors" @submit="submit" />
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
        {{ loading ? '등록/동기화 중…' : '계좌 등록' }}
      </DarkButton>
    </div>
  </div>
</template>
