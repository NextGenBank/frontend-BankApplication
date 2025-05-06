import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import ATM_Dashboard from './components/ATM/Dashboard.vue';
import ATM_Deposit from './components/ATM/Deposit.vue';
import ATM_Withdraw from './components/ATM/Withdraw.vue';
import ATM_WithdrawBills from './components/ATM/WithdrawBills.vue';
import Auth from "./components/Auth.vue";
import CustomerProfileView from "./components/CustomerProfileView.vue";
import CustomerTransferFundsForm from "./components/CustomerTransferFundsForm.vue";
import EmployeePendingApprovals from "./components/EmployeePendingApprovals.vue";
import EmployeeApprovedAccounts from "./components/EmployeeApprovedAccounts.vue";
import { getAuthToken, setAuthToken } from "@/utils/auth";
import { createPinia } from "pinia";

import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";

// Initialize auth token if it exists
const token = getAuthToken();
if (token) {
  setAuthToken(token);
}

const routes = [
  {
    path: "/",
    component: Home,
  },
  { path: '/dashboard', component: ATM_Dashboard },
  {
    path: "/about",
    component: About,
  },
  // {
  //   path: "/article",
  //   component: ArticleCreate,
  // },
  // {
  //   path: "/article/:id",
  //   component: ArticlePage,
  // },
  // {
  //   path: "/articles-edit/:id",
  //   component: ArticleUpdate,
  // },
  // {
  //   path: "/articles-improved/:id",
  //   component: ArticleUpdateImproved,
  // },
  {
    path: "/auth",
    component: Auth,
  },
  {
    path: "/profile",
    component: CustomerProfileView,
  },
  // {
  //   path: "/read-later",
  //   component: ReadLaterTable,
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");
