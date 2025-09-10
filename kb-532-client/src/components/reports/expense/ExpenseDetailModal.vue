<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';
import SlidingModal from '@/components/common/Modal/SlidingModal.vue';
import CategoryIcon from '@/components/common/Avatar/IconAvatar.vue';
import Divider from '@/components/common/Divider/Divider.vue';
import Switch from '@/components/common/Switch/Switch.vue';
import DropdownItem from '@/components/common/Item/DropdownItem.vue';
import DropdownModal from '@/components/common/Modal/DropdownModal.vue';
import { numberWithCommas } from '@/assets/utils/index.js';

const props = defineProps({
  modelValue: Boolean,
  data: Object,
});

const emits = defineEmits(['update:modelValue']);

const handleClose = () => {
  emits('update:modelValue', false);
};

const openedDropdown = ref(null);

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
    <div class="flex flex-col gap-4 mt-8">
      <div class="flex gap-2 items-center">
        <CategoryIcon class="size-6" :category="props.data?.category" />
        <p class="body1 text-black">{{ props.data?.name }}</p>
      </div>
      <div class="flex items-center gap-2">
        <h1 class="title1 text-black">-{{ numberWithCommas(props.data?.amount) }}원</h1>
        <Icon icon="bxs:pencil" class="text-gray-600 size-6 hover:text-black active:text-black" />
      </div>
      <Divider />
      <div
        class="flex items-center justify-between body1"
        @click="toggleDropdown('category')"
      >
        <p class="text-kb-gray-dark">카테고리 설정</p>
        <DropdownItem
          title="미분류"
          :isOpen="openedDropdown === 'category'"
        />
      </div>
      <div
        class="flex items-center justify-between body1"
        @click="toggleDropdown('memo')"
      >
        <p class="text-kb-gray-dark">메모</p>
        <DropdownItem
          title="메모를 남겨보세요"
          :isOpen="openedDropdown === 'memo'"
        />
      </div>
      <div class="flex items-center justify-between body1">
        <p class="text-kb-gray-dark">지출 합계에 포함</p>
        <Switch />
      </div>
      <Divider />
      <div
        class="flex items-center justify-between body1"
        @click="toggleDropdown('payment')"
      >
        <p class="text-kb-gray-dark">결제 수단</p>
        <DropdownItem
          title="카드"
          :isOpen="openedDropdown === 'payment'"
        />
      </div>
      <div class="flex items-center justify-between body1 text-kb-gray-dark">
        <p>결제 일시</p>
        <p>{{ props.data.date }}</p>
      </div>
<!--      Todo: 사용처 name이 아니고 데이터에 맞게 바꿔야 함-->
      <div class="flex items-center justify-between body1 text-kb-gray-dark">
        <p>사용처</p>
        <p>{{ props.data.name }}</p>
      </div>
    </div>
    <DropdownModal
      :data="categories"
    />
  </SlidingModal>
</template>
