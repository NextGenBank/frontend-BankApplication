<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { API_ENDPOINTS } from '@/config';
import UsersTable from '@/components/EmployeeUsersTable.vue';

const users = ref([]);
const loading = ref(true);

const fetchUsers = () => {
  loading.value = true;
  axios
    .get(API_ENDPOINTS.usersByStatus('REJECTED'), { withCredentials: true })
    .then(res => users.value = res.data)
    .finally(() => loading.value = false);
};

onMounted(fetchUsers);
</script>

<template>
  <div class="container py-5">
    <h2 class="text-danger fw-bold text-center mb-4">Rejected Users</h2>

    <div v-if="loading" class="text-muted">Loading…</div>
    <div v-else>
      <UsersTable :users="users" :showActions="false" />
      <p v-if="users.length === 0" class="alert alert-secondary mt-3">
        No rejected users found.
      </p>
    </div>
  </div>
</template>
