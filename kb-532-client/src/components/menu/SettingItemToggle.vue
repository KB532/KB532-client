<script setup>
import ToggleSwitch from '@/components/menu/ToggleSwitch.vue'

const props = defineProps({
  label:      { type: String, required: true },
  modelValue: { type: Boolean, required: true },
  disabled:   { type: Boolean, default: false }
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="item">
    <span>{{ label }}</span>
    <ToggleSwitch :model-value="modelValue" :disabled="disabled" @update:model-value="v => $emit('update:modelValue', v)" />
  </div>
</template>

<style scoped>
.item { display: flex; align-items: center; justify-content: space-between; padding: 10px 2px; border-top: 1px solid var(--border); }
.item:first-of-type { border-top: 0; }
.item span { font-size: 14px; color: var(--text); }
</style>
