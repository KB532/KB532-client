<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  modelValue: Boolean,
  selectedYear: Number,
});

const emits = defineEmits(['update:modelValue', 'selectMonth']);

const handleClose = () => {
  emits('update:modelValue', false);
};

const handleSelect = (month) => {
  emits('selectMonth', month);
  close();
};
</script>

<template>
<!--  Todo: 배경 클릭시에도 모달이 닫힐 수 있도록-->
  <v-bottom-sheet v-model="props.modelValue">
    <div class="rounded-t-xl bg-white">
      <div class="flex justify-between p-4">
        <h1 class="subtitle1 text-black">월 선택하기</h1>
        <Icon
          icon="material-symbols:close-rounded"
          class="size-6 text-gray-600 hover:text-black"
          @click="handleClose"
        />
      </div>

<!--      Todo: 현재 월을 기준으로 내림차순하기-->
      <div
        v-for="m in 12"
        :key="m"
        @click="handleSelect(m)"
        class="cursor-pointer body2 text-black px-4 py-2 hover:bg-gray-200"
      >
        {{ props.selectedYear }}년 {{ m }}월
      </div>
    </div>
  </v-bottom-sheet>
</template>
