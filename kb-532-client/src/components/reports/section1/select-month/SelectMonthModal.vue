<script setup>
import { Icon } from '@iconify/vue';
import {computed} from "vue";

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

const today = new Date();
const thisMonth = today.getMonth();
const thisYear = today.getFullYear();
const monthsList = computed(() => {
  const arr = [];
  let year = thisYear;
  let month = thisMonth;

  for (let i = 0; i < 12; i++) {
    arr.push({ year, month });

    month -= 1;
    if (month === 0) {
      month = 12;
      year -= 1;
    }
  }
  return arr;
});
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

      <div
        v-for="({ year, month }, i) in monthsList"
        :key="i"
        @click="handleSelect(month)"
        class="cursor-pointer body2 text-black px-4 py-2 hover:bg-gray-200"
      >
        {{ year }}년 {{ month }}월
      </div>
    </div>
  </v-bottom-sheet>
</template>
