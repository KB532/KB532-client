<script setup>
import { ref, onMounted } from 'vue'
import { Icon } from '@iconify/vue';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend } from 'chart.js'

Chart.register(DoughnutController, ArcElement, Tooltip, Legend)

const chartCanvas = ref(null)
let chartInstance = null

onMounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(chartCanvas.value, {
    type: 'doughnut',
    data: {
      labels: ['쇼핑', '보험·대출·기타금융', '식비', '이체', '교퉁', '의료·건강·피트니스', '주거·통신', '생활', '카페·간식', '기타 지출'],
      datasets: [
        {
          data: [26, 22, 19, 17, 11, 2, 2, 1, 0, 0],
          backgroundColor: [ // 나중에 색깔 바꾸기... 좀 못생김 ㅠ
            '#00DE5A',
            '#A180FF',
            '#FFC831',
            '#467CAA',
            '#4AC9FF',
            '#FF5882',
            '#2EA923',
            '#FF9A42',
            '#B066FF',
            '#8F8F8F',
          ],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '70%',
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  })
})
</script>

<template>
  <div class="relative size-40">
    <canvas ref="chartCanvas"></canvas>

<!--    Todo: 가장 값이 큰 데이터가 뜰 수 있도록 바인딩하기-->
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <Icon
        icon="mdi:shopping"
        class="text-[#00DE5A] size-7"
      />
      <span class="title2 text-black">26%</span>
    </div>
  </div>
</template>
