<script setup>
import { ref, onMounted } from 'vue';
import BaseTab from '@/components/common/Tab/BaseTab.vue';
import ExpenseRadioChart from './radiochart/ExpenseRadioChart.vue';
import TargetRatioChart from './radiochart/TargetRatioChart.vue';
import { getBudgetSummary } from '@/api/budget';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';

const tabs = [
  { label: '지출 비율', value: 'spending' },
  { label: '목표 비율', value: 'goal' },
];

const currentTab = ref('spending');

const loading = ref(false);
const error = ref('');
const actual = ref({ essential: 50, discretionary: 30, savings: 20 });
const target = ref({ essential: 50, discretionary: 30, savings: 20 });

const pct = (v) => Math.round(Number(v || 0) * 100);

const router = useRouter();
const goGoalSettings = () => {
  router.push('/goals/edit');
};

async function load() {
  loading.value = true;
  error.value = '';
  try {
    const data = await getBudgetSummary();

    const a = data?.data?.actual || data?.actual || {};
    actual.value = {
      essential: pct(a.essential),
      discretionary: pct(a.discretionary),
      savings: pct(a.savings),
    };

    const t = data?.data?.target || data?.data?.goal || data?.target || data?.goal || {};
    const toPct = (x) => (x <= 1 ? Math.round(Number(x || 0) * 100) : Math.round(Number(x || 0)));
    if (Object.keys(t).length) {
      target.value = {
        essential: toPct(t.essential ?? 50),
        discretionary: toPct(t.discretionary ?? 30),
        savings: toPct(t.savings ?? 20),
      };
    }
  } catch (e) {
    error.value = e.message || '불러오기 실패';
  } finally {
    loading.value = false;
  }
}

onMounted(load);
</script>

<template>
  <BaseTab v-model="currentTab" :tabs="tabs" />

  <div class="mt-4">
    <div v-if="currentTab === 'spending'">
      <ExpenseRadioChart :actual="actual" class="mt-8" />
    </div>

    <div v-else-if="currentTab === 'goal'">
      <div class="flex items-center justify-end caption3 text-gray-600">
        <button
          type="button"
          class="inline-flex items-center gap-1 hover:opacity-80 active:opacity-60 caption3 text-gray-600"
          @click="goGoalSettings"
        >
          <span class="align-middle">목표 비율 설정</span>
          <Icon
            icon="material-symbols:settings-rounded"
            width="16"
            height="16"
            class="align-middle mr-2"
          />
        </button>
      </div>

      <TargetRatioChart :actual="actual" :target="target" />
    </div>
  </div>
</template>
