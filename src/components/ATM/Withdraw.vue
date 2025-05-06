<template>
    <div class="card p-4" style="width: 360px;">
      <h2 class="text-success mb-4">Withdraw</h2>
      <div class="mb-3">
        <label>Account</label>
        <select v-model="account" class="form-select">
          <option disabled value="">Select account</option>
          <option>Savings</option>
          <option>Checking</option>
        </select>
      </div>
      <div class="mb-3">
        <label>Amount</label>
        <input v-model="amount" type="number" class="form-control" placeholder="0.00" />
      </div>
      <button @click="toBills" class="btn btn-success w-100">Withdraw</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return { account: '', amount: null };
    },
    methods: {
      toBills() {
        // передаём сумму как query-параметр
        this.$router.push({ path: '/atmwithdraw-bills', query: { amount: this.amount } });
      }
    }
  };
  </script>
  