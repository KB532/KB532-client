<script setup>
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import SlidingModal from '@/components/common/Modal/SlidingModal.vue';
import CategoryIcon from '@/components/common/Avatar/IconAvatar.vue';
import Divider from '@/components/common/Divider/Divider.vue';
import Switch from '@/components/common/Switch/Switch.vue';
import DropdownItem from '@/components/common/Item/DropdownItem.vue';
import DropdownModal from '@/components/common/Modal/DropdownModal.vue';
import { numberWithCommas } from '@/assets/utils/index.js';
import DarkButton from '@/components/common/Button/DarkButton.vue';
import { iconKeyFromSubcategory } from '@/utils/subcategoryIcon';
import { updateTransaction } from '@/api/transactions';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  data: { type: Object, default: null },
});

const emits = defineEmits(['update:modelValue', 'updated']);

const handleClose = () => emits('update:modelValue', false);

const openedDropdown = ref(null);
const toggleDropdown = (key) => {
  openedDropdown.value = openedDropdown.value === key ? null : key;
};

const selectedCategory = ref('미분류');
const memoText = ref('');
const paymentMethod = ref('카드');
const paidAt = ref('');
const categoryIconKey = ref('uncategorized');

function toCategoryLabel(d) {
  return d?.classification?.subcategory || '미분류';
}
function toPaymentLabel(d) {
  const raw = (d?.method ?? '').toString().toUpperCase();
  if (raw === 'CARD' || raw === '카드') return '카드';
  if (raw === 'CASH' || raw === '현금') return '현금';
  if (raw === 'TRANSFER' || raw === '계좌이체') return '계좌이체';
  return '카드';
}
function toPaidAt(d) {
  const iso = d?.transactionDateTime || d?.date || '';
  if (!iso) return '';
  try {
    const dt = new Date(iso);
    const yyyy = dt.getFullYear();
    const mm = String(dt.getMonth() + 1).padStart(2, '0');
    const dd = String(dt.getDate()).padStart(2, '0');
    const hh = String(dt.getHours()).padStart(2, '0');
    const mi = String(dt.getMinutes()).padStart(2, '0');
    return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
  } catch {
    return iso;
  }
}
function toIconKey(d) {
  const sub = d?.classification?.subcategory;
  const key = iconKeyFromSubcategory ? iconKeyFromSubcategory(sub) : 'uncategorized';
  return key || 'uncategorized';
}

watch(
  () => props.data,
  (d) => {
    if (!d) return;
    selectedCategory.value = toCategoryLabel(d);
    paymentMethod.value = toPaymentLabel(d);
    paidAt.value = toPaidAt(d);
    categoryIconKey.value = toIconKey(d);
    memoText.value = d?.memo ?? '';
  },
  { immediate: true },
);

/* 드롭다운 핸들러 */
const onSelectCategory = (v) => {
  selectedCategory.value = v;
  openedDropdown.value = null;
};
const onConfirmMemo = (v) => {
  memoText.value = v || '';
  openedDropdown.value = null;
};
const onSelectPayment = (v) => {
  paymentMethod.value = v;
  openedDropdown.value = null;
};

const categories = [
  '쇼핑',
  '보험·대출·기타금융',
  '식비',
  '이체',
  '교통',
  '의료·건강·피트니스',
  '주거·통신',
  '생활',
  '카페·간식',
  '기타 지출',
];

const isSaving = ref(false);
const saveError = ref('');

function paymentToServer(label) {
  if (label === '카드') return 'CARD';
  if (label === '현금') return 'CASH';
  if (label === '계좌이체') return 'TRANSFER';
  return 'CARD';
}

async function handleConfirm() {
  if (!props.data?.id) {
    return handleClose();
  }

  isSaving.value = true;
  saveError.value = '';

  const payload = {
    memo: memoText.value,
    method: paymentToServer(paymentMethod.value),
    classification: {
      category: props.data?.classification?.category ?? 'DISCRETIONARY',
      subcategory: selectedCategory.value,
    },
  };

  try {
    const updated = await updateTransaction(props.data.id, payload);
    emits('updated', updated ?? payload);
    emits('update:modelValue', false);
  } catch (e) {
    console.error('[ExpenseDetailModal] update error:', e);
    saveError.value = '저장에 실패했어요. 잠시 후 다시 시도해 주세요.';
  } finally {
    isSaving.value = false;
  }
}
</script>

<template>
  <SlidingModal
    :model-value="props.modelValue"
    @update:model-value="emits('update:modelValue', $event)"
    width="375"
  >
    <Icon
      icon="material-symbols:close-rounded"
      class="fixed top-4 right-4 size-6 text-gray-600 hover:text-black"
      @click="handleClose"
    />

    <div class="flex flex-col gap-4 mt-8">
      <div class="flex gap-2 items-center">
        <CategoryIcon class="size-8" :category="categoryIconKey" />
        <p class="body1 text-black">{{ props.data?.name }}</p>
      </div>

      <div class="flex items-center gap-2">
        <h1 class="title1 text-black">
          -{{ numberWithCommas(Math.abs(props.data?.amount ?? 0)) }}원
        </h1>
        <Icon icon="bxs:pencil" class="text-gray-600 size-6 hover:text-black active:text-black" />
      </div>

      <Divider />

      <div class="relative">
        <div class="flex items-center justify-between body1" @click="toggleDropdown('category')">
          <p class="text-kb-gray-dark">카테고리 설정</p>
          <DropdownItem :title="selectedCategory" :isOpen="openedDropdown === 'category'" />
        </div>
        <div v-if="openedDropdown === 'category'" class="absolute right-0 mt-2 z-50">
          <DropdownModal :data="categories" @select="onSelectCategory" />
        </div>
      </div>

      <div class="relative">
        <div class="flex items-center justify-between body1" @click="toggleDropdown('memo')">
          <p class="text-kb-gray-dark">메모</p>
          <DropdownItem
            :title="memoText || '메모를 남겨보세요'"
            :isOpen="openedDropdown === 'memo'"
          />
        </div>
        <div v-if="openedDropdown === 'memo'" class="absolute right-0 mt-2 z-50">
          <DropdownModal type="input" @confirm="onConfirmMemo" />
        </div>
      </div>

      <div class="flex items-center justify-between body1">
        <p class="text-kb-gray-dark">지출 합계에 포함</p>
        <Switch />
      </div>

      <Divider />

      <div class="relative">
        <div class="flex items-center justify-between body1" @click="toggleDropdown('payment')">
          <p class="text-kb-gray-dark">결제 수단</p>
          <DropdownItem :title="paymentMethod" :isOpen="openedDropdown === 'payment'" />
        </div>
        <div v-if="openedDropdown === 'payment'" class="absolute right-0 mt-2 z-50">
          <DropdownModal :data="['카드', '현금', '계좌이체']" @select="onSelectPayment" />
        </div>
      </div>

      <div class="flex items-center justify-between body1 text-kb-gray-dark">
        <p>결제 일시</p>
        <p>{{ paidAt }}</p>
      </div>

      <div class="flex items-center justify-between body1 text-kb-gray-dark">
        <p>사용처</p>
        <p>{{ props.data?.merchant || props.data?.name }}</p>
      </div>

      <p v-if="saveError" class="text-red-500 body2 mt-2">{{ saveError }}</p>
    </div>

    <DarkButton
      block
      class="mt-4 h-11 disabled:opacity-60"
      :disabled="isSaving || !props.data?.id"
      @click="handleConfirm"
    >
      {{ isSaving ? '저장 중...' : '확인' }}
    </DarkButton>
  </SlidingModal>
</template>
