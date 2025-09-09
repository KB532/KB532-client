<script setup>
import SlidingModal from '@/components/common/Modal/SlidingModal.vue';

const props = defineProps({
  modelValue: Boolean,
});
</script>

<template>
  <SlidingModal v-model="props.modelValue">
    ddfdf
  </SlidingModal>
</template>
