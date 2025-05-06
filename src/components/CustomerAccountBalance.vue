<script setup>
defineProps({
    balance: Number
})
</script>

<template>
    <div class="bg-success bg-opacity-10 rounded p-4 mb-4 text-center">
        <p class="text-muted mb-1">Main Account</p>
        <h3 class="fw-bold">${{ balance.toLocaleString() }}</h3>
    </div>
</template>