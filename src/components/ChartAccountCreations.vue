<template>
  <canvas ref="chart"></canvas>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

const chart = ref(null)

onMounted(() => {
  new Chart(chart.value, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [{
        label: 'Accounts Created',
        data: [12, 19, 14, 20, 25],
        borderColor: 'black',
        fill: false
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } }
    }
  })
})
</script>
