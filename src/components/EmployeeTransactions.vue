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
              <td class="py-3 font-semibold">
                {{ formatAbsoluteAmount(transaction.amount) }}
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
    
    // Use the correct endpoint for employee transactions with full URL
    const transactionsUrl = axios.defaults.baseURL + '/api/transactions/all'
    console.log('Fetching from URL:', transactionsUrl)
    const response = await axios.get(transactionsUrl)
    console.log('Response from /api/transactions/all:', response)
    
    // Check if response.data is an array
    if (Array.isArray(response.data)) {
      // Filter out zero value transactions
      transactions.value = response.data.filter(t => t.amount !== null && parseFloat(t.amount) !== 0)
    } else if (response.data && typeof response.data === 'object') {
      // Handle case where response.data might be a wrapped object
      console.log('Response data is not an array, attempting to extract array content')
      const dataArray = response.data.content || response.data.transactions || response.data.data || []
      transactions.value = Array.isArray(dataArray) 
        ? dataArray.filter(t => t.amount !== null && parseFloat(t.amount) !== 0)
        : []
    } else {
      console.error('Unexpected response format:', response.data)
      transactions.value = []
    }
    
    console.log(`Loaded ${transactions.value.length} transactions`)
    
  } catch (error) {
    console.error('Failed to fetch transactions', error)
    transactions.value = []
    alert('Error fetching transactions: ' + (error.response?.data?.error || error.message))
  }
})

function formatAmount(amount) {
  if (!amount) return '0.00'
  const num = parseFloat(amount)
  return (num > 0 ? '+' : '') + num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

function formatAbsoluteAmount(amount) {
  if (!amount) return '0.00'
  const num = Math.abs(parseFloat(amount))
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}
</script>

<style scoped>
/* Optional: Slight hover effect on table rows */
tbody tr:hover {
  background-color: #f0fdf4; /* Light green background on hover */
}
</style>