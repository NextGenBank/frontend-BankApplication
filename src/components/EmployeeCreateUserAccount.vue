<template>
  <div class="flex min-h-screen font-sans">
    <Sidebar />
    <main class="flex-1 bg-gradient-to-r from-white to-green-50 flex items-center justify-center">
      <div class="bg-white shadow-md rounded-2xl p-12 w-full max-w-2xl">
        <h2 class="text-2xl font-bold text-center text-green-700 mb-6">Create user account</h2>
        <div v-if="successMessage" class="bg-green-100 text-green-700 p-4 rounded mb-4">
          {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="bg-red-100 text-red-700 p-4 rounded mb-4">
          {{ errorMessage }}
        </div>
        <form class="space-y-4" @submit.prevent="submitCreateAccount">
          <div v-for="(field, index) in fields" :key="index" class="space-y-1">
            <label class="block text-gray-700 mb-1">{{ field.label }}</label>
            <input
              v-model="formData[field.model]"
              :type="field.type"
              :placeholder="field.placeholder"
              class="w-full border border-gray-300 rounded px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-200"
            />
          </div>
          <button type="submit" class="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition">
            Create account
          </button>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/EmployeeSidebar.vue' 
import axios from 'axios'

const fields = [
  { label: 'First Name', placeholder: 'Enter name here', type: 'text', model: 'firstName' },
  { label: 'Last Name', placeholder: 'Enter name here', type: 'text', model: 'lastName' },
  { label: 'Email', placeholder: 'Enter your Email', type: 'email', model: 'email' },
  { label: 'Password', placeholder: 'Enter your Password', type: 'password', model: 'password' },
  { label: 'Confirm password', placeholder: 'Confirm password', type: 'password', model: 'confirmPassword' },
  { label: 'BSN', placeholder: 'Enter your BSN', type: 'text', model: 'bsn' },
  { label: 'Phone number', placeholder: 'Enter your phone number', type: 'text', model: 'phone' },
  { label: 'Transfer limit', placeholder: 'Enter transfer limit', type: 'number', model: 'transferLimit' }
]

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  bsn: '',
  phone: '',
  transferLimit: ''
})

const successMessage = ref('')
const errorMessage = ref('')

async function submitCreateAccount() {
  // Reset messages
  successMessage.value = ''
  errorMessage.value = ''
  
  // Validate passwords match
  if (formData.value.password !== formData.value.confirmPassword) {
    errorMessage.value = 'Passwords do not match'
    return
  }
  
  try {
    console.log('Submitting registration...')
    // Use the correct endpoint from RegisterController
    const url = axios.defaults.baseURL + '/api/user/register'
    console.log('Registering user at URL:', url)
    
    const response = await axios.post(url, {
      firstName: formData.value.firstName,
      lastName: formData.value.lastName,
      email: formData.value.email,
      password: formData.value.password,
      bsn: formData.value.bsn,
      phone: formData.value.phone
      // Transfer limit will be handled in the backend
    })
    
    console.log('Registration response:', response)
    successMessage.value = 'User account created successfully and will appear in the pending tab'
    
    // Reset form
    formData.value = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      bsn: '',
      phone: '',
      transferLimit: ''
    }
    
    // Redirect to pending tab after 2 seconds
    setTimeout(() => {
      window.location.href = '/employeePending'
    }, 2000)
    
  } catch (error) {
    console.error('Failed to create user', error)
    if (error.response?.data?.error) {
      errorMessage.value = error.response.data.error
    } else if (error.message) {
      errorMessage.value = error.message
    } else {
      errorMessage.value = 'Failed to create user account'
    }
  }
}
</script>