<script setup>
const props = defineProps({
  isAtBottom: {
    type: Boolean,
    required: true
  }
});
</script>

<!--사용할 때 부모 영역에 relative 속성 넣어줘야 함-->
<template>
  <div
    v-if="!isAtBottom"
    class="pointer-events-none absolute bottom-0 left-0 right-0 h-16 rounded-b-lg bg-gradient-to-t from-white to-transparent"
  />
</template>
