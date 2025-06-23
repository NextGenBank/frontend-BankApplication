<script>
import axios from 'axios'
import { API_ENDPOINTS } from '@/config'

export default {
    data() {
        return {
            form: {
                toAccount: '',
                amount: null
            },
            userIban: null,
            initiatorId: null,
            message: '',
            success: false
        }
    },
    methods: {
        async fetchUserData() {
            try {
                const resp = await axios.get(API_ENDPOINTS.currentUser, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                const user = resp.data
                this.initiatorId = user.userId

                // fetch accounts to get the CHECKING IBAN
                const accountsResp = await axios.get(API_ENDPOINTS.myAccounts, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                const checkingAccount = accountsResp.data.find(acc => acc.accountType === 'CHECKING')
                if (checkingAccount) {
                    this.userIban = checkingAccount.iban
                } else {
                    this.message = 'No checking account found.'
                    this.success = false
                }

            } catch (err) {
                this.message = 'Failed to load user account.'
                this.success = false
            }
        },
        async submitTransfer() {
            this.message = ''
            this.success = false

            try {
                const payload = {
                    accountNumber: this.userIban,
                    toAccount: this.form.toAccount,
                    amount: this.form.amount,
                    initiatorId: this.initiatorId
                }

                const resp = await axios.post(API_ENDPOINTS.transfer(), payload, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                })

                this.message = resp.data.message || 'Transfer completed successfully.'
                this.success = true
                this.resetForm()
            } catch (err) {
                this.message =
                    err.response?.data?.error ||
                    err.response?.data?.message ||
                    'Transfer failed.'
                this.success = false
            }
        },
        resetForm() {
            this.form.toAccount = ''
            this.form.amount = null
        }
    },
    mounted() {
        this.fetchUserData()
    }
}
</script>

<template>
    <div class="max-w-md mx-auto bg-white rounded-2xl shadow p-6 space-y-4">
        <h2 class="text-xl font-semibold text-center">Transfer to External IBAN</h2>

        <div v-if="userIban" class="text-sm text-gray-600 text-center">
            Your IBAN (from): <strong>{{ userIban }}</strong>
        </div>

        <form @submit.prevent="submitTransfer" class="space-y-4 mt-4">
            <div>
                <label class="block text-sm font-medium">Recipient IBAN</label>
                <input v-model="form.toAccount" type="text" placeholder="Enter destination IBAN"
                    class="w-full mt-1 px-4 py-2 border rounded" required />
            </div>

            <div>
                <label class="block text-sm font-medium">Amount</label>
                <input v-model.number="form.amount" type="number" min="0.01" step="0.01" placeholder="Enter amount"
                    class="w-full mt-1 px-4 py-2 border rounded" required />
            </div>

            <div class="flex justify-end gap-4 mt-6">
                <button type="button" @click="resetForm" class="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Transfer
                </button>
            </div>
        </form>

        <div v-if="message" :class="success ? 'text-green-600' : 'text-red-600'" class="text-center mt-4">
            {{ message }}
        </div>
    </div>
</template>