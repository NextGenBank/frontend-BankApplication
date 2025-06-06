<!-- src/components/ATM/Deposit.vue -->
<template>
  <div class="card p-4" style="width: 360px; margin: 0 auto; margin-top: 50px;">
    <h2 class="text-success mb-4">Deposit</h2>
    <div class="mb-3">
      <label>Account</label>
      <select v-model="account" class="form-select">
        <option disabled value="">Select account</option>
        <option v-for="acc in accounts" :key="acc.iban" :value="acc.iban">
          {{ acc.accountType }} – {{ acc.iban }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label>Amount</label>
      <input v-model.number="amount" type="number" class="form-control" placeholder="0.00" />
    </div>
    <button @click="submitDeposit" class="btn btn-success w-100">Deposit</button>
  </div>
</template>

<script>
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  data() {
    return {
      accounts: [],   
      account: "",
      amount: null,
    };
  },
  async created() {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_ENDPOINTS.myAccounts, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Предположим, что API возвращает массив вида [{ accountType: "...", balance: "...", iban: "..." }, ...]
      this.accounts = response.data;
    } catch (error) {
      console.error("Не удалось загрузить счета:", error);
      alert("Error loading accounts. Please try again.");
    }
  },
  methods: {
    async submitDeposit() {
      if (!this.account || !this.amount) {
        return alert("Please select account and enter amount");
      }
      try {
        const token = localStorage.getItem("token");
        const payload = {
          toIban: this.account,
          amount: this.amount
        };
        await axios.post(API_ENDPOINTS.deposit, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Deposit successful");
        this.$router.push("/atmdashboard");
      } catch (error) {
        console.error("Error on deposit:", error.response?.data || error);
        alert(error.response?.data || "Deposit failed");
      }
    }
  }
};
</script>
