<template>
  <div class="metrics">
    <div class="card"><strong>{{ customers }}</strong><p>Customers</p></div>
    <div class="card"><strong>{{ accounts }}</strong><p>Accounts</p></div>
    <div class="card"><strong>€ {{ totalDeposits.toLocaleString() }}</strong><p>Total Deposits</p></div>
    <div class="card"><strong>{{ pendingTransfers }}</strong><p>Pending Transfers</p></div>
  </div>
</template>

<script setup>
const customers = 32
const accounts = 54
const totalDeposits = 5124000
const pendingTransfers = 8
</script>


<style scoped>
.metrics {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}
.card {
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: center;
  flex: 1;
}
</style>
