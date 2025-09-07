<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const isOpenDetail = ref(false);

const handleClick = () => {
  isOpenDetail.value = !isOpenDetail.value;
}
</script>

<template>
  <button
    class="flex justify-between items-center px-4 py-2 bg-kb-gray rounded-lg text-white"
    @click="handleClick"
  >
    <span class="button2">지출 상세보기</span>
    <Icon
      icon="material-symbols:arrow-forward-ios-rounded"
      :class="['size-4', isOpenDetail ? '-rotate-90' : 'rotate-90']"
    />
  </button>
</template>
