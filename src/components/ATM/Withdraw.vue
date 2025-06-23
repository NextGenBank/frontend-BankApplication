<template>
  <div class="card p-4" style="width: 360px; margin: 0 auto; margin-top: 50px;">
    <h2 class="text-success mb-4">Withdraw</h2>
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
    <button @click="toBills" class="btn btn-success w-100">Withdraw</button>
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
      this.accounts = response.data;
    } catch (error) {
      console.error("Couldn't load the balance:", error);
      alert("Error loading accounts. Please try again.");
    }
  },
  methods: {
    toBills() {
      if (!this.account || !this.amount) {
        return alert("Please select account and enter amount");
      }
      this.$router.push({
        path: '/atmwithdraw-bills',
        query: {
          amount: this.amount,
          account: this.account
        }
      });
    }
  }
};
</script>
