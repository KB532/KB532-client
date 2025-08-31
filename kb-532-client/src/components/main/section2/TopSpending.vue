<script setup>
defineProps({
  items: { type: Array }
})

const formatKRWShort = (won) => {
  if (won == null) return '-'
  const man = won / 10000
  return Number.isInteger(man) ? `${man.toLocaleString('ko-KR')}만원` : `${man.toFixed(1)}만원`
}
const signClass = (p) => (p > 0 ? 'text-red-200' : 'text-kb-gray-dark')
const signArrow = (p) => (p > 0 ? '↑' : '–')
</script>

<template>
  <div class="mt-4">
    <p class="caption1 text-kb-gray-dark">이번 달 지출 Top 3</p>

    <div class="mt-3 flex flex-wrap gap-2">
      <div
        v-for="(it, idx) in items"
        :key="idx"
        class="w-[96px] h-[68px] rounded-lg bg-gray-100 px-3 py-2 text-center"
      >
        <!-- 카테고리명 -->
        <p class="caption3 text-black">{{ it.label }}</p>

        <!-- 금액 -->
        <p class="caption1 mt-0.5 leading-tight" :class="signClass(it.deltaPercent)">
          {{ formatKRWShort(it.amount) }}
        </p>

        <!-- 증감율 -->
        <p class="caption3 mt-0.5 text-kb-gray-dark leading-tight">
          ({{ Math.abs(it.deltaPercent) }}% {{ signArrow(it.deltaPercent) }})
        </p>
      </div>
    </div>
  </div>
</template>
