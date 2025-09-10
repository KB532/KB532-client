<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  title: String,
});
</script>

<template>
  <div class="flex gap-2 items-center rounded-md hover:bg-gray-200 active:bg-gray-200">
    <p :class="title === '미분류' ? 'text-red-200' : 'text-blue-200'">
      {{ props.title }}
    </p>
    <Icon icon="material-symbols:arrow-back-ios-new-rounded" class="size-4 text-gray-600 -rotate-90" />
  </div>
</template>
