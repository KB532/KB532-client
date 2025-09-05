<script setup>
import { ref, watch, computed } from 'vue';

const props = defineProps({
  modelValue: { type: String, default: '' },
  maxChars: { type: Number, default: 100 },
  placeholder: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  readonly: { type: Boolean, default: false },
});

const emit = defineEmits(['update:modelValue']);

const val = ref(props.modelValue);

watch(
  () => props.modelValue,
  (v) => {
    if (v !== val.value) val.value = v ?? '';
  },
);

watch(val, (v) => {
  if (v.length > props.maxChars) {
    val.value = v.slice(0, props.maxChars);
    return;
  }
  emit('update:modelValue', val.value);
});

const count = computed(() => `${val.value.length}/${props.maxChars}`);
</script>

<template>
  <div
    class="rounded-lg border border-gray-600 bg-white p-3 focus-within:border-gray-400 has-[:disabled]:border-gray-300 has-[:disabled]:bg-gray-100"
  >
    <textarea
      v-model="val"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      class="min-h-[96px] w-full resize-none bg-transparent text-black outline-none disabled:cursor-not-allowed caption2 placeholder:text-gray-600"
    />
    <div class="mt-1 text-right text-xs text-gray-600">{{ count }}</div>
  </div>
</template>
