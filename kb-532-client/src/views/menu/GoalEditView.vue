<script setup>
import { reactive, computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { goals, setGoals } from '@/stores/goals'
import { saveBudgetTargets } from '@/api/budget'

import PresetGrid from '@/components/menu/goals/PresetGrid.vue'
import EditablePercentRow from '@/components/menu/goals/EditablePercentRow.vue'
import SubmitButton from '@/components/common/Button/SubmitButton.vue'
import TopMenuBar from '@/components/layouts/TopMenuBar.vue'

const router = useRouter()

// 초기값: 스토어에서 불러오기
const form = reactive({
  essential: goals.find(g => g.label === '필수')?.value ?? 50,
  optional:  goals.find(g => g.label === '선택')?.value ?? 30,
  saving:    goals.find(g => g.label === '저축')?.value ?? 20,
})

// 프리셋
const presets = [
  { key: 'standard', name: '표준형', values: { essential: 50, optional: 30, saving: 20 } },
  { key: 'saving',   name: '저축형', values: { essential: 40, optional: 30, saving: 30 } },
  { key: 'free',     name: '자유형', values: { essential: 50, optional: 40, saving: 10 } },
]
const applyPreset = (v) => Object.assign(form, v)

// 합계/유효성
const sum   = computed(() => form.essential + form.optional + form.saving)
const valid = computed(() => sum.value === 100)

// 저장 상태/에러
const savingReq = ref(false)
const errorMsg  = ref('')

// 생성 API 호출 → 스토어 반영 → 홈 이동
const onSave = async () => {
  if (!valid.value || savingReq.value) return
  savingReq.value = true
  errorMsg.value = ''

  try {
    await saveBudgetTargets({
      essential:     form.essential,
      discretionary: form.optional, // "선택" -> DISCRETIONARY
      savings:       form.saving,   // "저축"  -> SAVINGS
    })

    // 즉시 홈 카드에도 반영되길 원하면 스토어 업데이트
    setGoals([form.essential, form.optional, form.saving])

    router.push({ name: 'menu' })
  } catch (err) {
    console.error('목표 저장 실패:', err)
    errorMsg.value = err?.message || '저장 중 오류가 발생했습니다.'
  } finally {
    savingReq.value = false
  }
}
</script>

<template>
  <TopMenuBar>50/30/20 목표 수정하기</TopMenuBar>

  <div class="flex flex-col justify-between min-h-[812px]">
    <div class="mt-16">
      <!-- 프리셋 -->
      <section class="flex flex-col gap-4">
        <h3 class="title3 text-black">대표 유형 추천</h3>
        <PresetGrid :presets="presets" @select="applyPreset" />
      </section>

      <div class="-mx-8 my-4 h-[8px] bg-gray-200"></div>

      <!-- 개인 목표 -->
      <div class="flex flex-col gap-4">
        <h3 class="title3">개인 목표 설정</h3>
        <div class="flex flex-col gap-4">
          <EditablePercentRow label="필수" :color="'#5AA9FF'" v-model="form.essential" />
          <EditablePercentRow label="선택" :color="'#FF8B8B'" v-model="form.optional"  />
          <EditablePercentRow label="저축" :color="'#FFBC74'" v-model="form.saving"    />
        </div>

        <!-- 합계/안내 -->
        <section>
          <div class="flex items-center justify-between">
            <p class="subtitle1 text-kb-gray-dark">목표 합계</p>
            <p
              class="title2 text-kb-yellow-positive"
              :class="{
              'text-gray-900': sum === 100,
              'text-red-500': sum > 100,
              'text-gray-400': sum < 100,
            }"
            >
              {{ sum }}%
            </p>
          </div>

          <p
            v-if="sum !== 100"
            class="px-4 pb-3 text-xs"
            :class="sum > 100 ? 'text-red-500' : 'text-blue-500'"
          >
            {{ sum > 100 ? '합계는 100%를 초과할 수 없습니다.' : '합계가 100%가 되도록 조정해주세요.' }}
          </p>

          <p v-if="errorMsg" class="px-4 text-xs text-red-500">{{ errorMsg }}</p>
        </section>
      </div>
    </div>
    <!-- 저장 버튼 -->
    <SubmitButton
      block
      class="mb-[34px]"
      :disabled="!valid || savingReq"
      @click="onSave"
    >
      {{ savingReq ? '저장 중…' : '수정 완료' }}
    </SubmitButton>
  </div>
</template>
