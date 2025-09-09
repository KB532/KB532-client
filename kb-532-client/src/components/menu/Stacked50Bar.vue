<!-- src/components/menu/Stacked50Bar.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { getLatestBudgetTarget } from '@/api/budget'


const props = defineProps({
  segments:  { type: Array, default: null }, 
  autoFetch: { type: Boolean, default: true },
})

const loading   = ref(false)
const errorMsg  = ref('')
const apiSegments = ref(null)

const colorMap = { '필수': '#5AA9FF', '선택': '#FF8B8B', '저축': '#FFBC74' }

const fallback = [
  { label: '필수', value: 50, color: colorMap['필수'] },
  { label: '선택', value: 30, color: colorMap['선택'] },
  { label: '저축', value: 20, color: colorMap['저축'] },
]

const withColor = (arr) => arr.map(s => ({ ...s, color: s.color || colorMap[s.label] }))

const baseSegments = computed(() => {
  if (props.segments?.length) return withColor(props.segments)
  if (apiSegments.value)      return apiSegments.value
  return fallback
})

const enriched = computed(() => {
  let acc = 0
  return baseSegments.value.map((s, i) => {
    const start  = acc
    const center = start + s.value / 2
    acc += s.value
    return { ...s, start, center, i }
  })
})

onMounted(async () => {
  if (props.segments?.length || !props.autoFetch) return
  try {
    loading.value = true
    const t = await getLatestBudgetTarget() // { essential, discretionary, savings }
    apiSegments.value = withColor([
      { label: '필수', value: t.essential },
      { label: '선택', value: t.discretionary },
      { label: '저축', value: t.savings },
    ])
  } catch (e) {
    console.error(e)
    errorMsg.value = e?.message || '목표 데이터를 불러오지 못했습니다.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <div class="w-[300px]">
    <!-- 라벨 -->
    <div class="relative h-5 mb-1">
      <div
        v-for="s in enriched"
        :key="s.label"
        class="absolute -translate-x-1/2 transform flex items-baseline caption3 whitespace-nowrap"
        :style="{ left: s.center + '%' }"  
      >
        <p class="caption3">
          {{ s.label }} {{ s.value }}
          <span class="text-[6px] text-gray-600">%</span>
        </p>
      </div>
    </div>

    <!-- 누적 막대 -->
    <div class="flex h-[7px] w-full overflow-hidden rounded-full bg-gray-200">
      <div
        v-for="(s, i) in enriched"
        :key="s.label"
        class="h-full"
        :style="{
          width: s.value + '%',
          background: s.color,
          borderTopLeftRadius:     i === 0 ? '999px' : 0,
          borderBottomLeftRadius:  i === 0 ? '999px' : 0,
          borderTopRightRadius:    i === enriched.length - 1 ? '999px' : 0,
          borderBottomRightRadius: i === enriched.length - 1 ? '999px' : 0,
        }"
      />
    </div>
  </div>
</template>



