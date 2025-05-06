<script>
export default {
  name: "CustomerDashboard",
  data() {
    return {
      customer: {
        firstName: "John",
        lastName: "Doe",
        accountNumber: "1234567890",
      },
      balanceInfo: {
        currentBalance: 44500.0,
        income: 54500.0,
        expense: 10000.0,
      },
      accounts: [
        { type: "Checking", balance: 44500.0 },
        { type: "Savings", balance: 44500.0 },
      ],
      selectedDateRange: "Apr 22 – May 21, 2024",
      selectedPeriod: "This Month",
    };
  },
};
</script>

<template>
  <div class="container py-5">
    <!-- Top Info -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <div class="text-start">
        <h5 class="text-success fw-bold">{{ customer.firstName }} {{ customer.lastName }}</h5>
        <h2 class="fw-bold">{{ customer.accountNumber }}</h2>
      </div>
      <div>
        <button class="btn btn-outline-secondary btn-sm">
          {{ selectedDateRange }}
        </button>
      </div>
    </div>

    <!-- Current Account Balance -->
    <section class="mb-5">
      <h4 class="fw-bold mb-3">Current Account Balance</h4>
      <div class="card shadow-sm p-4" style="background-color: #e6f4f1; border-radius: 20px;">
        <div class="row text-center">
          <div class="col">
            <h6 class="text-muted">Current Balance</h6>
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

    <!-- Accounts -->
    <section class="mb-5">
      <h4 class="fw-bold mb-3">Accounts</h4>
      <div class="row g-4">
        <div v-for="account in accounts" :key="account.type" class="col-md-6">
          <div class="card p-4 shadow-sm text-center" style="background-color: #f0faf9; border-radius: 20px;">
            <h5 class="text-primary">{{ account.type }}</h5>
            <h3 class="fw-bold mt-2">${{ account.balance.toFixed(2) }}</h3>
          </div>
        </div>
      </div>
    </section>

    <!-- Statistics -->
    <section>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h4 class="fw-bold">Statistics</h4>
        <button class="btn btn-outline-secondary btn-sm">
          {{ selectedPeriod }}
        </button>
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
</template>

<style scoped>
h4, h5 {
  font-weight: bold;
}
</style>
