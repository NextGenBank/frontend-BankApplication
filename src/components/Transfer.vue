<template>
  <div class="flex min-h-screen font-sans">
    <Sidebar />
    <main class="flex-1 bg-gradient-to-r from-white to-green-50 flex items-center justify-center">
      <div class="bg-white shadow-md rounded-2xl p-12 w-full max-w-2xl">
        <h2 class="text-2xl font-bold text-center text-green-700 mb-6">Transfer</h2>
        <form class="space-y-4" @submit.prevent="submitTransfer">
          <div v-for="(field, index) in fields" :key="index" class="space-y-1">
            <label class="block text-gray-700 mb-1">{{ field.label }}</label>
            <input
              v-model="transferData[field.model]"
              :type="field.type"
              :placeholder="field.placeholder"
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
import { ref } from 'vue'
<<<<<<< HEAD
import Sidebar from '../components/Sidebar.vue'
=======
import TransferService from '@/services/TransferService'
import Sidebar from '@/components/Sidebar.vue'
>>>>>>> 23e0820295f6d3d98a4a58decadb28386ad0ddb0

const fields = [
  { label: 'From account', placeholder: 'Enter Name', type: 'text', model: 'fromAccount' },
  { label: 'To account', placeholder: 'Enter Name', type: 'text', model: 'toAccount' },
  { label: 'Account number', placeholder: 'Account number (IBAN)', type: 'text', model: 'accountNumber' },
  { label: 'Bank', placeholder: 'Enter Bank Name', type: 'text', model: 'bank' },
  { label: 'Amount', placeholder: 'Enter Amount', type: 'number', model: 'amount' },
  { label: 'Transfer description', placeholder: 'Enter Transfer Description', type: 'text', model: 'description' },
  { label: 'Timestamp', placeholder: '01.02.2026 – 12:04', type: 'text', model: 'timestamp' }
]

const transferData = ref({
  fromAccount: '',
  toAccount: '',
  accountNumber: '',
  bank: '',
  amount: '',
  description: '',
  timestamp: ''
})

function submitTransfer() {
  TransferService.createTransfer(transferData.value)
    .then(response => {
      alert(response.message)
    })
    .catch(error => {
      console.error('Failed to transfer', error)
    })
}
</script>
