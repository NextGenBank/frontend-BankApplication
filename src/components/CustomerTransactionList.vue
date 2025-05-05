<script setup>
import TransactionItem from './CustomerTransactionItem.vue'

defineProps({
    transactions: Array
})
</script>

<template>
    <div class="mt-4">
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h5 class="fw-bold mb-0">Transactions</h5>
            <i class="bi bi-arrow-right text-success"></i>
        </div>
        <div>
            <TransactionItem v-for="(transaction, index) in transactions" :key="index" :name="transaction.name"
                :date="transaction.date" :amount="transaction.amount" />
        </div>
    </div>
</template>