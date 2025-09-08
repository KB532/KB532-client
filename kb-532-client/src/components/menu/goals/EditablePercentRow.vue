<script setup>
const props = defineProps({
  label: { type: String, required: true },
  color: { type: String, required: true },
  modelValue: { type: Number, required: true },
})
const emit = defineEmits(['update:modelValue'])

const clamp = n => Math.min(100, Math.max(0, Math.round(Number(n) || 0)))
const onInput = e => emit('update:modelValue', clamp(e.target.value))
</script>

<template>
  <div class="row">
    <div class="label">
      <span class="dot" :style="{ background: color }"></span> {{ label }}
    </div>
    <div class="bar">
      <div class="fill" :style="{ width: modelValue + '%', background: color }"></div>
    </div>
    <div class="pct">
      <input type="number" :value="modelValue" min="0" max="100" @input="onInput" />%
    </div>
  </div>
</template>

<style scoped>
.row { display:grid; grid-template-columns: 80px 1fr 70px; align-items:center; gap:10px; padding:12px 0; }
.label { display:flex; align-items:center; gap:8px; color:#111; font-size:14px; }
.dot { width:28px; height:28px; border-radius:6px; display:inline-block; }
.bar { height:6px; width:100%; background:#edf2f7; border-radius:999px; overflow:hidden; }
.fill { height:100%; border-radius:999px; transition:width .2s ease; }
.pct { text-align:right; color:#6b7280; }
.pct input { width:44px; text-align:right; border:0; border-bottom:1px solid #e5e7eb; outline:none; padding:2px 2px; font-size:14px; }
</style>
