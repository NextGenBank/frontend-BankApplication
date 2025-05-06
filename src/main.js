import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import './assets/main.css';

import App from "./App.vue";
import { getAuthToken, setAuthToken } from "./utils/auth";

// Import components
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import Auth from "./components/Auth.vue";
import Dashboard from './components/EmployeeDashboard.vue';
import EmployeeTransactions from './components/EmployeeTransactions.vue';
import EmployeeTransfer from './components/EmployeeTransfer.vue';
import CreateUserAccount from './components/EmployeeCreateUserAccount.vue';
import CustomerProfileView from "./components/CustomerProfileView.vue";
import CustomerTransferFundsForm from "./components/CustomerTransferFundsForm.vue";
import EmployeePendingApprovals from "./components/EmployeePendingApprovals.vue";
import EmployeeApprovedAccounts from "./components/EmployeeApprovedAccounts.vue";
import CustomerDashboard from "./components/CustomerDashboard.vue";
import Transactions from "./components/Transactions.vue";
import ATM_Dashboard from './components/ATM/Dashboard.vue';
import ATM_Deposit from './components/ATM/Deposit.vue';
import ATM_Withdraw from './components/ATM/Withdraw.vue';
import ATM_WithdrawBills from './components/ATM/WithdrawBills.vue';

// Initialize auth token if it exists
const token = getAuthToken();
if (token) {
  setAuthToken(token);
}

const routes = [
  // Homepage & Other default information
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/auth",
    component: Auth,
  },

  // Customer
  {
    path: "/customerdashboard",
    component: CustomerDashboard,
  },
  {
    path: "/customertransferfunds",
    component: CustomerTransferFundsForm,
  },
  {
    path: "/customerprofile",
    component: CustomerProfileView,
  },
  {
    path: "/customertransactions",
    component: Transactions
  },

  // Employee
  {
    path: "/employeedashboard",
    component: Dashboard,
  },
  {
    path: "/pending",
    component: EmployeePendingApprovals,
  },
  {
    path: "/approved",
    component: EmployeeApprovedAccounts,
  },
  {
    path: "/transfer",
    name: "Transfer",
    component: EmployeeTransfer,
  },
  {
    path: "/createaccount",
    name: "CreateUserAccount",
    component: CreateUserAccount,
  },
  {
    path: "/EmployeeTransactions",
    name: "Transactions",
    component: EmployeeTransactions,
  },

  // ATM
  { path: '/deposit', component: ATM_Deposit },
  { path: '/withdraw', component: ATM_Withdraw },
  { path: '/withdraw-bills', component: ATM_WithdrawBills },
  { path: '/dashboard', component: ATM_Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");
