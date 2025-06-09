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
    console.log("Starting to fetch dashboard metrics")
    
    // ========== Load Customers ==========
    try {
      const customersUrl = axios.defaults.baseURL + '/api/employees/customers'
      console.log("Fetching customers from", customersUrl)
      const customersResponse = await axios.get(customersUrl)
      console.log("Raw customers response:", customersResponse)
      
      if (customersResponse.data) {
        // Check if data is an array
        if (Array.isArray(customersResponse.data)) {
          customers.value = customersResponse.data.length || 0
        } else if (customersResponse.data && typeof customersResponse.data === 'object') {
          // Handle case where data might be wrapped
          const customerArray = customersResponse.data.content || customersResponse.data.customers || []
          customers.value = Array.isArray(customerArray) ? customerArray.length : 0
        } else {
          customers.value = 0
        }
        
        console.log(`Loaded ${customers.value} customers`)
      }
    } catch (customerError) {
      console.error("Error loading customers:", customerError)
      customers.value = 0
    }
    
    // ========== Load Accounts ==========
    try {
      const accountsUrl = axios.defaults.baseURL + '/api/accounts'
      console.log("Fetching accounts from", accountsUrl)
      const accountsResponse = await axios.get(accountsUrl)
      console.log("Raw accounts response:", accountsResponse)
      
      if (accountsResponse.data) {
        // Check if data is an array
        let accountsArray = []
        if (Array.isArray(accountsResponse.data)) {
          accountsArray = accountsResponse.data
        } else if (accountsResponse.data && typeof accountsResponse.data === 'object') {
          // Handle case where data might be wrapped
          accountsArray = accountsResponse.data.content || accountsResponse.data.accounts || []
        }
        
        // Set the total number of accounts
        accounts.value = accountsArray.length || 0
        console.log(`Loaded ${accounts.value} accounts`)
        
        // Calculate total deposits correctly
        let total = 0
        accountsArray.forEach(account => {
          if (account.balance) {
            const balance = parseFloat(account.balance)
            if (!isNaN(balance)) {
              total += balance
            }
          }
        })
        totalDeposits.value = total
        console.log(`Calculated total deposits: ${totalDeposits.value}`)
      }
    } catch (accountsError) {
      console.error("Error loading accounts:", accountsError)
      accounts.value = 0
      totalDeposits.value = 0
    }
    
    // ========== Load Pending Transfers ==========
    try {
      const pendingUrl = axios.defaults.baseURL + '/api/transactions/pending'
      console.log("Fetching pending transfers from", pendingUrl)
      const pendingResponse = await axios.get(pendingUrl)
      console.log("Raw pending transfers response:", pendingResponse)
      
      if (pendingResponse.data) {
        // Check if data is an array
        if (Array.isArray(pendingResponse.data)) {
          pendingTransfers.value = pendingResponse.data.length || 0
        } else if (pendingResponse.data && typeof pendingResponse.data === 'object') {
          // Handle case where data might be wrapped
          const pendingArray = pendingResponse.data.content || pendingResponse.data.transactions || []
          pendingTransfers.value = Array.isArray(pendingArray) ? pendingArray.length : 0
        } else {
          pendingTransfers.value = 0
        }
        console.log(`Loaded ${pendingTransfers.value} pending transfers`)
      }
    } catch (pendingError) {
      console.error("Error loading pending transfers:", pendingError)
      pendingTransfers.value = 0
    }
    
  } catch (error) {
    console.error('Failed to fetch dashboard metrics', error)
    customers.value = 0
    accounts.value = 0
    totalDeposits.value = 0
    pendingTransfers.value = 0
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