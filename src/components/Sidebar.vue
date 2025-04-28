<template>
  <aside class="w-72 bg-green-200 p-6 flex flex-col justify-between min-h-screen">
    <div>
      <h2 class="text-white text-2xl font-bold mb-6">Overview</h2>
      <ul class="space-y-3">
        <li><router-link to="/dashboard" class="sidebar-link" active-class="active-link">Dashboard</router-link></li>
        <li><router-link to="/transactions" class="sidebar-link" active-class="active-link">Transactions</router-link></li>
        <li><router-link to="/transfer" class="sidebar-link" active-class="active-link">Transfer</router-link></li>
        <li><router-link to="/" class="sidebar-link" active-class="active-link" exact>Create account</router-link></li>
        <li><router-link to="/signups" class="sidebar-link" active-class="active-link">Sign ups</router-link></li>
        <li><router-link to="/accounts" class="sidebar-link" active-class="active-link">Accounts</router-link></li>
      </ul>
    </div>
    <button class="bg-red-600 text-white py-2 px-5 rounded mt-10">Log out</button>
  </aside>
</template>

<script setup>
</script>

<style scoped>
.sidebar-link {
  display: block;
  width: 100%;
  padding: 0.5rem 1.25rem;
  background-color: white;
  border-radius: 0.5rem;
  text-align: left;
  transition: background-color 0.3s, color 0.3s;
}
.sidebar-link:hover {
  background-color: #86efac; /* Light green on hover */
}
.active-link {
  background-color: #16a34a; /* Darker green */
  color: white;
}
</style>
