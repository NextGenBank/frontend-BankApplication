<<<<<<< HEAD
import { createApp } from "vue";
import { createPinia } from "pinia";
import { createRouter, createWebHistory } from "vue-router";
import axios from 'axios';

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
=======
import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import About from "./components/About.vue";
// import ArticleUpdate from "./components/ArticleUpdate.vue";
// import ArticleUpdateImproved from "./components/ArticleUpdateImproved.vue";
// import ArticleCreate from "./components/ArticleCreate.vue";
import Auth from "./components/Auth.vue";
import Profile from "./components/Profile.vue";
// import ArticlePage from "./components/ArticlePage.vue";
// import ReadLaterTable from "./components/ReadLaterTable.vue";
import { getAuthToken, setAuthToken } from "@/utils/auth";
import { createPinia } from "pinia";

import "./assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
>>>>>>> 23e0820295f6d3d98a4a58decadb28386ad0ddb0

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
<<<<<<< HEAD
=======
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
>>>>>>> 23e0820295f6d3d98a4a58decadb28386ad0ddb0
  {
    path: "/auth",
    component: Auth,
  },
  {
    path: "/profile",
    component: Profile,
  },
<<<<<<< HEAD
  {
    path: "/createaccount",
    name: "CreateAccount",
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
=======
  // {
  //   path: "/read-later",
  //   component: ReadLaterTable,
  // },
>>>>>>> 23e0820295f6d3d98a4a58decadb28386ad0ddb0
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);
app.use(createPinia());

app.mount("#app");
