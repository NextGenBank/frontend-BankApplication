<template>
  <div class="flex min-h-screen font-sans">
    <Sidebar />
    <main class="flex-1 bg-gradient-to-r from-white to-green-50 p-8">
      <h2 class="text-2xl font-bold text-green-700 mb-6">Transactions</h2>
      <div class="overflow-x-auto bg-white shadow-md rounded-2xl p-6">
        <div v-if="loading" class="flex justify-center py-8">
          <p>Loading transactions...</p>
        </div>
        <div v-else-if="error" class="bg-red-100 text-red-700 p-4 rounded mb-4">
          {{ error }}
        </div>
        <div v-else>
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
              <tr v-if="transactions.length === 0">
                <td colspan="6" class="py-4 text-center text-gray-500">
                  No transactions found
                </td>
              </tr>
            </tbody>
          </table>
          
          <!-- Pagination controls -->
          <div class="flex items-center justify-between mt-4">
            <div class="text-sm text-gray-700">
              Showing 
              <span class="font-medium">{{ transactions.length ? pagination.currentPage * pagination.pageSize + 1 : 0 }}</span> 
              to 
              <span class="font-medium">{{ Math.min((pagination.currentPage + 1) * pagination.pageSize, pagination.totalElements) }}</span> 
              of 
              <span class="font-medium">{{ pagination.totalElements }}</span> 
              results
            </div>
            <div class="flex space-x-2">
              <button 
                @click="fetchTransactions(pagination.currentPage - 1)"
                :disabled="pagination.currentPage === 0 || loading"
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md"
                :class="pagination.currentPage === 0 || loading ? 
                  'bg-gray-100 text-gray-400 cursor-not-allowed' : 
                  'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'"
              >
                Previous
              </button>
              <button 
                @click="fetchTransactions(pagination.currentPage + 1)"
                :disabled="pagination.currentPage >= pagination.totalPages - 1 || loading"
                class="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md"
                :class="pagination.currentPage >= pagination.totalPages - 1 || loading ? 
                  'bg-gray-100 text-gray-400 cursor-not-allowed' : 
                  'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from '@/components/EmployeeSidebar.vue'
import axios from 'axios'

const transactions = ref([])
const loading = ref(false)
const error = ref(null)

// Pagination state
const pagination = ref({
  currentPage: 0,
  totalPages: 0,
  pageSize: 10,
  totalElements: 0
})

onMounted(async () => {
  try {
    loading.value = true
    await fetchTransactions(0)
    console.log(`Loaded ${transactions.value.length} transactions`)
  } catch (error) {
    console.error('Failed to fetch transactions', error)
    transactions.value = []
    alert('Error fetching transactions: ' + (error.response?.data?.message || error.response?.data?.error || error.message))
  } finally {
    loading.value = false
  }
})

async function fetchTransactions(page = 0, size = 10) {
  try {
    loading.value = true
    error.value = null
    
    console.log('Fetching transactions page', page)
    
    // Use the correct endpoint for employee transactions with pagination
    const transactionsUrl = `${axios.defaults.baseURL}/api/transactions/all?page=${page}&size=${size}`
    console.log('Fetching from URL:', transactionsUrl)
    
    const response = await axios.get(transactionsUrl)
    console.log('Response from /api/transactions/all:', response)
    
    // Process paginated response
    if (response.data && typeof response.data === 'object') {
      if (response.data.content) {
        // Handle paginated response
        transactions.value = response.data.content
          .filter(t => t.amount !== null && parseFloat(t.amount) !== 0)
        
        // Update pagination state
        pagination.value = {
          currentPage: response.data.number,
          totalPages: response.data.totalPages,
          pageSize: response.data.size,
          totalElements: response.data.totalElements
        }
      } else if (Array.isArray(response.data)) {
        // Handle non-paginated array response for backward compatibility
        transactions.value = response.data
          .filter(t => t.amount !== null && parseFloat(t.amount) !== 0)
      } else {
        // Try to extract transactions from any other response format
        console.log('Response data structure not recognized, attempting to extract array content')
        const dataArray = response.data.transactions || response.data.data || []
        transactions.value = Array.isArray(dataArray) 
          ? dataArray.filter(t => t.amount !== null && parseFloat(t.amount) !== 0)
          : []
      }
    } else {
      console.error('Unexpected response format:', response.data)
      transactions.value = []
    }
  } catch (error) {
    console.error('Failed to fetch transactions', error)
    error.value = error.response?.data?.message || error.response?.data?.error || error.message
    transactions.value = []
    throw error
  } finally {
    loading.value = false
  }
}

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