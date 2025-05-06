import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '@/components/Dashboard.vue'
import Transactions from '@/components/Transactions.vue'
import Transfer from '@/components/Transfer.vue'
import CreateUserAccount from '@/components/CreateUserAccount.vue'

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
