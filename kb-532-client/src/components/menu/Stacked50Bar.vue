<script setup>
import { computed } from 'vue'

const props = defineProps({
  // [{ label:'필수', value:50, color:'#4C80F1' }, ...]
  segments: { type: Array, required: true }
})

const enriched = computed(() => {
  let acc = 0
  return props.segments.map((s, i) => {
    const start = acc
    const center = start + s.value / 2
    acc += s.value
    return { ...s, start, center, i }
  })
})
</script>

<template>
  <!-- 라벨 (막대 위에 중앙 정렬) -->
  <div class="labels">
    <div
      v-for="s in enriched"
      :key="s.label"
      class="lbl"
      :style="{ left: s.center + '%' }"
    >
      <span class="name">{{ s.label }}</span>
      <span class="pct">{{ s.value }}%</span>
    </div>
  </div>

  <!-- 누적 막대 -->
  <div class="bar">
    <div
      v-for="(s, i) in enriched"
      :key="s.label"
      class="seg"
      :style="{
        width: s.value + '%',
        background: s.color,
        borderTopLeftRadius:  i === 0 ? '999px' : 0,
        borderBottomLeftRadius: i === 0 ? '999px' : 0,
        borderTopRightRadius:  i === enriched.length - 1 ? '999px' : 0,
        borderBottomRightRadius: i === enriched.length - 1 ? '999px' : 0,
      }"
    />
  </div>
</template>

<style scoped>
.bar {
  height: 6px;
  width: 100%;
  display: flex;
  overflow: hidden;
  background: #edf2f7; /* 트랙 */
  border-radius: 999px;
}
.seg { height: 100%; }

.labels {
  position: relative;
  height: 20px;
  margin-bottom: 6px;
}
.lbl {
  position: absolute;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  align-items: baseline;
  font-size: 12px;
  color: #111;
}
.pct { font-size: 11px; color: #9aa4b2; }
</style>
