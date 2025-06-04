<!-- src/components/CustomerTransactions.vue -->
<script>
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  name: "CustomerTransactions",
  data() {
    return {
      searchQuery: "",
      transactions: [],
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
        // Здесь у нас нет firstName/lastName в payload от сервера, 
        // но можно фильтровать по type или iban. Оставляю логику «по имени» на будущее:
        `${t.firstName} ${t.lastName}`.toLowerCase().includes(this.searchQuery.trim().toLowerCase())
      );
    }
  },
  mounted() {
    this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_ENDPOINTS.transactions}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Сопоставляем ответ бекенда с нужным нам форматом
        this.transactions = response.data.map(tx => ({
          id: tx.transactionId,
          iban: tx.toIban || tx.fromIban || "Unknown",
          type: tx.transactionType,               // "DEPOSIT", "TRANSFER" или "WITHDRAWAL"
          date: new Date(tx.timestamp).toLocaleString(),
          amount: parseFloat(tx.amount),           // положительное число
          status: "Completed",                     // всегда «Completed» (можно добавить проверку, если у вас есть статус)
          firstName: "", // если понадобятся имена
          lastName: ""   // если понадобятся фамилии
        }));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    },
    async searchIBAN() {
      this.ibanSearchResult = null;
      this.ibanSearchError = null;

      if (!this.searchFirstName || !this.searchLastName) {
        this.ibanSearchError = "Please enter both first and last name.";
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_ENDPOINTS.lookupIBAN}`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params: {
            firstName: this.searchFirstName,
            lastName: this.searchLastName
          }
        });
        this.ibanSearchResult = response.data;
      } catch (error) {
        if (error.response && error.response.status === 404) {
          this.ibanSearchError = "No user found with that name.";
        } else {
          this.ibanSearchError = "Error fetching IBAN.";
        }
      }
    }
  }
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
          <input
            type="text"
            class="form-control"
            placeholder="First name"
            v-model="searchFirstName"
          />
        </div>
        <div class="col-md-4">
          <input
            type="text"
            class="form-control"
            placeholder="Last name"
            v-model="searchLastName"
          />
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
            <th>IBAN</th>
            <th>Transaction Type</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="transaction in filteredTransactions" :key="transaction.id">
            <td>{{ transaction.iban }}</td>
            <td>{{ transaction.type }}</td>
            <td>{{ transaction.date }}</td>
            <!-- Если тип WITHDRAWAL, показываем минус и красный цвет, иначе плюс и зелёный -->
            <td
              :class="transaction.type === 'WITHDRAWAL' ? 'text-danger' : 'text-success'"
            >
              {{ transaction.type === 'WITHDRAWAL' ? '-' : '+' }}${{ transaction.amount.toLocaleString() }}
            </td>
            <td>
              <span class="badge bg-success">{{ transaction.status }}</span>
            </td>
          </tr>
          <tr v-if="filteredTransactions.length === 0">
            <td colspan="5" class="text-center py-4 text-muted">
              No transactions found.
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
