<script setup>
import { ref, onMounted, watch } from 'vue';
import { Icon } from '@iconify/vue';
import BaseCard from '@/components/common/Card/BaseCard.vue';
import ExpenseListItem from '@/components/reports/expense/ExpenseListItem.vue';
import ExpenseDetailModal from '@/components/reports/expense/ExpenseDetailModal.vue';
import AddExpenseModal from '@/components/reports/expense/AddExpenseModal.vue';
import { listTransactions } from '@/api/transactions';

const isAddModalOpen = ref(false);
const isDetailModalOpen = ref(false);
const currentItem = ref(null);

const handleClickAddButton = () => {
  isAddModalOpen.value = true;
}

const handleClickItem = (item) => {
  console.debug('[expense-list] click:', id);
  currentItem.value = item;
  isDetailModalOpen.value = true;
}

const props = defineProps({
  ym: { type: String, default: '' },
  from: { type: String, default: '' },
  to: { type: String, default: '' },
});

const loading = ref(false);
const error = ref('');
const sections = ref([]);

function defaultMonthRange(date = new Date()) {
  const y = date.getFullYear();
  const m = date.getMonth();
  const iso = (d) => d.toISOString().slice(0, 10);
  return { from: iso(new Date(y, m, 1)), to: iso(new Date(y, m + 1, 0)) };
}

function monthRangeFromYm(ym) {
  if (!/^\d{4}-\d{2}$/.test(ym || '')) return defaultMonthRange();
  const [y, m] = ym.split('-').map((v) => +v);
  const iso = (d) => d.toISOString().slice(0, 10);
  return { from: iso(new Date(y, m - 1, 1)), to: iso(new Date(y, m, 0)) };
}

function last30DaysRange() {
  const today = new Date();
  const past = new Date();
  past.setDate(today.getDate() - 30); // 오늘 기준 -30일

  const iso = (d) => d.toISOString().slice(0, 10);

  return { from: iso(past), to: iso(today) };
}

function safeDate(input) {
  return new Date(String(input).replace(' ', 'T'));
}

function fmtTimestamp(ts) {
  const d = safeDate(ts);
  if (Number.isNaN(d.getTime())) return String(ts);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function dayKey(ts) {
  const d = safeDate(ts);
  if (Number.isNaN(d.getTime())) return '0000-00-00';
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function dayLabelFromKey(key) {
  const [y, m, d] = key.split('-').map((v) => +v);
  if (!y || !m || !d) return key;
  return `${m}월 ${d}일`;
}

async function load() {
  loading.value = true;
  error.value = '';
  try {
    let range = { from: props.from, to: props.to };
    if (!range.from || !range.to) {
      range = props.ym ? monthRangeFromYm(props.ym) : last30DaysRange();
    }

    const res = await listTransactions({
      page: 1,
      size: 200,
      from: range.from,
      to: range.to,
    });

    const source = Array.isArray(res?.content) ? res.content : [];

    const expenses = source
      .filter((tx) => Number(tx.amount) < 0)
      .map((tx) => {
        const ts = safeDate(tx.transactionDateTime);
        return {
          id: tx.id ?? tx.transactionId ?? `${tx.name}-${tx.transactionDateTime}`,
          name: tx.name ?? tx.merchant ?? '(내역)',
          date: fmtTimestamp(tx.transactionDateTime),
          amount: Math.abs(Number(tx.amount)),
          category: tx.classification?.subcategory,
          _dayKey: dayKey(tx.transactionDateTime),
          _sortTs: ts.getTime(),
        };
      })
      .sort((a, b) => b._sortTs - a._sortTs);

    const groups = {};
    for (const it of expenses) {
      (groups[it._dayKey] ??= []).push(it);
    }

    sections.value = Object.keys(groups)
      .sort((a, b) => new Date(b) - new Date(a))
      .map((key) => ({
        key,
        label: dayLabelFromKey(key),
        items: groups[key],
      }));
  } catch (e) {
    console.error(e);
    error.value = '지출 내역을 불러오지 못했습니다.';
  } finally {
    loading.value = false;
  }
}

onMounted(load);
watch(() => [props.ym, props.from, props.to], load);

function onItemClick(id) {
  console.debug('[expense-list] click:', id);
}
</script>

<template>
  <BaseCard class="flex flex-col gap-3 relative">
    <Icon
      icon="material-symbols:add-2-rounded"
      class="fixed top-4 right-8 size-6 rounded-full text-gray-600 hover:text-black active:text-black active:bg-gray-200"
      @click="handleClickAddButton"
    />
    <div v-if="!sections.length" class="px-4 py-3 text-gray-500">표시할 내역이 없습니다.</div>
    <template v-else>
      <div v-for="section in sections" :key="section.key" class="flex flex-col gap-2">
        <h1 class="subtitle1 text-black">{{ section.label }}</h1>
        <div class="flex flex-col -mx-4">
          <ExpenseListItem
            v-for="item in section.items"
            :key="item.id"
            v-bind="item"
            @click="onItemClick"
          />
        </div>
      </div>
    </template>
<!--    <h1 class="subtitle1 text-black">9월 8일</h1>-->
<!--    <div class="flex flex-col -mx-4">-->
<!--      <ExpenseListItem-->
<!--        v-for="item in data"-->
<!--        :key="item.id"-->
<!--        :category="item.category"-->
<!--        :name="item.name"-->
<!--        :date="item.date"-->
<!--        :amount="item.amount"-->
<!--        @click="handleClickItem(item)"-->
<!--      />-->
<!--    </div>-->
    <ExpenseDetailModal v-model="isDetailModalOpen" :data="currentItem" />
    <AddExpenseModal v-model="isAddModalOpen" />
  </BaseCard>
</template>
