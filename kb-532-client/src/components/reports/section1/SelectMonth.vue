<script setup>
import { Icon } from '@iconify/vue';
</script>

<template>
  <div class="flex items-center gap-2">
    <Icon
      icon="fluent:triangle-left-12-filled"
      class="text-black size-3"
    />
    <div class="flex items-center gap-1 text-black subtitle1">
      <u>9월</u>
      <p>총 지출</p>
    </div>
    <Icon
      icon="fluent:triangle-left-12-filled"
      class="text-gray-600 size-3 rotate-180"
    />
  </div>
</template>
