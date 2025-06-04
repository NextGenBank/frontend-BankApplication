<template>
  <div class="flex min-h-screen font-sans">
    <Sidebar />
    <main>
      <h1 class="text-2xl font-bold text-green-700 mb-6">Welcome, Employee</h1>
      <DashboardMetrics />
    </main>
  </div>
</template>

<script setup>
import Sidebar from '@/components/EmployeeSidebar.vue'
import DashboardMetrics from '@/components/DashboardMetrics.vue'
</script>

<style scoped>
tbody tr:hover {
  background-color: #f0fdf4;
}
main {
  padding: 2rem;
  flex-grow: 1;
  background: linear-gradient(to right, white, #f0fdf4);
}
</style>
