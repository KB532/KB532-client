<template>
  <div class="w-full">
    <div style="height: 136px">
      <canvas ref="canvasEl"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, ref, watch, computed } from 'vue';

import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Tooltip,
  Legend,
} from 'chart.js';

Chart.register(CategoryScale, LinearScale, BarElement, BarController, Tooltip, Legend);

const FONT_FAMILY =
  "'Spoqa Han Sans Neo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif";

const valueLabelPlugin = {
  id: 'valueLabel',
  afterDatasetsDraw(chart) {
    const { ctx, chartArea } = chart;
    ctx.save();

    const highlightIndex = chart.config.options.highlightIndex ?? -1;

    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const meta = chart.getDatasetMeta(datasetIndex);

      meta.data.forEach((bar, i) => {
        const raw = Number(dataset.data[i]);
        if (!Number.isFinite(raw)) return;

        const txt = formatKoreanMoneyShort(raw);

        const { x, y, base } = bar.getProps(['x', 'y', 'base'], true);
        const topY = Math.min(y, base);

        const PADDING = 6;
        const MIN_TOP = chartArea.top;
        const labelY = Math.max(topY - PADDING, MIN_TOP);

        const isHighlight = i === highlightIndex;
        ctx.fillStyle = isHighlight ? '#FFC400' : '#54504C';

        ctx.font = `500 11px ${FONT_FAMILY}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'bottom';
        ctx.fillText(txt, x, labelY);
      });
    });

    ctx.restore();
  },
};

/** 만원 단위로 변환 */
function formatKoreanMoneyShort(v) {
  if (!Number.isFinite(v)) return '';
  const man = Math.round(v / 10000);
  return `${man}만원`;
}

const props = defineProps({
  weeks: {
    type: Array,
    required: true,
  },
});

const labels = computed(() => props.weeks.map((w) => w.label));
const amounts = computed(() => props.weeks.map((w) => Number(w.amount || 0)));
const highlightIndex = computed(() => props.weeks.findIndex((w) => w.current));

const canvasEl = ref(null);
let chart = null;

watch(
  () => props.weeks,
  () => draw(),
  { deep: true },
);

onMounted(draw);
onBeforeUnmount(() => {
  if (chart) chart.destroy();
});

function draw() {
  if (!canvasEl.value) return;
  if (chart) {
    chart.destroy();
    chart = null;
  }

  const HIGHLIGHT = '#FFC400';
  const NORMAL = '#AFABA5';
  const NORMAL_BORDER = '#a6a19a';
  const BAR_RADIUS = 2;

  const colors = amounts.value.map((_, i) => (i === highlightIndex.value ? HIGHLIGHT : NORMAL));
  const borders = amounts.value.map((_, i) =>
    i === highlightIndex.value ? HIGHLIGHT : NORMAL_BORDER,
  );

  chart = new Chart(canvasEl.value.getContext('2d'), {
    type: 'bar',
    data: {
      labels: labels.value,
      datasets: [
        {
          data: amounts.value,
          backgroundColor: colors,
          borderColor: borders,
          borderWidth: 0,
          borderRadius: BAR_RADIUS,
          maxBarThickness: 48,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      highlightIndex: highlightIndex.value,

      layout: {
        padding: { top: 10, right: 10, bottom: 0, left: 10 },
      },

      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (ctx) => ` ${formatKoreanMoneyShort(ctx.raw)}`,
          },
          displayColors: false,
        },
      },

      scales: {
        x: {
          grid: { display: false },
          border: { display: false },
          ticks: {
            color: '#54504C',
            font: { weight: 400, size: 11 },
            maxRotation: 0,
            minRotation: 0,
          },
        },
        y: {
          beginAtZero: true,
          grace: '18%',
          grid: { display: false, drawBorder: false },
          border: { display: false },
          ticks: { display: false },
        },
      },
    },
    plugins: [valueLabelPlugin],
  });
}
</script>
