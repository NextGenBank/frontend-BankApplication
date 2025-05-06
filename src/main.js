import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import './assets/main.css';
import App from "./App.vue";
import { getAuthToken, setAuthToken } from "./utils/auth";

// Import components
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import Auth from "./components/Auth.vue";

// Customer
import CustomerProfileView from "./components/CustomerProfileView.vue";
import CustomerTransferFundsForm from "./components/CustomerTransferFundsForm.vue";
import CustomerDashboard from "./components/CustomerDashboard.vue";
import CustomerTransactions from "./components/CustomerTransactions.vue";

// Employee
import EmployeeCreateUserAccount from './components/EmployeeCreateUserAccount.vue';
import EmployeeDashboard from './components/EmployeeDashboard.vue';
import EmployeeTransactions from './components/EmployeeTransactions.vue';
import EmployeeTransfer from './components/EmployeeTransfer.vue';
import EmployeePendingApprovals from "./components/EmployeePendingApprovals.vue";
import EmployeeApprovedAccounts from "./components/EmployeeApprovedAccounts.vue";

// ATM
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
    path: "/customerDashboard",
    component: CustomerDashboard,
  },
  {
    path: "/customerTransferFundsForm",
    component: CustomerTransferFundsForm,
  },
  {
    path: "/customerProfile",
    component: CustomerProfileView,
  },
  {
    path: "/customerTransactions",
    component: CustomerTransactions
  },

  // Employee
  {
    path: "/employeeDashboard",
    component: EmployeeDashboard,
  },
  {
    path: "/employeePending",
    component: EmployeePendingApprovals,
  },
  {
    path: "/employeeApproved",
    component: EmployeeApprovedAccounts,
  },
  {
    path: "/employeeTransfer",
    component: EmployeeTransfer,
  },
  {
    path: "/employeeCreateAccount",
    component: EmployeeCreateUserAccount,
  },
  {
    path: "/employeeTransactions",
    component: EmployeeTransactions,
  },

  // ATM
  {
    path: '/atmdeposit',
    component: ATM_Deposit
  },
  {
    path: '/atmwithdraw',
    component: ATM_Withdraw
  },
  {
    path: '/atmwithdraw-bills',
    component: ATM_WithdrawBills
  },
  {
    path: '/atmdashboard',
    component: ATM_Dashboard
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");