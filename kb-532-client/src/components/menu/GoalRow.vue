<script setup>
import ProgressBar from '@/components/menu/ProgressBar.vue'
const props = defineProps({
  label: { type: String, required: true },
  value: { type: Number, required: true },
  color: { type: String, default: undefined }
})
</script>

<template>
  <div class="row">
    <div class="top">
      <span class="label">{{ label }}</span>
      <span class="value">{{ value }}%</span>
    </div>
    <ProgressBar :value="value" :color="color" />
  </div>
</template>

<style scoped>
.row { display: grid; gap: 6px; }
.top { display: flex; align-items: center; justify-content: space-between; font-size: 13px; color: var(--muted); }
</style>
