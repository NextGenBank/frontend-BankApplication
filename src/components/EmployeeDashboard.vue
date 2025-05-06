<template>
  <div class="flex min-h-screen font-sans">
    <Sidebar />
    <main>
      <h1>Welcome, [NAME]</h1>
      <DashboardMetrics />
      <div class="charts">
        <ChartAccountCreations />
        <RecentTransactions />
      </div>
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/EmployeeSidebar.vue'
import DashboardMetrics from '@/components/DashboardMetrics.vue'
import ChartAccountCreations from '@/components/EmployeeChartAccountCreations.vue'
import RecentTransactions from '@/components/RecentTransactions.vue'

</script>

<style scoped>
/* Optional: Slight hover effect on table rows */
tbody tr:hover {
  background-color: #f0fdf4; /* Light green background on hover */
}
.dashboard {
  display: flex;
}
main {
  padding: 2rem;
  flex-grow: 1;
}
.charts {
  display: flex;
  gap: 2rem;
}
</style>
