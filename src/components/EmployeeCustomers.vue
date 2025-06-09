<template>
  <div class="flex min-h-screen font-sans">
    <Sidebar />
    <main class="flex-1 bg-gradient-to-r from-white to-green-50 p-8">
      <h2 class="text-2xl font-bold text-green-700 mb-6">Customers</h2>
      <div class="overflow-x-auto bg-white shadow-md rounded-2xl p-6">
        <table class="w-full text-left table-auto">
          <thead>
            <tr class="border-b">
              <th class="pb-2">ID</th>
              <th class="pb-2">Name</th>
              <th class="pb-2">Email</th>
              <th class="pb-2">Phone Number</th>
              <th class="pb-2">Status</th>
              <th class="pb-2">Accounts</th>
              <th class="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.userId" class="border-t">
              <td class="py-3">{{ customer.userId }}</td>
              <td class="py-3">{{ customer.firstName }} {{ customer.lastName }}</td>
              <td class="py-3">{{ customer.email }}</td>
              <td class="py-3">{{ customer.phoneNumber }}</td>
              <td class="py-3">
                <span 
                  :class="{
                    'bg-yellow-100 text-yellow-800': customer.status === 'PENDING',
                    'bg-green-100 text-green-800': customer.status === 'APPROVED',
                    'bg-red-100 text-red-800': customer.status === 'REJECTED'
                  }"
                  class="px-2 py-1 rounded-full text-xs font-semibold"
                >
                  {{ customer.status }}
                </span>
              </td>
              <td class="py-3">
                <div v-if="customerAccountsMap[customer.userId]">
                  <div v-for="account in customerAccountsMap[customer.userId]" :key="account.IBAN" class="text-xs mb-1">
                    <span class="font-semibold">{{ account.accountType }}:</span> {{ account.IBAN }}
                  </div>
                </div>
                <div v-else class="text-gray-500 text-xs">Loading accounts...</div>
              </td>
              <td class="py-3">
                <button 
                  @click="viewCustomerTransactions(customer.userId)"
                  class="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600 transition"
                >
                  View Details
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Customer transactions modal -->
      <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="bg-white rounded-lg shadow-xl w-4/5 max-h-[80vh] overflow-auto">
          <div class="p-6 border-b border-gray-200">
            <div class="flex justify-between items-center">
              <h3 class="text-xl font-bold text-green-700">
                Transactions for {{ selectedCustomer ? selectedCustomer.firstName + ' ' + selectedCustomer.lastName : '' }}
              </h3>
              <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
          </div>
          <div class="p-6">
            <div v-if="loadingTransactions" class="text-center py-10">
              <p>Loading transactions...</p>
            </div>
            <div v-else-if="customerTransactions.length === 0" class="text-center py-10">
              <p>No transactions found for this customer.</p>
            </div>
            <div v-else class="overflow-x-auto">
              <table class="w-full text-left table-auto">
                <thead>
                  <tr class="border-b">
                    <th class="pb-2">To account</th>
                    <th class="pb-2">From account</th>
                    <th class="pb-2">Time stamp</th>
                    <th class="pb-2">Transfer amount</th>
                    <th class="pb-2">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(transaction, index) in customerTransactions" :key="index" class="border-t">
                    <td class="py-3">{{ transaction.toAccount }}</td>
                    <td class="py-3">{{ transaction.fromAccount }}</td>
                    <td class="py-3">{{ transaction.timestamp }}</td>
                    <td class="py-3 font-semibold"
                        :class="isTransactionOutgoing(transaction, selectedCustomer.userId) ? 'text-red-600' : 'text-green-600'">
                      {{ isTransactionOutgoing(transaction, selectedCustomer.userId) ? '-' : '+' }}{{ formatAbsoluteAmount(transaction.amount) }}
                    </td>
                    <td class="py-3">
                      {{ transaction.transactionType }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Account details and limit setting -->
            <div class="mt-6 pt-6 border-t border-gray-200">
              <h4 class="text-lg font-bold text-green-700 mb-4">Account Details</h4>
              <div v-if="loadingAccounts" class="text-center py-3">
                <p>Loading accounts...</p>
              </div>
              <div v-else-if="customerAccounts.length === 0" class="text-center py-3">
                <p>No accounts found for this customer.</p>
              </div>
              <div v-else>
                <div v-for="(account, index) in customerAccounts" :key="index" class="mb-6 p-4 border rounded-lg">
                  <div class="flex justify-between items-center mb-4">
                    <div>
                      <p class="font-bold">IBAN: {{ account.iban || account.IBAN }}</p>
                      <p>Type: {{ account.accountType }}</p>
                      <p>Balance: {{ formatAmount(account.balance) }}</p>
                      <p class="text-xs text-gray-500">ID: {{ account.id || 'N/A' }}</p>
                    </div>
                    <div>
                      <p>Daily Transfer Limit: {{ formatAmount(account.absoluteTransferLimit) }}</p>
                      <p class="text-xs text-gray-500">
                        Today's transfers: {{ formatAmount(account.dailyTransferAmount || 0) }}
                      </p>
                    </div>
                  </div>
                  
                  <div class="flex items-end gap-4">
                    <div class="flex-1">
                      <label class="block text-gray-700 mb-1">New Daily Transfer Limit</label>
                      <input 
                        type="number" 
                        v-model="limitData[account.IBAN || account.iban]" 
                        class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                        placeholder="Enter new limit"
                        min="0"
                        step="10"
                        @input="validateLimit(account.IBAN || account.iban)"
                      />
                    </div>
                    <button 
                      @click="updateTransferLimit(account.IBAN || account.iban, index)" 
                      class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                      Update Limit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import Sidebar from '@/components/EmployeeSidebar.vue'
import axios from 'axios'

const customers = ref([])
const showModal = ref(false)
const selectedCustomer = ref(null)
const customerTransactions = ref([])
const customerAccounts = ref([])
const loadingTransactions = ref(false)
const loadingAccounts = ref(false)
const limitData = ref({})
const customerAccountsMap = reactive({})

onMounted(async () => {
  try {
    console.log('Fetching customers...')
    
    // Fetch customers with full URL
    const customersUrl = axios.defaults.baseURL + '/api/employees/customers'
    console.log('Fetching from URL:', customersUrl)
    const customersResponse = await axios.get(customersUrl)
    console.log('Customers Response:', customersResponse)
    
    if (Array.isArray(customersResponse.data)) {
      customers.value = customersResponse.data
    } else if (customersResponse.data && typeof customersResponse.data === 'object') {
      // Handle case where data might be wrapped in an object
      customers.value = customersResponse.data.content || customersResponse.data.customers || []
    } else {
      console.error('Unexpected customers response format:', customersResponse.data)
      customers.value = []
    }
    
    // Get accounts for each customer
    if (customers.value.length > 0) {
      await fetchAllCustomerAccounts()
    }
    
    console.log('Initialization complete')
  } catch (error) {
    console.error('Failed to fetch customer data', error)
    alert('Error fetching customer data: ' + (error.response?.data?.error || error.message))
  }
})

// Fetch accounts for all customers more efficiently
async function fetchAllCustomerAccounts() {
  try {
    console.log('Fetching all customer accounts in batch...')
    // Get all accounts in a single request with full URL
    const accountsUrl = axios.defaults.baseURL + '/api/accounts'
    console.log('Fetching accounts from URL:', accountsUrl)
    const response = await axios.get(accountsUrl)
    console.log('Accounts response:', response)
    
    // Create a map to organize accounts by customer ID
    const accountMap = {}
    
    // Check if response.data is an array
    let accountsArray = []
    if (Array.isArray(response.data)) {
      accountsArray = response.data
    } else if (response.data && typeof response.data === 'object') {
      accountsArray = response.data.content || response.data.accounts || []
    }
    
    // Process all accounts
    accountsArray.forEach(account => {
      if (account.customer && account.customer.userId) {
        const customerId = account.customer.userId
        if (!accountMap[customerId]) {
          accountMap[customerId] = []
        }
        accountMap[customerId].push(account)
      }
    })
    
    // Update the reactive object just once with all customer accounts
    console.log('Updating customer accounts map...')
    Object.keys(accountMap).forEach(customerId => {
      customerAccountsMap[customerId] = accountMap[customerId]
    })
    
    console.log('All customer accounts loaded successfully')
  } catch (error) {
    console.error('Failed to fetch accounts for customers', error)
  }
}

// Fetch accounts for a specific customer
async function fetchCustomerAccounts(customerId) {
  try {
    const accountsUrl = axios.defaults.baseURL + `/api/accounts/customer/${customerId}`
    console.log(`Fetching accounts for customer ${customerId} from URL:`, accountsUrl)
    const response = await axios.get(accountsUrl)
    customerAccountsMap[customerId] = response.data
  } catch (error) {
    console.error(`Failed to fetch accounts for customer ${customerId}`, error)
    customerAccountsMap[customerId] = []
  }
}

// Removed approve function as it's not part of this developer's tasks

async function viewCustomerTransactions(customerId) {
  try {
    selectedCustomer.value = customers.value.find(c => c.userId === customerId)
    showModal.value = true
    
    loadingTransactions.value = true
    loadingAccounts.value = true
    
    // Create full URLs for API endpoints
    const txUrl = axios.defaults.baseURL + `/api/transactions/customer/${customerId}`
    const acctUrl = axios.defaults.baseURL + `/api/accounts/customer/${customerId}`
    
    console.log('Fetching customer transactions from:', txUrl)
    console.log('Fetching customer accounts from:', acctUrl)
    
    // Use Promise.all to fetch transactions and accounts in parallel
    const [transactionsResponse, accountsResponse] = await Promise.all([
      axios.get(txUrl),
      axios.get(acctUrl)
    ])
    
    console.log('Transactions response:', transactionsResponse)
    console.log('Accounts response:', accountsResponse)
    
    // Process transactions - filter out zero-amount transactions
    if (Array.isArray(transactionsResponse.data)) {
      customerTransactions.value = transactionsResponse.data
        .filter(t => t.amount !== null && parseFloat(t.amount) !== 0)
    } else if (transactionsResponse.data && typeof transactionsResponse.data === 'object') {
      const txArray = transactionsResponse.data.content || transactionsResponse.data.transactions || []
      customerTransactions.value = Array.isArray(txArray) 
        ? txArray.filter(t => t.amount !== null && parseFloat(t.amount) !== 0) 
        : []
    } else {
      customerTransactions.value = []
    }
    
    // Process accounts
    if (Array.isArray(accountsResponse.data)) {
      customerAccounts.value = accountsResponse.data
    } else if (accountsResponse.data && typeof accountsResponse.data === 'object') {
      const acctArray = accountsResponse.data.content || accountsResponse.data.accounts || []
      customerAccounts.value = Array.isArray(acctArray) ? acctArray : []
    } else {
      customerAccounts.value = []
    }
    
    // Initialize limit data
    customerAccounts.value.forEach(account => {
      const iban = account.IBAN || account.iban;
      if (iban) {
        limitData.value[iban] = account.absoluteTransferLimit;
        console.log(`Initialized limit data for ${iban}: ${account.absoluteTransferLimit}`);
      } else {
        console.warn('Account missing IBAN:', account);
      }
    })
    
    loadingTransactions.value = false
    loadingAccounts.value = false
  } catch (error) {
    console.error('Failed to fetch customer data', error)
    loadingTransactions.value = false
    loadingAccounts.value = false
    customerAccounts.value = []
    customerTransactions.value = []
    alert('Error fetching customer details: ' + (error.response?.data?.error || error.message))
  }
}

function closeModal() {
  showModal.value = false
  selectedCustomer.value = null
  customerTransactions.value = []
  customerAccounts.value = []
  limitData.value = {}
}

async function updateTransferLimit(accountIban, index) {
  try {
    // Get the account by index since the IBAN might be coming from different properties
    const account = customerAccounts.value[index];
    
    if (!account) {
      throw new Error('Account not found');
    }
    
    // Verify the account IBAN
    if (accountIban !== (account.IBAN || account.iban)) {
      throw new Error('Account IBAN mismatch');
    }
    
    // Ensure limit is a positive number before sending
    const newLimit = parseFloat(limitData.value[accountIban]);
    if (isNaN(newLimit) || newLimit < 0) {
      throw new Error('Daily transfer limit must be a positive number');
    }
    
    console.log('Updating daily transfer limit for account:', account);
    console.log('Account IBAN:', accountIban, 'New daily transfer limit:', newLimit);
    
    // Use full URL for the API call
    const limitUrl = axios.defaults.baseURL + '/api/accounts/limit'
    console.log('Updating limit at URL:', limitUrl)
    
    await axios.put(limitUrl, {
      accountIban: accountIban,
      absoluteTransferLimit: newLimit
    })
    
    // Update the local data to reflect the change
    const currentAccount = customerAccounts.value[index];
    currentAccount.absoluteTransferLimit = newLimit;
    
    alert('Daily transfer limit updated successfully')
  } catch (error) {
    console.error('Failed to update daily transfer limit', error)
    alert('Failed to update daily transfer limit: ' + (error.response?.data?.error || error.message))
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

// Determine if a transaction is outgoing for a specific customer
function isTransactionOutgoing(transaction, customerId) {
  // Check if this customer is the sender by looking at the fromAccount property
  if (transaction.fromAccount) {
    // Get the account's customer by looking for customer.userId property on the account
    // In the case of DTOs, we need to get the customer based on account ID
    const accountData = customerAccountsMap[customerId] || []
    
    // Check if any of the customer's accounts match the fromAccount
    for (const account of accountData) {
      const accountId = account.IBAN || account.iban
      if (accountId === transaction.fromAccount) {
        return true // This customer's account is sending money out
      }
    }
  }
  
  return false // Not outgoing (either incoming or not related to this customer)
}

function validateLimit(accountIban) {
  // Parse as float to handle decimal values properly
  const limitValue = parseFloat(limitData.value[accountIban]);
  
  // If value is negative or NaN, reset to 0
  if (limitValue < 0 || isNaN(limitValue)) {
    limitData.value[accountIban] = 0;
    console.log(`Reset negative or invalid limit for account ${accountIban} to 0`);
  }
}
</script>

<style scoped>
tbody tr:hover {
  background-color: #f0fdf4;
}
</style>