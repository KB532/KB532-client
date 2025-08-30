<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

/** 고정 목표 */
const TARGET = { essential: 50, discretionary: 30, savings: 20 }

// 글자 크기/굵기 
const CAPTION3_PX   = 11  
const DELTA_PX      = 8   
const CAPTION_WEIGHT = 500 
const DELTA_WEIGHT   = 700 

const props = defineProps({
  actual: {
    type: Object,
    default: () => ({ essential: 60, discretionary: 20, savings: 20 }),
  },
  donutDiameter: { type: Number, default: 120 }, 
})

/** 데이터/색 */
const labels = ['필수 지출', '자유 지출', '저축']
const colors = ['#48637E', '#FFC831', '#C0E2FF'] // 도넛 색
const textGray = '#60584C'
const lineColor = '#60584C' // 선 & 다이아 동일 색

const actualArr = computed(() => [
  props.actual.essential,
  props.actual.discretionary,
  props.actual.savings,
])
const targetArr = [TARGET.essential, TARGET.discretionary, TARGET.savings]
const deltas = computed(() => actualArr.value.map((v, i) => v - targetArr[i]))

const chartRef = ref(null)
let chart

function midAngle(arc) {
  const p = arc.getProps(['startAngle', 'endAngle'], true)
  return (p.startAngle + p.endAngle) / 2
}
function isRight(a) {
  const x = a % (Math.PI * 2)
  return x > -Math.PI / 2 && x < Math.PI / 2
}

/** 수평 라인 + 다이아(끝점) + 두 줄 텍스트 */
const Callouts = {
  id: 'callouts',
  afterDatasetsDraw(c) {
    const { ctx } = c
    const meta = c.getDatasetMeta(0)
    const yJitter = [0, 14, -12] // (필수, 자유, 저축) 겹침 방지

    ctx.save()
    ctx.lineWidth = 1 // 2에서 1로 줄임 - 선을 더 얇게
    ctx.strokeStyle = lineColor
    ctx.fillStyle = lineColor

    meta.data.forEach((arc, i) => {
      const p = arc.getProps(['x','y','innerRadius','outerRadius','startAngle','endAngle'], true)
      const a = midAngle(arc)
      const right = isRight(a)

      const ringMid = (p.innerRadius + p.outerRadius) / 2
      const startInset = 4
      const sx = p.x + Math.cos(a) * (ringMid - startInset)
      const sy = p.y + Math.sin(a) * (ringMid - startInset) + yJitter[i]

      const lineLen = 100 
      const ex = sx + (right ? lineLen : -lineLen)
      const ey = sy

      // 수평선
      ctx.beginPath()
      ctx.moveTo(sx, sy)
      ctx.lineTo(ex, ey)
      ctx.stroke()

      // 다이아
      ctx.fillStyle = lineColor 
      const d = 3.5
      ctx.beginPath()
      ctx.moveTo(sx, sy - d)
      ctx.lineTo(sx + d, sy)
      ctx.lineTo(sx, sy + d)
      ctx.lineTo(sx - d, sy)
      ctx.closePath()
      ctx.fill()

      const labelGap = 0 
      const tx = ex + (right ? labelGap : -labelGap)
      const ty = ey

      const name  = labels[i]
      const val   = actualArr.value[i]
      const delta = deltas.value[i]
      const sign  = delta > 0 ? '+' : ''
      const arrow = delta > 0 ? '▲' : delta < 0 ? '▼' : '–'
      const deltaColor = delta > 0 ? '#DC2626' : delta < 0 ? '#2563EB' : textGray

      // 수평선을 기준으로 텍스트 정렬 
      ctx.textAlign = right ? 'right' : 'left'

      // 1줄: 항목 + 현재값  
      ctx.textBaseline = 'middle'
      ctx.fillStyle = textGray
      ctx.font = `${CAPTION_WEIGHT} ${CAPTION3_PX}px 'Spoqa Han Sans Neo', sans-serif`
      ctx.fillText(`${name} ${val}%`, tx, ty - 10)

      // 2줄: 목표 대비 ±% 
      ctx.textBaseline = 'middle'
      ctx.fillStyle = deltaColor
      ctx.font = `${DELTA_WEIGHT} ${DELTA_PX}px 'Spoqa Han Sans Neo', sans-serif`
      ctx.fillText(`목표 대비 ${sign}${delta}% ${arrow}`, tx, ty + 8)

    }) 

    ctx.restore()
  },
}

onMounted(() => {
  const ctx = chartRef.value.getContext('2d')
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data: actualArr.value,
        backgroundColor: colors,
        borderWidth: 0,
        radius: Math.max(10, Math.round(props.donutDiameter / 2)), 
        cutout: '50%',
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      rotation: -90 * (Math.PI / 180), // 시작점 : 12시
      layout: { padding: 28 },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        datalabels: { display: false }, 
      },
      animation: { duration: 160 },
    },
    plugins: [Callouts],
  })
})

onBeforeUnmount(() => chart?.destroy())
</script>

<template>
  <div style="width: 310px; height: 160px">
    <canvas ref="chartRef" />
  </div>
</template>