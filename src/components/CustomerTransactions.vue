<script>
import axios from "axios";

export default {
  name: "Transactions",
  data() {
    return {
      searchQuery: "",
      transactions: [
        { id: 1, firstName: "John", lastName: "Doe", iban: "NL91ABNA0417164300", type: "Bank Transfer", date: "13.03.2024 - 09:39", amount: -10000, status: "Pending" },
        { id: 2, firstName: "Jane", lastName: "Smith", iban: "NL32RABO0195610843", type: "Direct Pay", date: "14.03.2024 - 10:00", amount: 10000, status: "Completed" },
        { id: 3, firstName: "Emily", lastName: "Brown", iban: "NL89INGB0002445588", type: "Bank Transfer", date: "15.03.2024 - 11:15", amount: -10000, status: "Canceled" },
        { id: 4, firstName: "Mike", lastName: "Johnson", iban: "NL23SNSB0917829871", type: "Credit Card", date: "16.03.2024 - 12:00", amount: 10000, status: "Completed" },
        { id: 5, firstName: "Laura", lastName: "Wilson", iban: "NL55BUNQ2045887991", type: "Bank Transfer", date: "17.03.2024 - 13:30", amount: -10000, status: "Pending" },
      ],
      // IBAN Lookup
      searchFirstName: "",
      searchLastName: "",
      ibanSearchResult: null,
      ibanSearchError: null,
    };
  },
  computed: {
    filteredTransactions() {
      if (!this.searchQuery.trim()) {
        return this.transactions;
      }
      return this.transactions.filter(t =>
        `${t.firstName} ${t.lastName}`.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
      );
    },
  },
  methods: {
    async searchIBAN() {
      this.ibanSearchResult = null;
      this.ibanSearchError = null;

      if (!this.searchFirstName || !this.searchLastName) {
        this.ibanSearchError = "Please enter both first and last name.";
        return;
      }

      try {
        const response = await axios.get("http://localhost:8080/api/accounts/lookup", {
          params: {
            firstName: this.searchFirstName,
            lastName: this.searchLastName,
          },
        });
        this.ibanSearchResult = response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.ibanSearchError = "No user found with that name.";
        } else {
          this.ibanSearchError = "Error fetching IBAN.";
        }
      }
    },
  },
};
</script>

<template>
  <div class="container py-5">
    <!-- Title + Search Bar -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2 class="fw-bold">Transactions</h2>
      <div class="input-group" style="max-width: 300px;">
        <input
          type="text"
          class="form-control"
          placeholder="Search by name..."
          v-model="searchQuery"
        />
        <span class="input-group-text">
          <i class="bi bi-search"></i>
        </span>
      </div>
    </div>

    <!-- IBAN Lookup -->
    <div class="mb-5">
      <h4 class="fw-bold">Lookup Customer IBAN</h4>
      <div class="row g-2 mb-3">
        <div class="col-md-4">
          <input type="text" class="form-control" placeholder="First name" v-model="searchFirstName" />
        </div>
        <div class="col-md-4">
          <input type="text" class="form-control" placeholder="Last name" v-model="searchLastName" />
        </div>
        <div class="col-md-4">
          <button class="btn btn-primary w-100" @click="searchIBAN">Search</button>
        </div>
      </div>
      <div v-if="ibanSearchError" class="alert alert-danger">{{ ibanSearchError }}</div>
      <div v-if="ibanSearchResult" class="alert alert-success">
        <strong>{{ ibanSearchResult.firstName }} {{ ibanSearchResult.lastName }}</strong>'s IBAN(s):
        <ul>
          <li v-for="iban in ibanSearchResult.ibans" :key="iban">{{ iban }}</li>
        </ul>
      </div>
    </div>

    <!-- Transactions Table -->
    <div class="table-responsive">
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>Name</th>
            <th>IBAN</th>
            <th>Transaction Type</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in filteredTransactions" :key="transaction.id">
            <td>{{ transaction.firstName }} {{ transaction.lastName }}</td>
            <td>{{ transaction.iban }}</td>
            <td>{{ transaction.type }}</td>
            <td>{{ transaction.date }}</td>
            <td :class="transaction.amount > 0 ? 'text-success' : 'text-danger'">
              {{ transaction.amount > 0 ? '+' : '-' }}${{ Math.abs(transaction.amount).toLocaleString() }}
            </td>
            <td>
              <span
                class="badge"
                :class="{
                  'bg-success': transaction.status === 'Completed',
                  'bg-danger': transaction.status === 'Canceled',
                  'bg-secondary': transaction.status === 'Pending',
                }"
              >
                {{ transaction.status }}
              </span>
            </td>
          </tr>
          <tr v-if="filteredTransactions.length === 0">
            <td colspan="6" class="text-center py-4 text-muted">
              No transactions found for that name.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
h2 {
  font-weight: bold;
}
</style>
