<template>
  <div class="metrics">
    <div class="card"><strong>{{ customers }}</strong><p>Customers</p></div>
    <div class="card"><strong>{{ accounts }}</strong><p>Accounts</p></div>
    <div class="card"><strong>€ {{ totalDeposits.toLocaleString() }}</strong><p>Total Deposits</p></div>
    <div class="card"><strong>{{ pendingTransfers }}</strong><p>Pending Transfers</p></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const customers = ref(0)
const accounts = ref(0)
const totalDeposits = ref(0)
const pendingTransfers = ref(0)

onMounted(async () => {
  try {
    // Fetch customer count
    const customersResponse = await axios.get('/api/employees/customers')
    if (customersResponse.data) {
      customers.value = customersResponse.data.length || 0
    }
    
    // Fetch accounts
    const accountsResponse = await axios.get('/api/accounts')
    if (accountsResponse.data) {
      accounts.value = accountsResponse.data.length || 0
      
      // Calculate total deposits
      let total = 0
      accountsResponse.data.forEach(account => {
        if (account.balance) {
          total += parseFloat(account.balance)
        }
      })
      totalDeposits.value = total
    }
    
    // For now, pendingTransfers is hardcoded since we don't have a specific endpoint for that
    pendingTransfers.value = 0
  } catch (error) {
    console.error('Failed to fetch dashboard metrics', error)
  }
})
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