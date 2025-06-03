<!-- src/components/ATM/Withdraw.vue -->
<template>
  <div class="d-flex vh-100 justify-content-center align-items-center">
    <div class="card p-4" style="width: 360px;">
      <h2 class="text-success mb-4">Withdraw</h2>

      <div v-if="loadingAccounts" class="text-center">
        <div class="spinner-border text-secondary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>

      <div v-else>
        <div class="mb-3">
          <label>Account</label>
          <select v-model="selectedIban" class="form-select">
            <option disabled value="">Select account</option>
            <option v-for="acc in accounts" :key="acc.iban" :value="acc.iban">
              {{ acc.type }} — {{ acc.iban }}
            </option>
          </select>
        </div>
        <div class="mb-3">
          <label>Amount</label>
          <input
            v-model.number="amount"
            type="number"
            class="form-control"
            placeholder="0.00"
          />
        </div>
        <button
          @click="toBills"
          :disabled="!selectedIban || !amount"
          class="btn btn-success w-100"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  name: "ATM_Withdraw",
  data() {
    return {
      accounts: [],
      loadingAccounts: true,
      selectedIban: "",
      amount: null,
    };
  },
  async created() {
    try {
      const accountsRes = await axios.get(API_ENDPOINTS.myAccounts);
      this.accounts = accountsRes.data.map(acc => ({
        type: acc.accountType,
        balance: acc.balance,
        iban: acc.iban,
      }));
    } catch (err) {
      console.error("Не удалось загрузить аккаунты:", err);
      alert("Ошибка загрузки аккаунтов. Попробуйте позже.");
    } finally {
      this.loadingAccounts = false;
    }
  },
  methods: {
    toBills() {
      
      this.$router.push({
        path: "/atmwithdraw-bills",
        query: {
          iban: this.selectedIban,
          amount: this.amount,
        },
      });
    },
  },
};
</script>
