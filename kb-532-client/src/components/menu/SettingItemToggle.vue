<script setup>
import ToggleSwitch from '@/components/menu/ToggleSwitch.vue';

defineProps({
  label: { type: String, required: true },
  modelValue: { type: Boolean, required: true },
  disabled: { type: Boolean, default: false },
});
defineEmits(['update:modelValue']);
</script>

<template>
  <div class="flex items-center justify-between mx-3">
    <span class="caption2">{{ label }}</span>
    <ToggleSwitch
      :model-value="modelValue"
      :disabled="disabled"
      @update:model-value="(v) => $emit('update:modelValue', v)"
    />
  </div>
</template>
