<script setup>
import { ref, onMounted, watch } from 'vue'
import axios from 'axios'
import EmployeeUsersTable from '@/components/EmployeeUsersTable.vue'
import { API_ENDPOINTS } from '@/config.js'

const props = defineProps({
    status: {
        type: String,
        required: true
    },
    title: {
        type: String,
        default: 'Users'
    },
    showActions: {
        type: Boolean,
        default: false
    }
})

const users = ref([])
const loading = ref(true)
const successMessage = ref('')
const errorMessage = ref('')

const loadUsers = async () => {
    loading.value = true
    successMessage.value = ''
    errorMessage.value = ''
    try {
        const response = await axios.get(API_ENDPOINTS.usersByStatus(props.status))
        users.value = response.data
    } catch (err) {
        errorMessage.value = err.response?.data?.message || `Failed to load ${props.status.toLowerCase()} users.`
    } finally {
        loading.value = false
    }
}

async function approve(userId) {
    successMessage.value = ''
    errorMessage.value = ''
    try {
        await axios.put(API_ENDPOINTS.approveUser(userId))
        successMessage.value = 'User approved successfully.'
        await loadUsers()
    } catch (err) {
        errorMessage.value = err.response?.data?.message || 'Failed to approve user.'
    }
}

async function reject(userId) {
    successMessage.value = ''
    errorMessage.value = ''
    try {
        await axios.put(API_ENDPOINTS.rejectUser(userId))
        successMessage.value = 'User rejected successfully.'
        await loadUsers()
    } catch (err) {
        errorMessage.value = err.response?.data?.message || 'Failed to reject user.'
    }
}

onMounted(loadUsers)
watch(() => props.status, loadUsers)
</script>


<template>
    <div class="container py-5">
        <h2 class="fw-bold text-center mb-4" :class="{
            'text-success': status === 'APPROVED',
            'text-danger': status === 'REJECTED',
            'text-warning': status === 'PENDING'
        }">
            {{ title }}
        </h2>

        <div v-if="loading" class="text-muted">Loading…</div>
        <div v-else>
            <EmployeeUsersTable :users="users" :showActions="showActions" @approve="approve" @reject="reject" />
            <p v-if="users.length === 0" class="alert alert-secondary mt-3">
                No {{ status.toLowerCase() }} users found.
            </p>
        </div>

        <div v-if="successMessage" class="alert alert-success mt-4">
            {{ successMessage }}
        </div>
        <div v-if="errorMessage" class="alert alert-danger mt-4">
            {{ errorMessage }}
        </div>
    </div>
</template>
