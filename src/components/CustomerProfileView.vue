<script>
import axios from "axios";
import ProfileCard from './CustomerProfileCard.vue';
import AccountBalance from './CustomerAccountBalance.vue';
import { API_ENDPOINTS } from '@/config';

export default {
    name: "CustomerProfileView",
    components: {
        ProfileCard,
        AccountBalance
    },
    data() {
        return {
            user: null,
            accounts: [],
            isLoading: true,
        };
    },
    async created() {
        try {
            const { data: userData } = await axios.get(API_ENDPOINTS.currentUser);
            this.user = {
                name: `${userData.firstName} ${userData.lastName}`,
                email: userData.email,
                phone: userData.phoneNumber,
                bsn: userData.bsn
            };

            const { data: accounts } = await axios.get(API_ENDPOINTS.myAccounts);
            this.accounts = accounts;
        } catch (error) {
            console.error("Failed to load profile:", error);
            alert("Unable to load profile data. Please log in again.");
        } finally {
            this.isLoading = false;
        }
    }
};
</script>

<template>
    <div class="p-4" v-if="!isLoading && user">
        <div class="d-flex justify-content-between align-items-center mb-4">
            <div>
                <h1 class="fw-bold mb-1">Profile</h1>
                <p class="text-success">{{ user.bsn }}</p>
            </div>
        </div>

        <div class="row g-4">
            <div class="col-md-4">
                <ProfileCard :name="user.name" :email="user.email" :phone="user.phone" :bsn="user.bsn" />
            </div>
            <div class="col-md-8">
                <AccountBalance :accounts="accounts" />

                <div class="mt-4 text-end">
                    <router-link to="/CustomerTransferFundsForm">
                        <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                            Transfer Internal Funds
                        </button>
                    </router-link>
                </div>
                <div class="mt-4 text-end">
                    <router-link to="/CustomerTransferToIbanForm">
                        <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                            Transfer External Funds
                        </button>
                    </router-link>
                </div>
            </div>

        </div>
    </div>

    <div v-else class="text-center py-5">
        <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
</template>
