<script>
import axios from 'axios'
import { API_ENDPOINTS } from '@/config.js'

export default {
    data() {
        return {
            form: { toIban: '', amount: null },
            message: '',
            success: false
        }
    },
    methods: {
        reset() {
            this.form.toIban = ''
            this.form.amount = null
        },
        async submit() {
            try {
                const resp = await axios.post(
                    `${API_ENDPOINTS.switchFunds().replace('/switch', '/transfer')}`,
                    {
                        fromIban: this.form.fromIban,
                        toIban: this.form.toIban,
                        amount: this.form.amount,
                    },
                    {
                        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    }
                )
                this.message = 'Transfer successful!'
                this.success = true
                this.reset()
            } catch (err) {
                this.message = err.response?.data?.error || err.response?.data?.message || 'Transfer failed.'
                this.success = false
            }
        }
    }
}
</script>

<template>
    <div class="p-6 rounded shadow bg-white max-w-md mx-auto">
        <h2 class="text-xl font-semibold mb-4 text-center">Transfer To Another IBAN</h2>

        <form @submit.prevent="submit">
            <div class="space-y-4">
                <div>
                    <label class="block text-sm font-medium">From (Checking):</label>
                    <input type="text" disabled value="Your Checking Account"
                        class="mt-1 block w-full rounded border px-3 py-2 bg-gray-100">
                </div>
                <div>
                    <label for="toIban" class="block text-sm font-medium">To IBAN</label>
                    <input v-model="form.toIban" id="toIban" type="text" required
                        class="mt-1 block w-full rounded border px-3 py-2" />
                </div>
                <div>
                    <label for="amount" class="block text-sm font-medium">Amount (€)</label>
                    <input v-model.number="form.amount" id="amount" type="number" min="0.01" step="0.01" required
                        class="mt-1 block w-full rounded border px-3 py-2" />
                </div>
            </div>

            <div class="mt-6 flex justify-end gap-4">
                <button type="button" @click="reset" class="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Send</button>
            </div>
        </form>

        <div v-if="message" :class="success ? 'text-green-600 text-center' : 'text-red-600 text-center'" class="mt-4">
            {{ message }}
        </div>
    </div>
</template>
