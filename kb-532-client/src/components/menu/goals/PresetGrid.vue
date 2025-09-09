<script setup>
import PresetCard from './PresetCard.vue';
defineProps({ presets: { type: Array, required: true } });
defineEmits(['select']); // (values) => void
</script>

<template>
  <div class="presets">
    <PresetCard
      v-for="p in presets"
      :key="p.key"
      :title="p.name"
      :values="p.values"
      @select="(v) => $emit('select', v)"
    />
  </div>
</template>

<style scoped>
.presets {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}
</style>
