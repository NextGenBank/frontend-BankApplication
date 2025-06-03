<template>
  <div class="flex min-h-screen font-sans">
    <Sidebar />
    <main class="flex-1 bg-gradient-to-r from-white to-green-50 p-8">
      <h2 class="text-2xl font-bold text-green-700 mb-6">Transactions</h2>
      <div class="overflow-x-auto bg-white shadow-md rounded-2xl p-6">
        <table class="w-full text-left table-auto">
          <thead>
            <tr class="border-b">
              <th class="pb-2">To account</th>
              <th class="pb-2">From account</th>
              <th class="pb-2">User initiating</th>
              <th class="pb-2">Time stamp</th>
              <th class="pb-2">Transfer amount</th>
              <th class="pb-2">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(transaction, index) in transactions" :key="index" class="border-t">
              <td class="py-3">{{ transaction.toAccount }}</td>
              <td class="py-3">{{ transaction.fromAccount }}</td>
              <td class="py-3">{{ transaction.userInitiating }}</td>
              <td class="py-3">{{ transaction.timestamp }}</td>
              <td class="py-3 font-semibold"
                  :class="transaction.amount > 0 ? 'text-green-600' : 'text-red-600'">
                {{ formatAmount(transaction.amount) }}
              </td>
              <td class="py-3">
                {{ transaction.transactionType }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '@/components/EmployeeSidebar.vue'
import axios from 'axios'

const transactions = ref([])

onMounted(async () => {
  try {
    console.log('Fetching transactions...')
    const response = await axios.get('/api/transactions')
    console.log('Response:', response)
    transactions.value = response.data
  } catch (error) {
    console.error('Failed to fetch transactions', error)
    alert('Error fetching transactions: ' + (error.response?.data?.error || error.message))
  }
})

function formatAmount(amount) {
  if (!amount) return '0.00'
  const num = parseFloat(amount)
  return (num > 0 ? '+' : '') + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<style scoped>
/* Optional: Slight hover effect on table rows */
tbody tr:hover {
  background-color: #f0fdf4; /* Light green background on hover */
}
</style>