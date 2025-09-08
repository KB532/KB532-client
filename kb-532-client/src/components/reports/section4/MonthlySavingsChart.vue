<template>
  <div class="w-full">
    <div style="height: 180px">
      <canvas ref="canvasEl"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

const props = defineProps({
  months: { type: Array, required: true },
});

const KB_YELLOW = '#FFBC00';
const TEXT_GRAY = '#8F8F8F';
const FONT_FAMILY =
  "'Spoqa Han Sans Neo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";

const canvasEl = ref(null);
let chart;

const valueGuidePlugin = {
  id: 'valueGuide',

  beforeDatasetsDraw(c) {
    const { ctx, chartArea } = c;
    const meta = c.getDatasetMeta(0);
    if (!meta?.data?.length) return;

    const bw = c.data.datasets?.[0]?.borderWidth ?? 2;
    const gap = 1.5;
    const margin = 6;
    const minX = chartArea.left + margin;
    const maxX = chartArea.right - margin;

    ctx.save();
    ctx.setLineDash([2, 3]);
    ctx.lineCap = 'butt';
    ctx.strokeStyle = TEXT_GRAY;
    ctx.lineWidth = 1;

    meta.data.forEach((el) => {
      const { x, y } = el.getProps(['x', 'y'], true);
      const safeX = Math.max(minX, Math.min(x, maxX));

      const yStart = Math.floor(y + bw / 2 + gap) + 0.5;

      if (yStart < chartArea.bottom) {
        ctx.beginPath();
        ctx.moveTo(safeX, Math.min(Math.max(yStart, chartArea.top), chartArea.bottom));
        ctx.lineTo(safeX, chartArea.bottom);
        ctx.stroke();
      }
    });

    ctx.setLineDash([]);
    ctx.restore();
  },

  afterDatasetsDraw(c) {
    const { ctx, chartArea } = c;
    const meta = c.getDatasetMeta(0);
    if (!meta?.data?.length) return;

    const bw = c.data.datasets?.[0]?.borderWidth ?? 3;
    const labelGap = 12;

    const margin = 6;
    const minX = chartArea.left + margin;
    const maxX = chartArea.right - margin;

    ctx.save();
    ctx.font = `500 8px ${FONT_FAMILY}`;
    ctx.textBaseline = 'alphabetic';
    ctx.fillStyle = TEXT_GRAY;

    meta.data.forEach((el, i) => {
      const { x, y } = el.getProps(['x', 'y'], true);
      const safeX = Math.max(minX, Math.min(x, maxX));

      const lineTop = Math.floor(y - bw / 2) + 0.5;

      const val = c.data.datasets[0].data[i];
      const text = `${val}만원`;

      const m = ctx.measureText(text);
      const descent = m.actualBoundingBoxDescent ?? 0;

      const baselineY = Math.round(lineTop - labelGap - descent);

      if (safeX <= minX + 1) ctx.textAlign = 'left';
      else if (safeX >= maxX - 1) ctx.textAlign = 'right';
      else ctx.textAlign = 'center';

      ctx.fillText(text, safeX, baselineY);
    });

    ctx.restore();
  },
};

function mountChart() {
  const labels = props.months.map((m) => m.label);
  const dataInManwon = props.months.map((m) => Math.round(m.amount / 10000));

  const minV = Math.min(...dataInManwon);
  const maxV = Math.max(...dataInManwon);
  const pad = Math.max(2, Math.round((maxV - minV) * 0.2)); // 여유

  const data = {
    labels,
    datasets: [
      {
        data: dataInManwon,
        borderColor: KB_YELLOW,
        backgroundColor: KB_YELLOW,
        borderWidth: 3,
        tension: 0,
        pointRadius: 0,
        pointHitRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: { padding: { top: 18, bottom: 10 } },
    plugins: {
      legend: { display: false },
      tooltip: false,
    },
    scales: {
      x: {
        offset: true,
        grid: { display: false, drawBorder: false },
        ticks: {
          color: '#000000',
          font: { family: FONT_FAMILY, size: 11, weight: '400' },
        },
        border: { display: false },
      },
      y: {
        beginAtZero: false,
        min: minV - pad,
        max: maxV + pad,
        grid: { display: false, drawBorder: false },
        ticks: { display: false },
        border: { display: false },
      },
    },
  };

  if (chart) chart.destroy();
  chart = new Chart(canvasEl.value.getContext('2d'), {
    type: 'line',
    data,
    options,
    plugins: [valueGuidePlugin],
  });
}

onMounted(mountChart);
onBeforeUnmount(() => chart?.destroy());
watch(() => props.months, mountChart, { deep: true });
</script>
