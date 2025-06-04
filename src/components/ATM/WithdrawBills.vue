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
      <button @click="finish" class="btn btn-success w-100">
        Withdraw
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  name: "WithdrawBills",
  data() {
    return {
      bills: null,
      amount: null,
      iban: null
    };
  },
  created() {
    // Извлекаем из query параметры ?iban=...&amount=...
    this.amount = this.$route.query.amount;
    this.iban = this.$route.query.iban;
  },
  methods: {
    choose(n) {
      this.bills = n;
    },
    async finish() {
      if (!this.bills) {
        alert("Please choose bills.");
        return;
      }
      const payload = {
        fromIban: this.iban,
        toIban:   null,
        amount:   parseFloat(this.amount),
        bills:    this.bills
      };
      try {
        // *** Обратите внимание: POST на  /api/transactions/withdraw  ***
        await axios.post(
          `${API_ENDPOINTS.transactions}/withdraw`,
          payload
        );
        alert("Withdraw successful");
        // После успешного снятия — редирект на страницу транзакций
        this.$router.push("/customerTransactions");
      } catch (err) {
        console.error("Withdraw failed:", err.response || err);
        const msg = err.response?.data || "Error during withdrawal";
        alert(msg);
      }
    }
  }
};
</script>

<style scoped>
/* ваши стили, если нужны */
</style>
