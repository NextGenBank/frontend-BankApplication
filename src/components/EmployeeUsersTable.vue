<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  users: Array,
  showActions: Boolean
})

// Pagination state
const currentPage = ref(1)
const itemsPerPage = 2

// Watch for changes in users and reset page to 1
watch(() => props.users, () => {
  currentPage.value = 1
})

// Calculate the amount of pages based on the amount of users, 
// Example: if there are 13 users and 5 per page, we'll get Math.ceil(13 / 5) = 3 pages
const pageCount = computed(() => {
  return Math.ceil(props.users.length / itemsPerPage)
})

// Paginated users for current page
// Calculate which users to display based on the index and only show users from that page
// Example: on page 2 with 5 per page, we slice from index 5 to 10
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return props.users.slice(start, start + itemsPerPage)
})

// Navigation
function nextPage() {
  if (currentPage.value < pageCount.value) currentPage.value++
}

function prevPage() {
  if (currentPage.value > 1) currentPage.value--
}
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
        <tr v-for="user in paginatedUsers" :key="user.userId">
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
          <td>{{ user.bsn }}</td>
          <td>{{ user.email }}</td>

          <td v-if="showActions" class="d-flex gap-2 justify-content-center">
            <button class="btn btn-success btn-sm" @click="$emit('approve', user.userId)">Approve</button>
            <button class="btn btn-outline-danger btn-sm" @click="$emit('reject', user.userId)">Reject</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination controls -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <button class="btn btn-secondary btn-sm" :disabled="currentPage === 1" @click="prevPage">Previous</button>
      <span>Page {{ currentPage }} of {{ pageCount }}</span>
      <button class="btn btn-secondary btn-sm" :disabled="currentPage === pageCount" @click="nextPage">Next</button>
    </div>
  </div>
</template>