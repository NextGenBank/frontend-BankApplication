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
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '../stores/user'
import Sidebar from '@/components/EmployeeSidebar.vue'
import axios from 'axios'

const userStore = useUserStore()
const user = computed(() => userStore.user)

// Get the actual user ID if logged in
const initiatorId = computed(() => {
  return user.value && user.value.userId ? user.value.userId : 1
})

const transferData = ref({
  accountNumber: '',  // source account IBAN
  toAccount: '',     // destination account IBAN
  amount: '',
  description: '',
  initiatorId: initiatorId.value
})

const successMessage = ref('')
const errorMessage = ref('')

// Update initiatorId when user is loaded
onMounted(() => {
  if (user.value && user.value.userId) {
    transferData.value.initiatorId = user.value.userId
  }
})

async function submitTransfer() {
  // Reset messages
  successMessage.value = ''
  errorMessage.value = ''
  
  // Ensure initiator ID is set correctly
  transferData.value.initiatorId = initiatorId.value
  
  console.log('Transfer data:', transferData.value)
  
  try {
    // Make sure amount is valid
    if (!transferData.value.amount || isNaN(parseFloat(transferData.value.amount)) || parseFloat(transferData.value.amount) <= 0) {
      throw new Error('Please enter a valid positive amount')
    }
    
    // Make sure account numbers are provided
    if (!transferData.value.accountNumber || !transferData.value.toAccount) {
      throw new Error('Please enter both source and destination account numbers')
    }
    
    const response = await axios.post('/api/employees/transfer', transferData.value)
    
    // Handle the more structured response
    if (response.data && response.status === 200) {
      successMessage.value = 'Transfer completed successfully'
      
      // Reset form
      transferData.value = {
        accountNumber: '',
        toAccount: '',
        amount: '',
        description: '',
        initiatorId: initiatorId.value
      }
    }
  } catch (error) {
    console.error('Failed to transfer', error)
    
    // Handle the more structured error response
    if (error.response && error.response.data) {
      if (error.response.data.message) {
        errorMessage.value = error.response.data.message
      } else {
        errorMessage.value = 'Failed to complete transfer: ' + (error.response.data.error || error.message)
      }
    } else {
      errorMessage.value = 'Failed to complete transfer: ' + error.message
    }
  }
}
</script>