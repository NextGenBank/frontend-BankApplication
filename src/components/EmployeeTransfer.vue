<template>
  <div class="flex min-h-screen font-sans">
    <Sidebar />
    <main class="flex-1 bg-gradient-to-r from-white to-green-50 flex items-center justify-center">
      <div class="bg-white shadow-md rounded-2xl p-12 w-full max-w-2xl">
        <h2 class="text-2xl font-bold text-center text-green-700 mb-6">Transfer</h2>
        <div v-if="successMessage" class="bg-green-100 text-green-700 p-4 rounded mb-4">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="bg-red-100 text-red-700 p-4 rounded mb-4">
          {{ errorMessage }}
        </div>
        <form class="space-y-4" @submit.prevent="submitTransfer">
          <div class="space-y-1">
            <label class="block text-gray-700 mb-1">From account (IBAN)</label>
            <input
              v-model="transferData.accountNumber"
              type="text"
              placeholder="Enter source account IBAN (e.g., NL12BANK1234567890)"
              class="w-full border border-gray-300 rounded px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
          </div>
          <div class="space-y-1">
            <label class="block text-gray-700 mb-1">To account (IBAN)</label>
            <input
              v-model="transferData.toAccount"
              type="text"
              placeholder="Enter destination account IBAN (e.g., NL34BANK0987654321)"
              class="w-full border border-gray-300 rounded px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
          </div>
          <div class="space-y-1">
            <label class="block text-gray-700 mb-1">Amount</label>
            <input
              v-model.number="transferData.amount"
              type="number"
              step="0.01"
              placeholder="Enter Amount"
              class="w-full border border-gray-300 rounded px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-200"
              required
            />
          </div>
          <div class="space-y-1">
            <label class="block text-gray-700 mb-1">Transfer description</label>
            <input
              v-model="transferData.description"
              type="text"
              placeholder="Enter Transfer Description"
              class="w-full border border-gray-300 rounded px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>
          <button type="submit" class="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition">
            Confirm Transfer
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUserStore } from '../stores/user'
import Sidebar from '@/components/EmployeeSidebar.vue'
import axios from 'axios'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const transferData = ref({
  accountNumber: '',  // source account IBAN
  toAccount: '',     // destination account IBAN
  amount: '',
  description: '',
  initiatorId: 1     // Default to first employee (ID: 1) for demo purposes
})

const successMessage = ref('')
const errorMessage = ref('')

async function submitTransfer() {
  // Reset messages
  successMessage.value = ''
  errorMessage.value = ''
  
  // Use the default initiator ID (1) since we don't have login yet
  console.log('Transfer data:', transferData.value)
  
  try {
    const response = await axios.post('/api/employees/transfer', transferData.value)
    successMessage.value = response.data.message || 'Transfer completed successfully'
    
    // Reset form
    transferData.value = {
      accountNumber: '',
      toAccount: '',
      amount: '',
      description: '',
      initiatorId: 1  // Keep the default employee ID
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.error || 'Failed to complete transfer'
    console.error('Failed to transfer', error)
  }
}
</script>