<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import BaseCard from '@/components/common/Card/BaseCard.vue';
import RatioTab from './radiotab/RatioTab.vue';
import DarkButton from '@/components/common/Button/DarkButton.vue';

import { getMonthlySpending } from '@/api/transactions';

const router = useRouter();
const goReports = () => router.push('/reports');

const total = ref(0);
const loading = ref(false);
const errorMsg = ref('');

const nowYm = () => {
  const d = new Date();
  const m = `${d.getMonth() + 1}`.padStart(2, '0');
  return `${d.getFullYear()}-${m}`;
};

const nfmt = (n) => (Number.isFinite(n) ? n.toLocaleString() : '0');

async function fetchMonthlyTotal(ym) {
  loading.value = true;
  errorMsg.value = '';
  try {
    const res = await getMonthlySpending({ month: ym });
    total.value = Number(res?.total) || 0;
  } catch (e) {
    console.error(e);
    errorMsg.value = '총 지출을 불러오지 못했습니다.';
    total.value = 0;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchMonthlyTotal(nowYm());
});
</script>

<template>
  <BaseCard>
    <div class="pb-4 flex items-center justify-between w-full">
      <div>
        <p class="body1 text-black">이번 달 총 지출</p>

        <h1 class="title1 text-black">
          <span v-if="loading" class="opacity-60">로딩중…</span>
          <span v-else>{{ nfmt(total) }}원</span>
        </h1>

        <p v-if="errorMsg" class="caption2 text-red-400 mt-1">{{ errorMsg }}</p>
      </div>

      <DarkButton @click="goReports">분석</DarkButton>
    </div>

    <RatioTab />
  </BaseCard>
</template>
