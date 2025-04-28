import { createRouter, createWebHistory } from 'vue-router'

import CreateUserAccount from '@/components/CreateUserAccount.vue'
import Transfer from '@/components/Transfer.vue'
import Transactions from '@/components/Transactions.vue'

const routes = [
  { path: '/', name: 'CreateAccount', component: CreateUserAccount },
  { path: '/transfer', name: 'Transfer', component: Transfer },
  { path: '/transactions', name: 'Transactions', component: Transactions }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
