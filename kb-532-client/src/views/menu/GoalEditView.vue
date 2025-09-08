<script setup>
import { reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { goals, setGoals } from '@/stores/goals'
import PresetGrid from '@/components/menu/goals/PresetGrid.vue'
import EditablePercentRow from '@/components/menu/goals/EditablePercentRow.vue'

const router = useRouter()

const form = reactive({
  essential: goals.find(g => g.label === '필수')?.value ?? 50,
  optional:  goals.find(g => g.label === '선택')?.value ?? 30,
  saving:    goals.find(g => g.label === '저축')?.value ?? 20,
})

const presets = [
  { key: 'standard', name: '표준형', values: { essential: 50, optional: 30, saving: 20 } },
  { key: 'saving',   name: '저축형', values: { essential: 40, optional: 30, saving: 30 } },
  { key: 'free',     name: '자유형', values: { essential: 50, optional: 40, saving: 10 } },
]
const applyPreset = v => Object.assign(form, v)

const sum = computed(() => form.essential + form.optional + form.saving)
const valid = computed(() => sum.value === 100)

const onSave = () => {
  if (!valid.value) return
  setGoals([form.essential, form.optional, form.saving])
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="page">
    <header class="appbar">
      <button class="icon" aria-label="back" @click="router.back()">←</button>
      <h1>50/30/20 목표 수정하기</h1>
      <span class="spacer"></span>
    </header>

    <section class="panel">
      <h3>대표 유형 추천</h3>
      <PresetGrid :presets="presets" @select="applyPreset" />
    </section>

    <hr class="sep" />

    <section class="panel">
      <h3>개인 목표 설정</h3>
      <EditablePercentRow label="필수" :color="'#4C80F1'" v-model="form.essential" />
      <EditablePercentRow label="선택" :color="'#F16E5B'" v-model="form.optional"  />
      <EditablePercentRow label="저축" :color="'#FF9F43'" v-model="form.saving"    />

      <p class="hint" :class="{ error: !valid }">
        합계: <strong>{{ sum }}%</strong>
        <span v-if="!valid"> · 합계가 100%가 되도록 조정해주세요.</span>
      </p>
    </section>

    <div class="save-wrap">
      <button class="save bg-kb-yellow-positive text-white" :disabled="!valid" @click="onSave">
        수정 완료
      </button>
    </div>
  </div>
</template>

<style scoped>
.page{ max-width:390px; margin:0 auto; background:#fff; min-height:100dvh; }
.appbar{ height:56px; display:flex; align-items:center; gap:10px; padding:0 12px; border-bottom:1px solid #f1f3f5; }
.appbar h1{ font-size:16px; font-weight:700; margin:0; }
.appbar .icon{ border:0; background:transparent; font-size:18px; line-height:1; padding:6px 8px; cursor:pointer; }
.appbar .spacer{ width:24px; }
.panel{ padding:16px; }
.panel h3{ margin:8px 0 12px; font-size:15px; font-weight:700; }
.sep{ border:0; height:8px; background:#f5f7fa; }
.hint{ margin-top:6px; font-size:12px; color:#6b7280; }
.hint.error{ color:#ef4444; }
.save-wrap{ padding:16px; }
.save{ width:100%; height:48px; border:0; border-radius:12px; font-weight:700; cursor:pointer; transition:transform .06s, opacity .2s; }
.save:disabled{ opacity:.5; cursor:not-allowed; }
.save:active{ transform:translateY(1px); }
</style>
