<script>
import axios from "axios";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";

export default {
  name: "CustomerTransactions",
  data() {
    return {
      searchQuery: "",
      selectedType: "ALL",
      transactions: [],
    };
  },
  computed: {
    filteredTransactions() {
      const q = this.searchQuery.toLowerCase();
      return this.transactions.filter(tx => {
        const nameMatch =
          tx.fromName.toLowerCase().includes(q) ||
          tx.toName.toLowerCase().includes(q);
        const typeMatch =
          this.selectedType === "ALL" || tx.type === this.selectedType;
        return nameMatch && typeMatch;
      });
    },
  },
  async created() {
    const router = useRouter();
    const userStore = useUserStore();

    // Redirect if user is PENDING
    if (userStore.user?.status === "PENDING") {
      router.replace("/");
      return;
    }

    await this.fetchTransactions();
  },
  methods: {
    async fetchTransactions() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/api/transactions", {
          headers: { Authorization: `Bearer ${token}` }
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
      }
    }
  },
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
          <option value="DEPOSIT">Deposit</option>
          <option value="TRANSFER">Transfer</option>
          <option value="WITHDRAWAL">Withdrawal</option>
        </select>
      </div>
    </div>

    <!-- Table -->
    <div class="table-responsive">
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
              }}${{ Math.abs(tx.amount).toLocaleString() }}
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
</style>
