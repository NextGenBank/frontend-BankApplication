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
import Profile from "./components/Profile.vue";
import Dashboard from './components/EmployeeDashboard.vue';
import Transactions from './components/EmployeeTransactions.vue';
import Transfer from './components/EmployeeTransfer.vue';
import CreateUserAccount from './components/EmployeeCreateUserAccount.vue';

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
  {
    path: "/about",
    component: About,
  },
  {
    path: "/auth",
    component: Auth,
  },
  {
    path: "/profile",
    component: Profile,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
  },
  {
    path: "/transfer",
    name: "Transfer",
    component: Transfer,
  },
  {
    path: "/createaccount",
    name: "CreateUserAccount",
    component: CreateUserAccount,
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
