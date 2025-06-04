<!-- src/components/ATM/Withdraw.vue -->
<template>
  <div class="d-flex vh-100 justify-content-center align-items-center">
    <div class="card p-4" style="width: 360px;">
      <h2 class="text-success mb-4">Withdraw</h2>
      <div class="mb-3">
        <label>Account</label>
        <select v-model="selectedIban" class="form-select">
          <option disabled value="">Select account</option>
          <option
            v-for="acc in accounts"
            :key="acc.iban"
            :value="acc.iban"
          >
            {{ acc.accountType }} — {{ acc.iban }}
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
      <button @click="toBills" class="btn btn-success w-100">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  name: "Withdraw",
  data() {
    return {
      accounts: [],        // список счетов
      selectedIban: "",    // IBAN, с которого будем снимать
      amount: null         // сумма для снятия
    };
  },
  async created() {
    try {
      // Загрузим список аккаунтов, чтобы пользователь мог выбрать нужный IBAN
      const res = await axios.get(`${API_ENDPOINTS.myAccounts}`);
      this.accounts = res.data.map(acc => ({
        iban: acc.iban,
        accountType: acc.accountType
      }));
    } catch (err) {
      console.error("Failed to load accounts:", err);
      alert("Unable to load your accounts. Please try again.");
    }
  },
  methods: {
    toBills() {
      if (!this.selectedIban || !this.amount || this.amount <= 0) {
        alert("Please select an account and enter a positive amount.");
        return;
      }
     
      this.$router.push({
        path: "/atmwithdraw-bills",
        query: {
          iban: this.selectedIban,
          amount: this.amount
        }
      });
    }
  }
};
</script>
