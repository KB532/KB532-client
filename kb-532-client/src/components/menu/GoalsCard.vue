<script setup>
import Stacked50Bar from '@/components/menu/Stacked50Bar.vue'

const props = defineProps({
  goals: { type: Array, required: true } // [{label,value,color}]
})
const emit = defineEmits(['edit'])
</script>

<template>
  <section class="card bg-gray-100">
    <div class="card-header">
      <h3 class="font-bold">나의 현재 50/30/20 목표</h3>
      <button class="ghost" @click="$emit('edit')">목표 수정하기</button>
    </div>

    <Stacked50Bar :segments="goals" />
  </section>
</template>

<style scoped>
.card {  border: 1px solid var(--border); border-radius: 14px; box-shadow: 0 6px 16px rgba(0,0,0,.04); padding: 14px; }
.card-header { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-bottom: 10px; }
.card-header h3 { font-size: 15px; margin: 0; }
.ghost { border: 0; background: transparent; cursor: pointer; color: #6b7280; font-size: 13px; text-decoration: underline; }
</style>
