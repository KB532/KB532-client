<script setup>
defineProps({
  title: { type: String, required: true },
  values: { type: Object, required: true }, // { essential, optional, saving }
});
defineEmits(['select']);
</script>

<template>
  <button class="preset" @click="$emit('select', values)">
    <div class="subtitle2 text-kb-yellow-positive mb-3">{{ title }}</div>
    <ul class="body2">
      <li>필수 {{ values.essential }}</li>
      <li>선택 {{ values.optional }}</li>
      <li>저축 {{ values.saving }}</li>
    </ul>
  </button>
</template>

<style scoped>
.preset {
  width: 100%;
  text-align: center;
  background: #f8f8f8;
  border-radius: 10px;
  padding: 12px 8px;
  cursor: pointer;
  transition:
    transform 0.12s,
    box-shadow 0.12s;
}
</style>
