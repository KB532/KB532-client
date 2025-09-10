<script setup>
import CategoryIcon from '@/components/common/Avatar/IconAvatar.vue';
import { numberWithCommas } from '@/assets/utils/index.js';

const props = defineProps({
  id: [String, Number],
  category: String,
  name: String,
  date: String,
  amount: [Number, String],
});

const emit = defineEmits(['click']);
</script>

<template>
  <div
    class="flex justify-between items-center p-4 hover:bg-gray-100 active:bg-gray-100 cursor-pointer"
    role="button"
    tabindex="0"
    @click="emit('click', props.id)"
    @keyup.enter="emit('click', props.id)"
  >
    <div class="flex gap-3">
      <CategoryIcon :category="props.category || 'uncategorized'" />
      <div>
        <p class="body2 text-black">{{ props.name }}</p>
        <p class="caption3 text-gray-600">{{ props.date }}</p>
      </div>
    </div>

    <p class="subtitle1 text-black">{{ numberWithCommas(+props.amount || 0) }}원</p>
  </div>
</template>
