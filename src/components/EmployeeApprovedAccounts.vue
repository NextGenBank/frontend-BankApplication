<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/EmployeeSidebar.vue'

const approvedAccounts = ref([
    { id: 1, firstName: 'John', lastName: 'Doe', bsn: '12345678', email: 'john@example.com', approvalDate: '21-04-2025' },
    { id: 2, firstName: 'Jane', lastName: 'Smith', bsn: '87654321', email: 'jane@example.com', approvalDate: '22-04-2025' },
])
</script>

<template>
    <div class="flex min-h-screen font-sans">
        <Sidebar />
        <div class="container py-5">
            <h2 class="mb-4 text-success fw-bold text-center">Approved Accounts</h2>

            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>BSN</th>
                            <th>Email</th>
                            <th>Approval date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="account in approvedAccounts" :key="account.id">
                            <td>{{ account.firstName }}</td>
                            <td>{{ account.lastName }}</td>
                            <td>{{ account.bsn }}</td>
                            <td>{{ account.email }}</td>
                            <td>{{ account.approvalDate }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>