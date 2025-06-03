<!-- src/components/ATM/WithdrawBills.vue -->
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
      <button
        @click="finish"
        :disabled="!bills"
        class="btn btn-success w-100"
      >
        Withdraw
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  name: "ATM_WithdrawBills",
  data() {
    return {
      bills: null,
      iban:   this.$route.query.iban || "",
      amount: this.$route.query.amount || 0,
    };
  },
  methods: {
    choose(n) {
      this.bills = n;
    },
    async finish() {
      if (!this.iban || !this.amount || !this.bills) return;

      try {
        const payload = {
          iban: this.iban,
          amount: this.amount,
          bills: this.bills
        };
        await axios.post(API_ENDPOINTS.ATM.withdraw, payload);
      
        this.$router.push("/atmdashboard");
      } catch (err) {
        console.error("Withdraw failed:", err.response || err);
        const msg = err.response && err.response.data
          ? err.response.data
          : "Ошибка при снятии средств";
        alert(msg);
      }
    },
  },
};
</script>
