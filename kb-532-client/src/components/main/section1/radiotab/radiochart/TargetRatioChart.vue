<script setup>
import { ref, onMounted, onBeforeUnmount, computed, watch } from 'vue';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const CAPTION3_PX = 11;
const CAPTION_WEIGHT = 500;

const props = defineProps({
  target: {
    type: Object,
    default: () => ({ essential: 50, discretionary: 30, savings: 20 }),
  },
  donutDiameter: { type: Number, default: 120 },
});

const labels = ['필수 지출', '자유 지출', '저축'];
const colors = ['#48637E', '#FFC831', '#C0E2FF'];
const textGray = '#60584C';
const lineColor = '#60584C';

const clampPct = (v) => Math.round(Number(v || 0));
const targetArr = computed(() => [
  clampPct(props.target.essential),
  clampPct(props.target.discretionary),
  clampPct(props.target.savings),
]);

const chartRef = ref(null);
let chart;

function midAngle(arc) {
  const p = arc.getProps(['startAngle', 'endAngle'], true);
  return (p.startAngle + p.endAngle) / 2;
}
function isRight(a) {
  const x = a % (Math.PI * 2);
  return x > -Math.PI / 2 && x < Math.PI / 2;
}

const Callouts = {
  id: 'callouts',
  afterDatasetsDraw(c) {
    const { ctx } = c;
    const meta = c.getDatasetMeta(0);
    const yJitter = [0, 14, -12];

    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = lineColor;
    ctx.fillStyle = lineColor;

    meta.data.forEach((arc, i) => {
      const p = arc.getProps(
        ['x', 'y', 'innerRadius', 'outerRadius', 'startAngle', 'endAngle'],
        true,
      );
      const a = midAngle(arc);
      const right = isRight(a);

      const ringMid = (p.innerRadius + p.outerRadius) / 2;
      const startInset = 4;
      const sx = p.x + Math.cos(a) * (ringMid - startInset);
      const sy = p.y + Math.sin(a) * (ringMid - startInset) + (yJitter[i] || 0);

      const lineLen = 100;
      const ex = sx + (right ? lineLen : -lineLen);
      const ey = sy;

      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo(ex, ey);
      ctx.stroke();

      const d = 3.5;
      ctx.beginPath();
      ctx.moveTo(sx, sy - d);
      ctx.lineTo(sx + d, sy);
      ctx.lineTo(sx, sy + d);
      ctx.lineTo(sx - d, sy);
      ctx.closePath();
      ctx.fill();

      const name = labels[i];
      const val = targetArr.value[i];
      ctx.textAlign = right ? 'right' : 'left';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = textGray;
      ctx.font = `${CAPTION_WEIGHT} ${CAPTION3_PX}px 'Spoqa Han Sans Neo', sans-serif`;
      const labelGap = 0;
      const tx = ex + (right ? labelGap : -labelGap);
      const ty = ey;
      ctx.fillText(`${name} ${val}%`, tx, ty - 10);
    });

    ctx.restore();
  },
};

onMounted(() => {
  const ctx = chartRef.value.getContext('2d');
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [
        {
          data: targetArr.value,
          backgroundColor: colors,
          borderWidth: 0,
          radius: Math.max(10, Math.round(props.donutDiameter / 2)),
          cutout: '50%',
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      rotation: -90 * (Math.PI / 180),
      layout: { padding: 28 },
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
        datalabels: { display: false },
      },
      animation: { duration: 160 },
    },
    plugins: [Callouts],
  });
});

watch(targetArr, (vals) => {
  if (!chart) return;
  chart.data.datasets[0].data = vals;
  chart.update();
});

watch(
  () => props.donutDiameter,
  (d) => {
    if (!chart) return;
    chart.data.datasets[0].radius = Math.max(10, Math.round(d / 2));
    chart.update();
  },
);

onBeforeUnmount(() => chart?.destroy());
</script>

<template>
  <div style="width: 310px; height: 160px">
    <canvas ref="chartRef" />
  </div>
</template>
