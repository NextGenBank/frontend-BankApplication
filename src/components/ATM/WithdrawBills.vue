<template>
    <div class="d-flex vh-100 justify-content-center align-items-center">
      <div class="card p-4 text-center" style="width: 360px;">
        <h2 class="text-success mb-4">Withdraw</h2>
        <p class="fw-bold">Which bills do you want?</p>
        <div class="d-flex justify-content-center gap-3 mb-4">
          <button @click="choose(10)" class="btn btn-light">10</button>
          <button @click="choose(20)" class="btn btn-light">20</button>
          <button @click="choose(50)" class="btn btn-light">50</button>
        </div>
        <button @click="finish" class="btn btn-success w-100">Withdraw</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        bills: null,
        amount: this.$route.query.amount
      };
    },
    methods: {
      choose(n) {
        this.bills = n;
      },
      finish() {
        alert(`Withdrew ${this.amount} in bills of ${this.bills}`);
        this.$router.push('/atmdashboard');
      }
    }
  };
  </script>
  