  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { API_ENDPOINTS } from '@/config';
  import UsersTable from '@/components/EmployeeUsersTable.vue';

  const users = ref([]);
  const loading = ref(true);

  const fetchUsers = () => {
    loading.value = true;
    axios.get(API_ENDPOINTS.usersByStatus('PENDING'), { withCredentials: true })
      .then(res => users.value = res.data)
      .finally(() => loading.value = false);
  };

  const approve = (userId) => {
    axios.patch(API_ENDPOINTS.approveUser(userId), null, { withCredentials: true })
      .then(fetchUsers);
  };

  const reject = (userId) => {
    axios.patch(API_ENDPOINTS.rejectUser(userId), null, { withCredentials: true })
      .then(fetchUsers);
  };

  onMounted(fetchUsers);
</script>

  <template>
    <div class="container py-5">
      <h2 class="text-success fw-bold text-center mb-4">Pending Users</h2>

      <div v-if="loading" class="text-muted">Loading…</div>
      <div v-else>
        <UsersTable :users="users" :showActions="true" @approve="approve" @reject="reject" />
        <p v-if="users.length === 0" class="alert alert-secondary mt-3">
          Nothing to approve.
        </p>
      </div>
    </div>
  </template>
