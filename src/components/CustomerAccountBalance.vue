<script setup>
defineProps({
    accounts: Array
});
</script>

<template>
    <div>
        <h5 class="fw-bold mb-3">Account Balances</h5>
        <div v-if="accounts.length > 0" class="list-group">
            <div v-for="account in accounts" :key="account.iban"
                class="list-group-item d-flex justify-content-between align-items-center">
                <div>
                    <strong>{{ account.iban }}</strong><br />
                    <small class="text-muted">{{ account.type }}</small>
                </div>
                <span class="badge bg-success fs-6">€{{ account.balance.toFixed(2) }}</span>
            </div>
        </div>
        <p v-else class="text-muted">No accounts found.</p>
    </div>
</template>
