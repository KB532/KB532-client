<script setup>
import { Icon } from '@iconify/vue';

const props = defineProps({
  modelValue: Boolean,
});

const emits = defineEmits(['update:modelValue']);

const handleClose = () => {
  emits('update:modelValue', false);
};
</script>

<template>
  <v-bottom-sheet v-model="props.modelValue">
    <div class="rounded-t-xl bg-white p-4 min-h-20">
      <Icon
        icon="material-symbols:close-rounded"
        class="fixed top-4 right-4 size-6 text-gray-600 hover:text-black"
        @click="handleClose"
      />
      <slot />
    </div>
  </v-bottom-sheet>
</template>
