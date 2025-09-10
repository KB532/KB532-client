<script setup>
import { ref, onMounted } from 'vue';
import BaseCard from '@/components/common/Card/BaseCard.vue';
import ExpenseListItem from '@/components/reports/expense/ExpenseListItem.vue';
import ScrollFadeOverlay from '@/components/common/Overlay/ScrollFadeOverlay.vue';
import { listTransactions } from '@/api/transactions';

const listRef = ref(null);
const isAtBottom = ref(false);
const loading = ref(false);
const error = ref('');
const data = ref([]);

const handleScroll = () => {
  const el = listRef.value;
  if (!el) return;
  isAtBottom.value = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
};

function isUncategorized(tx) {
  const c = tx?.classification;
  if (!c) return true;
  const cat = (c.category || '').toUpperCase();
  const status = (c.status || '').toUpperCase();
  const sub = (c.subcategory || '').trim();
  return (
    cat === 'UNCATEGORIZED' ||
    status === 'UNCATEGORIZED' ||
    status === 'UNSET' ||
    status === 'NONE' ||
    sub === ''
  );
}

function fmt(dt) {
  const s = String(dt).replace(' ', 'T');
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return String(dt);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function toIconKey(tx) {
  const c = tx?.classification;
  if (!c) return 'uncategorized';
  const sub = (c.subcategory || '').trim();

  const map = {
    '카페·간식': 'snack',
    외식: 'dining',
    쇼핑: 'shopping',
    교통: 'transport',
    주유: 'fuel',
    '마트·편의점': 'groceries',
    문화생활: 'culture',
  };

  if (!sub) return 'uncategorized';
  return map[sub] || 'discretionary';
}

async function load() {
  loading.value = true;
  error.value = '';
  try {
    const res = await listTransactions({ page: 1, size: 50 });

    const source = Array.isArray(res?.content) ? res.content : [];
    const items = source
      .filter((tx) => Number(tx.amount) < 0 && isUncategorized(tx))
      .sort((a, b) => new Date(b.transactionDateTime) - new Date(a.transactionDateTime))
      .map((tx) => ({
        id: tx.id ?? tx.transactionId ?? `${tx.name}-${tx.transactionDateTime}`,
        name: tx.name ?? tx.merchant ?? '(내역)',
        date: fmt(tx.transactionDateTime),
        amount: Math.abs(Number(tx.amount)),
        category: toIconKey(tx),
      }));

    data.value = items;
  } catch (e) {
    console.error(e);
    error.value = '미분류 내역을 불러오지 못했습니다.';
  } finally {
    loading.value = false;
  }
}

function onSelect(id) {
  console.debug('[uncat] clicked:', id);
}

onMounted(load);
</script>

<template>
  <BaseCard class="flex flex-col gap-1 relative pb-8">
    <div class="flex flex-col gap-1">
      <h1 class="subtitle1 text-black">
        <span class="text-red-200">미분류</span>된 지출 내역이 있어요!
      </h1>
      <p class="caption2 text-gray-600">내역을 눌러서 카테고리를 설정해 주세요.</p>
    </div>

    <div class="caption2 text-red-500" v-if="error">{{ error }}</div>

    <div
      ref="listRef"
      class="flex flex-col -mx-4 -mb-4 max-h-52 overflow-y-auto"
      @scroll="handleScroll"
    >
      <template>
        <ExpenseListItem v-for="item in data" :key="item.id" v-bind="item" @click="onSelect" />
      </template>
    </div>

    <ScrollFadeOverlay :isAtBottom="isAtBottom" />
  </BaseCard>
</template>
