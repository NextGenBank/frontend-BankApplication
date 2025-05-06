import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/components/EmployeeDashboard.vue'
import Transactions from '@/components/EmployeeTransactions.vue'
import Transfer from '@/components/EmployeeTransfer.vue'
import CreateUserAccount from '@/components/EmployeeCreateUserAccount.vue'

const routes = [
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/transactions', name: 'Transactions', component: Transactions },
  { path: '/transfer', name: 'Transfer', component: Transfer },
  { path: '/createaccount', name: 'CreateAccount', component: CreateUserAccount },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
