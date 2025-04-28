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
import CreateUserAccount from './components/CreateUserAccount.vue'
import Transfer from './components/Transfer.vue'
import Transactions from './components/Transactions.vue'

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
    path: "/createaccount",
    name: "CreateUserAccount",
    component: CreateUserAccount,
  },
  {
    path: "/transfer",
    name: "Transfer",
    component: Transfer,
  },
  {
    path: "/transactions",
    name: "Transactions",
    component: Transactions,
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
