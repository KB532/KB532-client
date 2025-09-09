<!-- <script setup>
import { computed } from 'vue';

const props = defineProps({
  segments: { type: Array, required: true },
});

const enriched = computed(() => {
  let acc = 0;
  return props.segments.map((s, i) => {
    const start = acc;
    const center = start + s.value / 2;
    acc += s.value;
    return { ...s, start, center, i };
  });
});
</script> -->

<!-- <template>
  <div class="relative w-[300px]">
    <div
      v-for="s in enriched"
      :key="s.label"
      class="absolute flex items-baseline caption3 whitespace-nowrap"
      :style="{ left: s.start + '%' }"
    >
      <p class="caption3">
        {{ s.label }} {{ s.value }}
        <span class="text-[6px] text-gray-600">%</span>
      </p>
    </div>
  </div>

  <div class="flex h-[7px] w-[300px] overflow-hidden rounded-full bg-gray-200">
    <div
      v-for="(s, i) in enriched"
      :key="s.label"
      class="h-full"
      :style="{
        width: s.value + '%',
        background: s.color,
        borderTopLeftRadius: i === 0 ? '999px' : 0,
        borderBottomLeftRadius: i === 0 ? '999px' : 0,
        borderTopRightRadius: i === enriched.length - 1 ? '999px' : 0,
        borderBottomRightRadius: i === enriched.length - 1 ? '999px' : 0,
      }"
    />
  </div>
</template> -->



<!-- src/components/menu/Stacked50Bar.vue -->
<script setup>
import { ref, computed, onMounted } from 'vue'
import { getLatestBudgetTarget } from '@/api/budget'

/**
 * 사용법
 * - API 자동 로드: <Stacked50Bar />  // autoFetch = true (기본값)
 * - 프롭 사용(직접 세그먼트 전달): <Stacked50Bar :segments="[{label:'필수',value:55}, ...]" :auto-fetch="false" />
 */
const props = defineProps({
  segments:  { type: Array, default: null }, // [{ label:'필수'|'선택'|'저축', value:number, color?:string }]
  autoFetch: { type: Boolean, default: true },
})

const loading   = ref(false)
const errorMsg  = ref('')
const apiSegments = ref(null)

// 디자인 컬러 매핑
const colorMap = { '필수': '#5AA9FF', '선택': '#FF8B8B', '저축': '#FFBC74' }

// 실패/로딩 대비 기본값
const fallback = [
  { label: '필수', value: 50, color: colorMap['필수'] },
  { label: '선택', value: 30, color: colorMap['선택'] },
  { label: '저축', value: 20, color: colorMap['저축'] },
]

const withColor = (arr) => arr.map(s => ({ ...s, color: s.color || colorMap[s.label] }))

// 실제로 그릴 데이터 소스 결정
const baseSegments = computed(() => {
  if (props.segments?.length) return withColor(props.segments)
  if (apiSegments.value)      return apiSegments.value
  return fallback
})

// 좌표 보강: 각 구간의 시작/중앙 계산
const enriched = computed(() => {
  let acc = 0
  return baseSegments.value.map((s, i) => {
    const start  = acc
    const center = start + s.value / 2
    acc += s.value
    return { ...s, start, center, i }
  })
})

// 마운트 시(API 사용 모드일 때만) 최신 타겟 불러오기
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
  <!-- 공통 래퍼: 너비를 한 번만 지정 -->
  <div class="w-[300px]">
    <!-- 라벨 줄: 막대 위에 공간을 따로 확보 -->
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



