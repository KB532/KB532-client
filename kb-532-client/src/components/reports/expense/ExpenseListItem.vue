<script setup>
import CategoryIcon from '@/components/common/Avatar/IconAvatar.vue';
import { numberWithCommas } from '@/assets/utils/index.js';

const props = defineProps({
  category: String,
  name: String,
  date: String,
  amount: Number,
});
</script>

<template>
  <div class="flex justify-between items-center p-4 hover:bg-gray-100 active:bg-gray-100">
    <div class="flex gap-3">
      <CategoryIcon :category="props.category" />
      <div>
        <p class="body2 text-black">{{ props.name || '-' }}</p>
        <p class="caption3 text-gray-600">{{ props.date || '-' }}</p>
      </div>
    </div>
    <p class="subtitle1 text-black">{{ numberWithCommas(props.amount) || '0' }}원</p>
  </div>
</template>
