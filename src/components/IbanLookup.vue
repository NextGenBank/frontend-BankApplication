<script>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

export default {
  name: "IbanLookup",
  setup() {
    const searchQuery = ref("");
    const users = ref([]);
    const error = ref("");

    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(API_ENDPOINTS.lookupAllIbans, {
          headers: { Authorization: `Bearer ${token}` },
        });
        users.value = response.data;
      } catch (err) {
        error.value = "Failed to load IBAN users.";
      }
    };

    onMounted(fetchUsers);

    const filteredUsers = computed(() => {
      const query = searchQuery.value.toLowerCase();
      return users.value.filter(user =>
        user.firstName.toLowerCase().includes(query) ||
        user.lastName.toLowerCase().includes(query)
      );
    });

    return { searchQuery, filteredUsers, error };
  },
};
</script>

<template>
  <div class="container py-5">
    <h2 class="fw-bold mb-4">IBAN Lookup</h2>

    <div class="mb-4" style="max-width: 400px;">
      <input
        type="text"
        class="form-control"
        v-model="searchQuery"
        placeholder="Search by name..."
      />
    </div>

    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <div v-if="filteredUsers.length">
      <ul class="list-group">
        <li
          v-for="user in filteredUsers"
          :key="user.firstName + user.lastName"
          class="list-group-item"
        >
          <strong>{{ user.firstName }} {{ user.lastName }}</strong>
          <ul class="mb-0">
            <li v-for="iban in user.ibans" :key="iban">{{ iban }}</li>
          </ul>
        </li>
      </ul>
    </div>

    <div v-else class="text-muted">No matching users found.</div>
  </div>
</template>
