<script setup>
const props = defineProps({
  title: { type: String, required: true },
  values: { type: Object, required: true }, // { essential, optional, saving }
})
const emit = defineEmits(['select'])
</script>

<template>
  <button class="preset" @click="$emit('select', values)">
    <div class="preset-title">{{ title }}</div>
    <ul>
      <li>필수 {{ values.essential }}</li>
      <li>선택 {{ values.optional }}</li>
      <li>저축 {{ values.saving }}</li>
    </ul>
  </button>
</template>

<style scoped>
.preset{ width:100%; text-align:center; background:#f8fafc; border:1px solid #eef2f7;
  border-radius:12px; padding:12px 8px; cursor:pointer; transition:transform .12s, box-shadow .12s; }
.preset:hover{ transform:translateY(-1px); box-shadow:0 4px 10px rgba(0,0,0,.06); }
.preset-title{ color:#fbbf24; font-weight:800; margin-bottom:6px; }
</style>
