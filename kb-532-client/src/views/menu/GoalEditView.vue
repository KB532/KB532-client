<script setup>
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { goals, setGoals } from '@/stores/goals';
import PresetGrid from '@/components/menu/goals/PresetGrid.vue';
import EditablePercentRow from '@/components/menu/goals/EditablePercentRow.vue';
import SubmitButton from '@/components/common/Button/SubmitButton.vue';
import TopMenuBar from '@/components/layouts/TopMenuBar.vue';

const router = useRouter();

const form = reactive({
  essential: goals.find((g) => g.label === '필수')?.value ?? 50,
  optional: goals.find((g) => g.label === '선택')?.value ?? 30,
  saving: goals.find((g) => g.label === '저축')?.value ?? 20,
});

const presets = [
  { key: 'standard', name: '표준형', values: { essential: 50, optional: 30, saving: 20 } },
  { key: 'saving', name: '저축형', values: { essential: 40, optional: 30, saving: 30 } },
  { key: 'free', name: '자유형', values: { essential: 50, optional: 40, saving: 10 } },
];
const applyPreset = (v) => Object.assign(form, v);

const sum = computed(() => form.essential + form.optional + form.saving);
const valid = computed(() => sum.value === 100);

const onSave = () => {
  if (!valid.value) return;
  setGoals([form.essential, form.optional, form.saving]);
  router.push('/menu');
};
</script>

<template>
  <TopMenuBar>50/30/20 목표 수정하기</TopMenuBar>

  <div class="mt-20">
    <section class="panel mb-8">
      <h3 class="title3 mb-4">대표 유형 추천</h3>
      <PresetGrid :presets="presets" @select="applyPreset" />
    </section>

    <div class="-mx-4 my-4 h-[8px] bg-gray-200"></div>

    <h3 class="title3 mb-4">개인 목표 설정</h3>
    <EditablePercentRow label="필수" :color="'#5AA9FF'" v-model="form.essential" />
    <EditablePercentRow label="선택" :color="'#FF8B8B'" v-model="form.optional" />
    <EditablePercentRow label="저축" :color="'#FFBC74'" v-model="form.saving" />

    <section class="mt-6">
      <div class="flex items-baseline justify-between px-4 py-0">
        <p class="text-sm text-gray-500">목표 합계</p>
        <div class="flex items-baseline">
          <p
            class="body1 font-bold"
            :class="{
              'text-gray-900': sum === 100,
              'text-red-500': sum > 100,
              'text-gray-400': sum < 100,
            }"
          >
            {{ sum }}
          </p>
          <span
            class="text-xs"
            :class="{
              'text-gray-900': sum === 100,
              'text-red-500': sum > 100,
              'text-gray-400': sum < 100,
            }"
            >%</span
          >
        </div>
      </div>

      <p
        v-if="sum !== 100"
        class="px-4 pb-3 text-xs"
        :class="sum > 100 ? 'text-red-200' : 'text-blue-200'"
      >
        {{ sum > 100 ? '합계는 100%를 초과할 수 없습니다.' : '합계가 100%가 되도록 조정해주세요.' }}
      </p>
    </section>

    <SubmitButton block :disabled="!valid" @click="onSave" class="mt-6"> 수정 완료 </SubmitButton>
  </div>
</template>
