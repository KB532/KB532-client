<script setup>
import { ref, computed, watch } from 'vue';
import { Icon } from '@iconify/vue';
import SlidingModal from '@/components/common/Modal/SlidingModal.vue';
import DropdownItem from '@/components/common/Item/DropdownItem.vue';
import DropdownModal from '@/components/common/Modal/DropdownModal.vue';
import DarkButton from '@/components/common/Button/DarkButton.vue';
import { numberWithCommas } from '@/assets/utils/index.js';

import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({
  modelValue: Boolean,
});

const emits = defineEmits(['update:modelValue']);

const handleClose = () => {
  emits('update:modelValue', false);
};

const openedDropdown = ref(null);
const paymentMethod = ref('');
const category = ref('');
const date = ref('');
const amount = ref('');
const name = ref('');
const memo = ref('');

const toggleDropdown = (key) => {
  openedDropdown.value = openedDropdown.value === key ? null : key;
};

const handleSelect = (key, value) => {
  if (key === 'payment') {
    paymentMethod.value = value;
  } else if (key === 'category') {
    category.value = value;
  }
  openedDropdown.value = null;
}

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
  '기타 지출'
];

const isFormValid = computed(() => {
  return (
    paymentMethod.value &&
    category.value &&
    date.value &&
    amount.value &&
    name.value
  );
});

const resetForm = () => {
  paymentMethod.value = '';
  category.value = '';
  date.value = '';
  amount.value = '';
  name.value = '';
  memo.value = '';
  openedDropdown.value = null;
};

watch(
  () => props.modelValue,
  (newVal) => {
    if (!newVal) {
      resetForm();
    }
  }
);
</script>

<template>
  <SlidingModal v-model="props.modelValue" class="gap-2">
    <Icon
      icon="material-symbols:close-rounded"
      class="fixed top-4 right-4 size-6 text-gray-600 hover:text-black"
      @click="handleClose"
    />
    <div class="flex flex-col gap-4 mt-4">
      <h1 class="title3 text-black">지출 내역 등록</h1>

      <div class="relative">
        <div class="flex justify-between">
          <p class="body1 text-kb-gray-dark">결제 수단</p>
          <DropdownItem
            :title="paymentMethod || '선택'"
            :isOpen="openedDropdown === 'payment'"
            @click="toggleDropdown('payment')"
          />
        </div>
        <div
          v-if="openedDropdown === 'payment'"
          class="absolute right-0 mt-2 z-50"
        >
          <DropdownModal
            :data="['카드', '현금', '계좌이체']"
            @select="(v) => handleSelect('payment', v)"
          />
        </div>
      </div>

      <div class="relative">
        <div class="flex justify-between">
          <p class="body1 text-kb-gray-dark">지출 카테고리</p>
          <DropdownItem
            :title="category || '선택'"
            :isOpen="openedDropdown === 'category'"
            @click="toggleDropdown('category')"
          />
        </div>
        <div
          v-if="openedDropdown === 'category'"
          class="absolute right-0 mt-2 z-50"
        >
          <DropdownModal
            :data="categories"
            @select="(v) => handleSelect('category', v)"
          />
        </div>
      </div>

      <div class="flex justify-between items-center">
        <p class="body1 text-kb-gray-dark">지출 일시</p>
        <div class="w-3/4">
          <VueDatePicker v-model="date" text-input>
            <template #dp-input="{ value, onInput, onFocus, onBlur }">
              <input
                :value="value"
                @input="onInput"
                @focus="onFocus"
                @blur="onBlur"
                class="w-full h-12 px-4 py-0 leading-[49px] rounded-lg bg-white shadow-drop-shadow outline-none ring-1 ring-gray-200 placeholder:text-gray-600 disabled:bg-gray-100 disabled:text-gray-400 body2 text-black"
                placeholder="지출 날짜를 선택해 주세요"
              />
            </template>
          </VueDatePicker>
        </div>
      </div>

      <div class="flex justify-between items-center">
        <p class="body1 text-kb-gray-dark">금액</p>
        <input
          v-model="amount"
          class="w-3/4 h-12 px-4 py-0 leading-[49px] rounded-lg bg-white shadow-drop-shadow outline-none ring-1 ring-gray-200 placeholder:text-gray-600 disabled:bg-gray-100 disabled:text-gray-400 body2 text-black"
          placeholder="지출 금액을 입력해 주세요"
          type="text"
          inputmode="numeric"
          @input="amount = amount.replace(/[^0-9]/g, '')"
        />
      </div>
      <div class="flex justify-between items-center">
        <p class="body1 text-kb-gray-dark">이름</p>
        <input
          v-model="name"
          class="w-3/4 h-12 px-4 py-0 leading-[49px] rounded-lg bg-white shadow-drop-shadow outline-none ring-1 ring-gray-200 placeholder:text-gray-600 disabled:bg-gray-100 disabled:text-gray-400 body2 text-black"
          placeholder="지출 이름을 입력해 주세요"
        />
      </div>
      <div class="flex justify-between items-center">
        <p class="body1 text-kb-gray-dark">메모</p>
        <input
          v-model="memo"
          class="w-3/4 h-12 px-4 py-0 leading-[49px] rounded-lg bg-white shadow-drop-shadow outline-none ring-1 ring-gray-200 placeholder:text-gray-600 disabled:bg-gray-100 disabled:text-gray-400 body2 text-black"
          placeholder="메모를 입력해 주세요"
          maxlength="50"
        />
      </div>
      <DarkButton class="mt-2" :disabled="!isFormValid">등록하기</DarkButton>
    </div>
  </SlidingModal>
</template>
