<script setup>
defineProps({
    name: String,
    email: String,
    phone: String,
    bsn: String
});
</script>

<template>
    <div>
        <h4 class="fw-bold text-center">{{ name }}</h4>

        <div class="text-start mt-4">
            <p class="mb-1"><small class="text-muted">Email</small><br><strong>{{ email }}</strong></p>
            <p class="mb-1"><small class="text-muted">Phone Number</small><br><strong>{{ phone }}</strong></p>
            <p class="mb-3"><small class="text-muted">BSN</small><br><strong>{{ bsn }}</strong></p>
        </div>

        <button class="btn btn-success w-100">Reset Password</button>
    </div>
</template>
