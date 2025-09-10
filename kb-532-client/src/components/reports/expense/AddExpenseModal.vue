<script setup>
import { ref } from 'vue';
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
const date = ref(null);

const toggleDropdown = (key) => {
  openedDropdown.value = openedDropdown.value === key ? null : key;
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
  '기타 지출'
];
</script>

<template>
  <SlidingModal v-model="props.modelValue" class="gap-2">
    <Icon
      icon="material-symbols:close-rounded"
      class="fixed top-4 right-4 size-6 text-gray-600 hover:text-black"
      @click="handleClose"
    />
    <div class="flex flex-col gap-4 mt-4">
      <h1 class="subtitle1 text-black">지출 내역 등록</h1>
      <div
        class="flex justify-between"
        @click="toggleDropdown('payment')"
      >
        <p class="body1 text-kb-gray-dark">결제 수단</p>
        <DropdownItem
          title="카드"
          :isOpen="openedDropdown === 'payment'"
        />
      </div>
      <div
        class="flex justify-between"
        @click="toggleDropdown('category')"
      >
        <p class="body1 text-kb-gray-dark">지출 카테고리</p>
        <DropdownItem
          title="미분류"
          :isOpen="openedDropdown === 'category'"
        />
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
          class="w-3/4 h-12 px-4 py-0 leading-[49px] rounded-lg bg-white shadow-drop-shadow outline-none ring-1 ring-gray-200 placeholder:text-gray-600 disabled:bg-gray-100 disabled:text-gray-400 body2 text-black"
          placeholder="지출 금액을 입력해 주세요"
          type="number"
        />
      </div>
      <div class="flex justify-between items-center">
        <p class="body1 text-kb-gray-dark">이름</p>
        <input
          class="w-3/4 h-12 px-4 py-0 leading-[49px] rounded-lg bg-white shadow-drop-shadow outline-none ring-1 ring-gray-200 placeholder:text-gray-600 disabled:bg-gray-100 disabled:text-gray-400 body2 text-black"
          placeholder="지출 이름을 입력해 주세요"
        />
      </div>
      <div class="flex justify-between items-center">
        <p class="body1 text-kb-gray-dark">메모</p>
        <input
          class="w-3/4 h-12 px-4 py-0 leading-[49px] rounded-lg bg-white shadow-drop-shadow outline-none ring-1 ring-gray-200 placeholder:text-gray-600 disabled:bg-gray-100 disabled:text-gray-400 body2 text-black"
          placeholder="메모를 입력해 주세요"
        />
      </div>
      <DarkButton class="mt-2" :disabled="true">등록하기</DarkButton>
    </div>
  </SlidingModal>
</template>
