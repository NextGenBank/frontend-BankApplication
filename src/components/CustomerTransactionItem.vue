<script setup>
defineProps({
    name: String,
    date: String,
    amount: Number
})

const amountClass = computed(() =>
    amount >= 0 ? 'text-success fw-bold' : 'text-danger fw-bold'
)

const formattedAmount = computed(() =>
    `${amount >= 0 ? '+' : ''}${amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}`
)
</script>

<template>
    <div class="d-flex justify-content-between align-items-center py-2 border-bottom">
        <div>{{ name }}</div>
        <div>{{ date }}</div>
        <div :class="amountClass">{{ formattedAmount }}</div>
    </div>
</template>