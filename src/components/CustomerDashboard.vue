<script>
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  name: "CustomerDashboard",
  data() {
    return {
      customer: null,
      accounts: [],
      balanceInfo: {
        currentBalance: 0,
        income: 0,
        expense: 0,
      },
      selectedDateRange: "Apr 22 – May 21, 2024",
      selectedPeriod: "This Month",
    };
  },
  async created() {
    try {
      const userRes = await axios.get(API_ENDPOINTS.currentUser);
      const user = userRes.data;

      this.customer = {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phoneNumber,
        bsn: user.bsn,
      };

      const accountsRes = await axios.get(API_ENDPOINTS.myAccounts);
      this.accounts = accountsRes.data.map(acc => ({
        type: acc.accountType,
        balance: acc.balance,
        iban: acc.iban,
      }));

      const totalBalance = this.accounts.reduce((sum, acc) => sum + parseFloat(acc.balance), 0);
      this.balanceInfo.currentBalance = totalBalance;
      this.balanceInfo.income = totalBalance * 1.2; // placeholder logic
      this.balanceInfo.expense = totalBalance * 0.2;
    } catch (error) {
      console.error("Failed to load customer data:", error);
      alert("Error loading dashboard. Please log in again.");
    }
  },
};
</script>

<template>
  <div class="container py-5" v-if="customer">
    <!-- Customer Info -->
    <div class="mb-4">
      <h4 class="text-success fw-bold">{{ customer.firstName }} {{ customer.lastName }}</h4>
      <p class="text-muted mb-1">Email: {{ customer.email }}</p>
      <p class="text-muted mb-1">Phone: {{ customer.phone }}</p>
      <p class="text-muted">BSN: {{ customer.bsn }}</p>
    </div>

    <!-- Date Range -->
    <div class="d-flex justify-content-end mb-4">
      <button class="btn btn-outline-secondary btn-sm">{{ selectedDateRange }}</button>
    </div>

    <!-- Account Summary -->
    <section class="mb-5">
      <h4 class="fw-bold mb-3">Current Account Balance</h4>
      <div class="card shadow-sm p-4" style="background-color: #e6f4f1; border-radius: 20px;">
        <div class="row text-center">
          <div class="col">
            <h6 class="text-muted">Combined Balance</h6>
            <h3 class="fw-bold">${{ balanceInfo.currentBalance.toFixed(2) }}</h3>
          </div>
          <div class="col">
            <h6 class="text-muted">Income</h6>
            <h3 class="fw-bold text-success">${{ balanceInfo.income.toFixed(2) }}</h3>
          </div>
          <div class="col">
            <h6 class="text-muted">Expense</h6>
            <h3 class="fw-bold text-danger">${{ balanceInfo.expense.toFixed(2) }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Accounts Display (Side-by-Side) -->
    <section class="mb-5">
      <h4 class="fw-bold mb-3">Accounts</h4>
      <div class="row g-4">
        <div
          v-for="account in accounts"
          :key="account.iban"
          class="col-md-6"
        >
          <div class="card p-4 shadow-sm text-center" style="background-color: #f0faf9; border-radius: 20px;">
            <h5 class="text-primary">{{ account.type }}</h5>
            <h3 class="fw-bold mt-2">${{ account.balance.toFixed(2) }}</h3>
            <p class="text-muted mt-2">IBAN: {{ account.iban }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="fw-bold">Spending Statistics</h4>
        <button class="btn btn-outline-secondary btn-sm">{{ selectedPeriod }}</button>
      </div>

      <div class="mb-4">
        <div class="d-flex justify-content-between mb-1">
          <span>Income</span>
          <span class="fw-bold">${{ balanceInfo.income.toFixed(2) }}</span>
        </div>
        <div class="progress" style="height: 10px;">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            :style="{ width: (balanceInfo.income / (balanceInfo.income + balanceInfo.expense)) * 100 + '%' }"
          ></div>
        </div>
      </div>

      <div>
        <div class="d-flex justify-content-between mb-1">
          <span>Expense</span>
          <span class="fw-bold">${{ balanceInfo.expense.toFixed(2) }}</span>
        </div>
        <div class="progress" style="height: 10px;">
          <div
            class="progress-bar bg-danger"
            role="progressbar"
            :style="{ width: (balanceInfo.expense / (balanceInfo.income + balanceInfo.expense)) * 100 + '%' }"
          ></div>
        </div>
      </div>
    </section>
  </div>

  <div v-else class="text-center py-5">
    <div class="spinner-border text-secondary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
h4, h5 {
  font-weight: bold;
}
</style>
