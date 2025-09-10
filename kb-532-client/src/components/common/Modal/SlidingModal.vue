<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: Boolean,
  width: {
    type: [String, Number],
  },
});

const emits = defineEmits(['update:modelValue']);

const model = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emits('update:modelValue', value);
  },
});
</script>

<template>
  <v-bottom-sheet v-model="model" :width="props.width">
    <div class="bg-white rounded-t-xl p-4 pb-20 min-h-20">
      <slot />
    </div>
  </v-bottom-sheet>
</template>
