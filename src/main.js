// src/main.js
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import './assets/main.css';
import App from "./App.vue";
import { getAuthToken, setAuthToken } from "./utils/auth";
import './utils/axios'; // <-- activates the interceptors globally
import { useUserStore } from "@/stores/user";
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

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
import EmployeePendingAccounts from "./components/EmployeePendingAccounts.vue";
import EmployeeApprovedAccounts from "./components/EmployeeApprovedAccounts.vue";
import EmployeeRejectedAccounts from "./components/EmployeeRejectedAccounts.vue";
import EmployeeCustomers from "./components/EmployeeCustomers.vue";

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
  { path: "/", component: Home },
  { path: "/about", component: About },
  { path: "/auth", component: Auth },

  // Customer
  { path: "/customerDashboard", component: CustomerDashboard },
  { path: "/customerTransferFundsForm", component: CustomerTransferFundsForm },
  { path: "/customerProfile", component: CustomerProfileView },
  { path: "/customerTransactions", component: CustomerTransactions },

  // Employee
  { path: "/employeeDashboard", component: EmployeeDashboard },
  { path: "/employeePending", component: EmployeePendingAccounts },
  { path: "/employeeApproved", component: EmployeeApprovedAccounts },
  { path: "/employeeRejected", component: EmployeeRejectedAccounts, },
  { path: "/employeeTransfer", component: EmployeeTransfer },
  { path: "/employeeCreateAccount", component: EmployeeCreateUserAccount },
  { path: "/employeeTransactions", component: EmployeeTransactions },
  { path: "/employeeCustomers", component: EmployeeCustomers },

  // ATM
  { path: "/atmdeposit", component: ATM_Deposit },
  { path: "/atmwithdraw", component: ATM_Withdraw },
  { path: "/atmwithdraw-bills", component: ATM_WithdrawBills },
  { path: "/atmdashboard", component: ATM_Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

//  Navigation guard for protected routes
router.beforeEach(async (to, from, next) => {
  const publicPages = ["/", "/auth", "/about"];
  const authRequired = !publicPages.includes(to.path);
  const token = getAuthToken();

  const userStore = useUserStore();

  // Load user if token exists and not already loaded
  if (token && !userStore.user) {
    try {
      const res = await axios.get(API_ENDPOINTS.currentUser);
      userStore.setUser(res.data);
    } catch (err) {
      userStore.logout();
      return next("/auth");
    }
  }

  // Block unauthenticated access
  if (authRequired && !token) {
    return next("/auth");
  }

  // Block pending customers from customer-only pages
  const customerOnlyRoutes = [
    "/customerDashboard",
    "/customerTransactions",
    "/customerProfile",
    "/customerTransferFundsForm",
  ];

  const user = userStore.user;

  if (
    user &&
    user.role === "CUSTOMER" &&
    user.status === "PENDING" &&
    customerOnlyRoutes.includes(to.path)
  ) {
    return next("/"); // redirect to welcome page
  }

  next();
});

const app = createApp(App);
app.use(router);
app.use(createPinia());
app.mount("#app");
