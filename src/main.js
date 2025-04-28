import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
import ATM_Dashboard from './components/ATM/Dashboard.vue';
import ATM_Deposit from './components/ATM/Deposit.vue';
import ATM_Withdraw from './components/ATM/Withdraw.vue';
import ATM_WithdrawBills from './components/ATM/WithdrawBills.vue';
import Auth from "./components/Auth.vue";
import Profile from "./components/Profile.vue";

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
  { path: '/deposit', component: ATM_Deposit },
  { path: '/withdraw', component: ATM_Withdraw },
  { path: '/withdraw-bills', component: ATM_WithdrawBills },
  {
    path: "/auth",
    component: Auth,
  },
  {
    path: "/profile",
    component: Profile,
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
