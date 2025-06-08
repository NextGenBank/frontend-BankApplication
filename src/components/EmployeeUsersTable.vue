<script setup>
defineProps({
  users: Array,
  showActions: Boolean
});
</script>

<template>
  <div class="table-responsive">
    <table class="table table-hover align-middle">
      <thead class="table-light">
        <tr>
          <th>First name</th>
          <th>Last name</th>
          <th>BSN</th>
          <th>Email</th>
          <th v-if="showActions" class="text-center">Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="user in users" :key="user.userId">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.bsn }}</td>
          <td>{{ user.email }}</td>

          <td v-if="showActions" class="d-flex gap-2 justify-content-center">
            <button class="btn btn-success btn-sm" @click="$emit('approve', user.userId)">
              Approve
            </button>
            <button class="btn btn-outline-danger btn-sm" @click="$emit('reject', user.userId)">
              Reject
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
