<script setup>
import { ref } from 'vue'
import Sidebar from '@/components/EmployeeSidebar.vue'

const pendingAccounts = ref([
    { id: 1, firstName: 'Someone', lastName: 'Somename', bsn: '99999999', email: 'someone@something.com', requestDate: '20-02-2024' },
    { id: 2, firstName: 'Someone', lastName: 'Somename', bsn: '99999999', email: 'someone@something.com', requestDate: '20-02-2024' },
    { id: 3, firstName: 'Someone', lastName: 'Somename', bsn: '99999999', email: 'someone@something.com', requestDate: '20-02-2024' },
])

function approveAccount(id) {
    console.log('Approving account', id)
    // Move to approved list, remove from pending list
    pendingAccounts.value = pendingAccounts.value.filter(acc => acc.id !== id)
}

function disapproveAccount(id) {
    console.log('Disapproving account', id)
    pendingAccounts.value = pendingAccounts.value.filter(acc => acc.id !== id)
}
</script>

<template>
    <div class="flex min-h-screen font-sans">
        <Sidebar />
        <div class="container py-5">
            <h2 class="mb-4 text-success fw-bold text-center">Pending Account Approvals</h2>

            <div class="table-responsive">
                <table class="table table-hover align-middle">
                    <thead class="table-light">
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>BSN</th>
                            <th>Email</th>
                            <th>Request date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="account in pendingAccounts" :key="account.id">
                            <td>{{ account.firstName }}</td>
                            <td>{{ account.lastName }}</td>
                            <td>{{ account.bsn }}</td>
                            <td>{{ account.email }}</td>
                            <td>{{ account.requestDate }}</td>
                            <td class="d-flex gap-2">
                                <button @click="approveAccount(account.id)"
                                    class="btn btn-success btn-sm">Approve</button>
                                <button @click="disapproveAccount(account.id)"
                                    class="btn btn-outline-danger btn-sm">Disapprove</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
