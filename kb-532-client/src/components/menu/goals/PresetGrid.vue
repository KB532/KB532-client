<script setup>
import PresetCard from './PresetCard.vue';
defineProps({ presets: { type: Array, required: true } });
defineEmits(['select']);
</script>

<template>
  <div class="flex gap-2">
    <PresetCard
      v-for="p in presets"
      :key="p.key"
      :title="p.name"
      :values="p.values"
      @select="(v) => $emit('select', v)"
    />
  </div>
</template>
