<script setup>
import { ref, onMounted, watch, onBeforeUnmount, computed } from 'vue';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js';
import IconAvatar from '@/components/common/Avatar/IconAvatar.vue';

Chart.register(DoughnutController, ArcElement, Tooltip, Legend);

const props = defineProps({
  categories: { type: Array, default: () => [] },
});

const chartCanvas = ref(null);
let chartInstance = null;

const COLOR_BY_KEY = {
  shopping: '#00DE5A',
  finance: '#A180FF',
  food: '#FFC831',
  transfer: '#467CAA',
  transit: '#4AC9FF',
  health: '#FF5882',
  home: '#2EA923',
  living: '#FF9A42',
  snacks: '#B066FF',
  others: '#8F8F8F',
};

function drawChart() {
  if (!chartCanvas.value) return;

  const labels = props.categories.map((c) => c.label);
  const percents = props.categories.map((c) => Number(c.percent) || 0);
  const colors = props.categories.map((c) => COLOR_BY_KEY[c.key] || COLOR_BY_KEY.others);

  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{ data: percents, backgroundColor: colors, borderWidth: 0 }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      animation: false,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: true },
      },
    },
  });
}

onMounted(drawChart);
watch(() => props.categories, drawChart, { deep: true });
onBeforeUnmount(() => {
  if (chartInstance) chartInstance.destroy();
});

const topCategory = computed(() => {
  if (!props.categories.length) return null;
  return props.categories.reduce((max, cur) => (cur.percent > max.percent ? cur : max));
});
const topPercentText = computed(() =>
  topCategory.value ? `${Math.round(topCategory.value.percent)}%` : '',
);
</script>

<template>
  <div class="relative size-40">
    <canvas ref="chartCanvas"></canvas>

    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <IconAvatar v-if="topCategory" :category="topCategory.key" :bg="false" size="size-7" />
      <span class="title2 text-black">{{ topPercentText }}</span>
    </div>
  </div>
</template>
