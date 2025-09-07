<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  modelValue: Boolean,
  onClick: Function,
});
</script>

<template>
  <button
    class="flex justify-between items-center px-4 py-2 bg-kb-gray rounded-lg text-white"
    @click="props.onClick"
  >
    <span class="button2">지출 상세보기</span>
    <Icon
      icon="material-symbols:arrow-forward-ios-rounded"
      :class="['size-4', props.modelValue ? '-rotate-90' : 'rotate-90']"
    />
  </button>
</template>
