<script>
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

export default {
  name: "CustomerTransactions",
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    return { router, userStore };
  },
  data() {
    return {
      searchQuery: "",
      selectedType: "ALL",
      transactions: [],
      filters: {
        startDate: "",
        endDate: "",
        amount: "",
        amountFilter: "EQUAL",
        iban: ""
      },
      loading: false,
      debounceTimer: null
    };
  },
  computed: {
    filteredTransactions() {
      return this.transactions;
    },
    hasActiveFilters() {
      return (
        this.filters.startDate ||
        this.filters.endDate ||
        this.filters.amount ||
        this.filters.iban ||
        this.selectedType !== "ALL"
      );
    }
  },
  watch: {
    searchQuery() {
      this.debouncedFetchTransactions();
    },
    selectedType() {
      this.debouncedFetchTransactions();
    },
    filters: {
      handler() {
        this.debouncedFetchTransactions();
      },
      deep: true
    }
  },
  async created() {
    if (this.userStore.user?.status === "PENDING") {
      this.router.replace("/");
      return;
    }
    await this.fetchTransactions();
  },
  methods: {
    debouncedFetchTransactions() {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.fetchTransactions();
      }, 300);
    },
    resetFilters() {
      this.filters = {
        startDate: "",
        endDate: "",
        amount: "",
        amountFilter: "EQUAL",
        iban: ""
      };
      this.selectedType = "ALL";
      this.searchQuery = "";
    },
    async fetchTransactions() {
      this.loading = true;
      try {
        const token = localStorage.getItem("token");
        const params = {
          iban: this.filters.iban || undefined,
          name: this.searchQuery || undefined,
          type: this.selectedType !== "ALL" ? this.selectedType : undefined,
          accountNumber: this.filters.iban || undefined,
          startDate: this.filters.startDate || undefined,
          endDate: this.filters.endDate || undefined,
          amount: this.filters.amount ? parseFloat(this.filters.amount) : undefined,
          amountFilter: this.filters.amount ? this.filters.amountFilter : undefined
        };

        // Clean undefined params
        Object.keys(params).forEach(key => params[key] === undefined && delete params[key]);

        const response = await axios.get("http://localhost:8080/api/transactions", {
          headers: { Authorization: `Bearer ${token}` },
          params
        });

        this.transactions = response.data.map(tx => ({
          id: tx.transactionId,
          type: tx.transactionType,
          date: new Date(tx.timestamp).toLocaleString(),
          amount: parseFloat(tx.amount),
          fromIban: tx.fromIban,
          fromName: tx.fromName,
          toIban: tx.toIban,
          toName: tx.toName,
          direction: tx.direction
        }));
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<template>
  <div class="container py-5">
    <!-- Header with filters -->
    <div class="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
      <h2 class="fw-bold mb-0">Transactions</h2>
      <div class="d-flex gap-3">
        <!-- Name Filter -->
        <div class="input-group" style="max-width: 300px;">
          <input
            type="text"
            class="form-control"
            placeholder="Search by name..."
            v-model="searchQuery"
          />
          <span class="input-group-text"><i class="bi bi-search"></i></span>
        </div>
        <!-- Transaction Type Filter -->
        <select class="form-select" v-model="selectedType">
          <option value="ALL">All Types</option>
          <option value="INCOMING">Incoming</option>
          <option value="OUTGOING">Outgoing</option>
          <option value="INTERNAL">Internal</option>
        </select>
      </div>
    </div>

    <!-- Advanced Filters -->
    <div class="card mb-4">
      <div class="card-header d-flex justify-content-between align-items-center">
        <h5 class="mb-0">Advanced Filters</h5>
        <button 
          class="btn btn-sm btn-outline-secondary" 
          @click="resetFilters"
          :disabled="!hasActiveFilters"
        >
          Reset Filters
        </button>
      </div>
      <div class="card-body">
        <div class="row g-3">
          <!-- Date Range -->
          <div class="col-md-6">
            <div class="row g-2">
              <div class="col">
                <label class="form-label">Start Date</label>
                <input 
                  type="date" 
                  class="form-control" 
                  v-model="filters.startDate"
                />
              </div>
              <div class="col">
                <label class="form-label">End Date</label>
                <input 
                  type="date" 
                  class="form-control" 
                  v-model="filters.endDate"
                />
              </div>
            </div>
          </div>
          
          <!-- Amount Filter -->
          <div class="col-md-6">
            <div class="row g-2">
              <div class="col-5">
                <label class="form-label">Amount</label>
                <input 
                  type="number" 
                  class="form-control" 
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  v-model="filters.amount"
                />
              </div>
              <div class="col-7">
                <label class="form-label">Filter Type</label>
                <select class="form-select" v-model="filters.amountFilter">
                  <option value="EQUAL">Equal to</option>
                  <option value="LESS">Less than</option>
                  <option value="GREATER">Greater than</option>
                </select>
              </div>
            </div>
          </div>
          
          <!-- IBAN Filter -->
          <div class="col-md-12">
            <label class="form-label">IBAN Filter</label>
            <input 
              type="text" 
              class="form-control" 
              placeholder="Enter IBAN to filter transactions"
              v-model="filters.iban"
            />
            <small class="text-muted">Will show transactions where this IBAN is sender or receiver</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Indicator -->
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <p class="mt-2">Loading transactions...</p>
    </div>

    <!-- Table -->
    <div class="table-responsive" v-else>
      <table class="table table-hover align-middle">
        <thead class="table-light">
          <tr>
            <th>Sender Name</th>
            <th>Sender IBAN</th>
            <th>Receiver Name</th>
            <th>Receiver IBAN</th>
            <th>Type</th>
            <th>Direction</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tx in filteredTransactions" :key="tx.id">
            <td>{{ tx.fromName }}</td>
            <td>{{ tx.fromIban }}</td>
            <td>{{ tx.toName }}</td>
            <td>{{ tx.toIban }}</td>
            <td>{{ tx.type }}</td>
            <td>
              <span :class="{
                'text-success': tx.direction === 'INCOMING',
                'text-danger': tx.direction === 'OUTGOING',
                'text-secondary': tx.direction === 'INTERNAL'
              }">
                {{ tx.direction }}
              </span>
            </td>
            <td>{{ tx.date }}</td>
            <td :class="{
              'text-success': tx.direction === 'INCOMING',
              'text-danger': tx.direction === 'OUTGOING',
              'text-secondary': tx.direction === 'INTERNAL'
            }">
              {{
                tx.direction === 'INCOMING' ? '+' :
                tx.direction === 'OUTGOING' ? '-' : ''
              }}€{{ Math.abs(tx.amount).toLocaleString() }}
            </td>
          </tr>
          <tr v-if="filteredTransactions.length === 0">
            <td colspan="8" class="text-center text-muted py-3">No transactions found.</td>
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
.card-header {
  background-color: #f8f9fa;
}
</style>