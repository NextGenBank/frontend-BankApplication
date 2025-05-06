<template>
  <div class="flex min-h-screen font-sans">
    <Sidebar />
    <main class="flex-1 bg-gradient-to-r from-white to-green-50 flex items-center justify-center">
      <div class="bg-white shadow-md rounded-2xl p-12 w-full max-w-2xl">
        <h2 class="text-2xl font-bold text-center text-green-700 mb-6">Create user account</h2>
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

const fields = [
  { label: 'First Name', placeholder: 'Enter name here', type: 'text', model: 'firstName' },
  { label: 'Last Name', placeholder: 'Enter name here', type: 'text', model: 'lastName' },
  { label: 'Email', placeholder: 'Enter your Email', type: 'email', model: 'email' },
  { label: 'Password', placeholder: 'Enter your Password', type: 'password', model: 'password' },
  { label: 'Confirm password', placeholder: 'Confirm password', type: 'password', model: 'confirmPassword' },
  { label: 'BSN', placeholder: 'Enter your BSN', type: 'text', model: 'bsn' },
  { label: 'Phone number', placeholder: 'Enter your phone number', type: 'text', model: 'phone' },
  { label: 'Transfer limit', placeholder: 'Enter transfer limit', type: 'number', model: 'number' }
]

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  bsn: '',
  phone: '',
  transferlimit: ''
})


/*
function submitCreateAccount() {
  UserService.createUser(formData.value)
    .then(response => {
      alert(response.message)
    })
    .catch(error => {
      console.error('Failed to create user', error)
    })
}
*/

</script>
