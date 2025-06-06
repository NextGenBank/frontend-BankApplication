<!-- src/components/ATM/WithdrawBills.vue -->
<template>
  <div class="card p-4" style="width: 360px; margin: 0 auto; margin-top: 50px;">
    <h2 class="text-success mb-4">Select Bills</h2>
    <div class="mb-3">
      <label>Amount to Withdraw</label>
      <input type="number" class="form-control" :value="amount" disabled />
    </div>
    <div class="mb-3">
      <label>Bills</label>
      <select v-model="bills" class="form-select">
        <option disabled value="">Select bills</option>
        <option value="5">5 bills</option>
        <option value="10">10 bills</option>
        <option value="20">20 bills</option>
      </select>
    </div>
    <button @click="confirmWithdraw" class="btn btn-success w-100">Confirm</button>
  </div>
</template>

<script>
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  data() {
    return {
      amount: 0,
      bills: null,
      account: "" 
    };
  },
  created() {
    // Получаем amount и account из query-параметров
    this.amount = this.$route.query.amount || 0;
    this.account = this.$route.query.account || "";
  },
  methods: {
    async confirmWithdraw() {
      if (!this.bills) {
        return alert("Please choose number of bills");
      }
      try {
        const token = localStorage.getItem("token");
        const payload = {
          fromIban: this.account,
          amount: parseFloat(this.amount),
          bills: parseInt(this.bills)
        };
        await axios.post(API_ENDPOINTS.withdraw, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert("Withdraw successful");
        this.$router.push("/atmdashboard");
      } catch (error) {
        console.error("Error on withdraw:", error.response?.data || error);
        alert(error.response?.data || "Withdraw failed");
      }
    }
  }
};
</script>
