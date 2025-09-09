<script setup>
import { Icon } from '@iconify/vue';
import SlidingModal from '@/components/common/Modal/SlidingModal.vue';
import CategoryIcon from '@/components/common/Avatar/IconAvatar.vue';
import Divider from '@/components/common/Divider/Divider.vue';
import { numberWithCommas } from '@/assets/utils/index.js';

const props = defineProps({
  modelValue: Boolean,
  data: Object,
});

const emits = defineEmits(['update:modelValue']);

const handleClose = () => {
  emits('update:modelValue', false);
}
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
      <div class="flex items-center justify-between body1">
        <p class="text-kb-gray-dark">카테고리 설정</p>
        <div class="flex gap-2 items-center">
          <p class="text-red-200">미분류</p>
          <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="size-4 text-gray-600 -rotate-90" />
        </div>
      </div>
      <div class="flex items-center justify-between body1">
        <p class="text-kb-gray-dark">메모</p>
        <div class="flex gap-2 items-center">
          <p class="text-blue-200">메모를 남겨보세요</p>
          <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="size-4 text-gray-600 -rotate-90" />
        </div>
      </div>
      <div class="flex items-center justify-between body1">
        <p class="text-kb-gray-dark">지출 합계에 포함</p>
        <div class="flex gap-2 items-center">
          <p class="text-blue-200">메모를 남겨보세요</p>
          <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="size-4 text-gray-600 -rotate-90" />
        </div>
      </div>
      <Divider />
      <div class="flex items-center justify-between body1">
        <p class="text-kb-gray-dark">결제 수단</p>
        <div class="flex gap-2 items-center">
          <p class="text-blue-200">카드</p>
          <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="size-4 text-gray-600 -rotate-90" />
        </div>
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
  </SlidingModal>
</template>
