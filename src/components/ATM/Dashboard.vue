<!-- src/components/ATM/Dashboard.vue -->
<template>
  <div class="text-white text-center">
    <h2 class="mb-4">What do you want to do today?</h2>
    <div class="d-flex justify-content-center gap-4">
      <router-link to="/atmdeposit" class="btn btn-light btn-lg">Deposit money</router-link>
      <router-link to="/atmwithdraw" class="btn btn-light btn-lg">Withdraw money</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>
