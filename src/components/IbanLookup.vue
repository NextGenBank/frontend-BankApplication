<script>
import { ref, watch } from "vue";
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  name: "IbanLookup",
  setup() {
    const nameQuery = ref("");
    const ibanQuery = ref("");
    const users = ref([]);
    const error = ref("");
    const loading = ref(false);
    const currentPage = ref(0);
    const totalPages = ref(0);
    const totalItems = ref(0);
    const pageSize = ref(10);
    let debounceTimer = null;

   const fetchUsers = async (page = 0) => {
  if (!nameQuery.value.trim() && !ibanQuery.value.trim()) {
    users.value = [];
    error.value = "";
    return;
  }

  try {
    loading.value = true;
    error.value = "";
    currentPage.value = page;

    const token = localStorage.getItem("token");
    const params = new URLSearchParams({
      page: page,
      size: pageSize.value
    });

    if (nameQuery.value.trim()) params.append('name', nameQuery.value.trim());
    if (ibanQuery.value.trim()) params.append('iban', ibanQuery.value.trim());

    const response = await axios.get(`${API_ENDPOINTS.lookupIBAN}?${params.toString()}`, {
      headers: { 
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    // Handle both paginated and non-paginated responses
    if (response.data.content) {
      users.value = response.data.content;
      totalPages.value = response.data.totalPages;
      totalItems.value = response.data.totalElements;
    } else if (Array.isArray(response.data)) {
      // Fallback for non-paginated responses
      users.value = response.data;
      totalPages.value = 1;
      totalItems.value = response.data.length;
    } else {
      users.value = [];
      error.value = "Unexpected response format";
    }
    
    if (users.value.length === 0) {
      error.value = "No matching users found";
    }
  } catch (err) {
    console.error("Search error:", err);
    users.value = [];
    error.value = err.response?.data?.message || 
                 err.response?.data?.error || 
                 "Failed to load results. Please try again.";
  } finally {
    loading.value = false;
  }
};

    const changePage = (page) => {
      currentPage.value = page;
      fetchUsers(page);
    };

    watch([nameQuery, ibanQuery], () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => fetchUsers(0), 500);
    });

    return { 
      nameQuery, 
      ibanQuery, 
      users, 
      error, 
      loading,
      currentPage,
      totalPages,
      totalItems,
      pageSize,
      fetchUsers,
      changePage
    };
  },
};
</script>

<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4">IBAN Lookup</h2>

    <div class="row g-3 mb-4">
      <div class="col-md-6">
        <label class="form-label">Search by name</label>
        <input
          type="text"
          class="form-control"
          v-model="nameQuery"
          placeholder="Type first, last or full name..."
          @keyup.enter="fetchUsers(0)"
        />
      </div>
      
      <div class="col-md-6">
        <label class="form-label">Search by IBAN</label>
        <input
          type="text"
          class="form-control"
          v-model="ibanQuery"
          placeholder="Type IBAN..."
          @keyup.enter="fetchUsers(0)"
        />
      </div>
    </div>

    <div v-if="loading" class="d-flex justify-content-center my-4">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-if="error" class="alert alert-danger alert-dismissible fade show">
      {{ error }}
      <button type="button" class="btn-close" @click="error = ''"></button>
    </div>

    <div v-if="users.length" class="mt-4">
      <div class="card">
        <div class="card-header bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 class="mb-0">Search Results</h5>
          <span class="badge bg-light text-dark">
            Showing {{ users.length }} of {{ totalItems }} results
          </span>
        </div>
        <ul class="list-group list-group-flush">
          <li
            v-for="user in users"
            :key="user.firstName + user.lastName"
            class="list-group-item"
          >
            <div class="d-flex justify-content-between align-items-center">
              <div>
                <h6 class="mb-1">{{ user.firstName }} {{ user.lastName }}</h6>
                <ul class="list-unstyled mb-0">
                  <li v-for="iban in user.ibans" :key="iban" class="text-muted">
                    <small>{{ iban }}</small>
                  </li>
                </ul>
              </div>
              <span class="badge bg-primary rounded-pill">
                {{ user.ibans.length }} account(s)
              </span>
            </div>
          </li>
        </ul>
        <div class="card-footer">
          <nav aria-label="Page navigation">
            <ul class="pagination pagination-sm justify-content-center mb-0">
              <li class="page-item" :class="{ disabled: currentPage === 0 }">
                <button class="page-link" @click="changePage(currentPage - 1)">Previous</button>
              </li>
              
              <li 
                v-for="page in Math.min(5, totalPages)" 
                :key="page"
                class="page-item"
                :class="{ active: currentPage === page - 1 }"
              >
                <button class="page-link" @click="changePage(page - 1)">
                  {{ page }}
                </button>
              </li>
              
              <li class="page-item" :class="{ disabled: currentPage >= totalPages - 1 }">
                <button class="page-link" @click="changePage(currentPage + 1)">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>

    <div v-else-if="!loading && !error && (nameQuery || ibanQuery)" 
         class="alert alert-info mt-4">
      No matching users found. Try different search terms.
    </div>
  </div>
</template>

<style scoped>
.list-group-item {
  transition: all 0.2s;
}
.list-group-item:hover {
  background-color: #f8f9fa;
}
.page-item.active .page-link {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>