<script setup>
const props = defineProps({
  value:  { type: Number, required: true }, // 0~100
  color:  { type: String, default: '#4C80F1' },
  height: { type: Number, default: 8 }
})
</script>

<template>
  <div class="bar" :style="{ height: height + 'px' }">
    <div class="fill" :style="{ width: Math.max(0, Math.min(100, value)) + '%', background: color }" />
  </div>
</template>

<style scoped>
.bar { width: 100%; background: #edf2f7; border-radius: 999px; overflow: hidden; }
.fill { height: 100%; border-radius: 999px; transition: width .4s ease; }
</style>
