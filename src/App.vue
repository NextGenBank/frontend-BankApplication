<script>
import axios from 'axios'

// Configure axios base URL
axios.defaults.baseURL = 'http://localhost:8080'

export default {
  setup() {
  },
};
</script>
<!-- 
  Make a check that if you're an employee the navigation is hidden because employee uses sidebar instead
 -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">NextGenBank</RouterLink>
      <div class="navbar-nav ms-auto">
        <RouterLink class="nav-item nav-link" to="/customerdashboard">Dashboard</RouterLink>
        <RouterLink class="nav-item nav-link" to="/customertransactions">Transactions</RouterLink>
        <RouterLink class="nav-item nav-link" to="/customerprofile">Profile</RouterLink>
        <RouterLink class="nav-item nav-link" to="/auth">Login/Register</RouterLink>
      </div>
    </div>
  </nav>
  <div class="container">
    <main>
      <RouterView />
    </main>
  </div>
</template>