<template>
    <div class="d-flex vh-100 justify-content-center align-items-center">
      <div class="card p-4" style="width: 360px;">
        <h2 class="text-success mb-4">Deposit</h2>
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
        <button @click="doDeposit" class="btn btn-success w-100">Deposit</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return { account: '', amount: null };
    },
    methods: {
      doDeposit() {
        // TODO: API call
        alert(`Deposited ${this.amount} to ${this.account}`);
        this.$router.push('/atmdashboard');
      }
    }
  };
  </script>