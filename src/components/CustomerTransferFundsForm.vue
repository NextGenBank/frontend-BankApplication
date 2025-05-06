<script setup>
import { reactive } from 'vue'

const form = reactive({
    account: '',
    amount: '',
    iban: '',
    cardHolder: '',
    date: '',
    description: ''
})

const accounts = [
    'Main Account',
    'Savings Account',
    'Investment Account'
]

function submitForm() {
    console.log('Transferring funds:', form)
    alert('Funds transfer submitted ✅')
}

function cancel() {
    // Reset form or navigate back
    Object.keys(form).forEach(key => form[key] = '')
}
</script>

<template>
    <div class="bg-white p-5 rounded-4 shadow-sm mx-auto" style="max-width: 500px;">
        <h2 class="text-success fw-bold text-center mb-5">Transfer funds</h2>

        <form @submit.prevent="submitForm">

            <!-- Account Dropdown -->
            <div class="mb-4">
                <label class="form-label">Account</label>
                <select v-model="form.account" class="form-select">
                    <option disabled value="">Account Name</option>
                    <option v-for="acc in accounts" :key="acc" :value="acc">{{ acc }}</option>
                </select>
            </div>

            <!-- Amount -->
            <div class="mb-4">
                <label class="form-label">Amount</label>
                <input v-model="form.amount" type="text" class="form-control" placeholder="100,000" />
            </div>

            <!-- IBAN -->
            <div class="mb-4">
                <label class="form-label">IBAN</label>
                <input v-model="form.iban" type="text" class="form-control" placeholder="0000 0000 0000 0000" />
            </div>

            <!-- Card Holder Name -->
            <div class="mb-4">
                <label class="form-label">Card holder name</label>
                <input v-model="form.cardHolder" type="text" class="form-control"
                    placeholder="Enter card holder name" />
            </div>

            <!-- Transfer Date + Description -->
            <div class="row mb-4">
                <div class="col">
                    <label class="form-label">Transfer date</label>
                    <input v-model="form.date" type="text" class="form-control" placeholder="MM/YY" />
                </div>
                <div class="col">
                    <label class="form-label">Description</label>
                    <input v-model="form.description" type="text" class="form-control" placeholder="Description" />
                </div>
            </div>

            <!-- Buttons -->
            <div class="d-flex justify-content-between">
                <button type="button" @click="cancel"
                    class="btn btn-light border text-dark px-4 py-2 fw-bold">Cancel</button>
                <button type="submit" class="btn btn-success px-4 py-2 fw-bold">Transfer</button>
            </div>

        </form>
    </div>
</template>