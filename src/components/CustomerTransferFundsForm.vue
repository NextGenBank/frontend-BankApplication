<script>
import axios from 'axios'
import { API_ENDPOINTS } from '@/config.js'

export default {
    data() {
        return {
            form: {
                from: 'CHECKING',
                amount: null
            },
            message: '',
            success: false
        }
    },
    methods: {
        resetForm() {
            this.form.amount = null;
            this.form.from = 'CHECKING';
        },
        async submitForm() {
            try {
                const response = await axios.post(API_ENDPOINTS.switchFunds(), {
                    from: this.form.from,
                    amount: this.form.amount
                }, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                const { checkingBalance, savingsBalance } = response.data;

                this.message = `Transfer completed successfully. Updated balances - Checking: €${checkingBalance.toFixed(2)}, Savings: €${savingsBalance.toFixed(2)}`;
                this.success = true;
                this.resetForm();
            } catch (error) {
                this.message = error.response?.data?.message || 'Transfer failed.';
                this.success = false;
            }
        }
    }
}
</script>

<template>
    <div class="max-w-md mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 class="text-xl font-semibold text-center">Switch Funds</h2>

        <form @submit.prevent="submitForm">
            <div class="space-y-4">
                <div>
                    <label for="from" class="block text-sm font-medium">Transfer From</label>
                    <select v-model="form.from" id="from" class="mt-1 block w-full rounded border px-3 py-2">
                        <option value="CHECKING">Checking Account</option>
                        <option value="SAVINGS">Savings Account</option>
                    </select>
                </div>

                <div>
                    <label for="amount" class="block text-sm font-medium">Amount</label>
                    <input v-model.number="form.amount" id="amount" type="number" min="0.01" step="0.01" required
                        class="mt-1 block w-full rounded border px-3 py-2" />
                </div>
            </div>

            <div class="mt-6 flex justify-end gap-4">
                <button type="button" @click="resetForm" class="px-4 py-2 rounded bg-gray-200">Cancel</button>
                <button type="submit"
                    class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">Transfer</button>
            </div>
        </form>

        <div v-if="message" :class="{ 'text-green-600': success, 'text-red-600': !success }" class="mt-4 text-center">
            {{ message }}
        </div>
    </div>
</template>