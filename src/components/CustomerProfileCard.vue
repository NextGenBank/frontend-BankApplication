<script setup>
defineProps({
    name: String,
    email: String,
    phone: String,
    bsn: String,
    profilePicture: String
})
</script>

<template>
    <div class="text-center">
        <div class="position-relative d-inline-block mb-3">
            <img :src="profilePicture" class="rounded-circle" style="width: 100px; height: 100px; object-fit: cover;" />
            <button class="btn btn-sm btn-light position-absolute bottom-0 end-0 rounded-circle">
                ✏️
            </button>
        </div>
        <h4 class="fw-bold">{{ name }}</h4>

        <div class="text-start mt-4">
            <p class="mb-1"><small class="text-muted">Email</small><br><strong>{{ email }}</strong></p>
            <p class="mb-1"><small class="text-muted">Phone Number</small><br><strong>{{ phone }}</strong></p>
            <p class="mb-3"><small class="text-muted">BSN</small><br><strong>{{ bsn }}</strong></p>
        </div>

        <button class="btn btn-success w-100">Reset Password</button>
    </div>
</template>