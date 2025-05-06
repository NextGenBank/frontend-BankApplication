<script setup>
import ProfileCard from './CustomerProfileCard.vue'
import AccountBalance from './CustomerAccountBalance.vue'

const user = {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '+31 6 12345678',
    bsn: '9999999999',
    profilePicture: 'https://randomuser.me/api/portraits/men/1.jpg'
}

const transactions = [
    { name: 'Name', date: 'Date', amount: -10000 },
    { name: 'Name', date: 'Date', amount: 10000 },
    { name: 'Name', date: 'Date', amount: -10000 },
    { name: 'Name', date: 'Date', amount: 10000 },
    { name: 'Name', date: 'Date', amount: -10000 },
    { name: 'Name', date: 'Date', amount: 10000 },
]
</script>

<template>
    <div class="d-flex">
        <Sidebar />
        <div class="flex-grow-1 p-4">

            <div class="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1 class="fw-bold mb-1">Profile</h1>
                    <p class="text-success">1234567890</p>
                </div>

                <div class="d-flex align-items-center gap-3">
                    <input type="text" placeholder="Search" class="form-control" style="width: 200px;" />
                    <i class="bi bi-bell fs-4"></i>
                    <img :src="user.profilePicture" class="rounded-circle"
                        style="width: 40px; height: 40px; object-fit: cover;" />
                </div>
            </div>

            <div class="row g-4">
                <div class="col-md-4">
                    <ProfileCard :name="user.name" :email="user.email" :phone="user.phone" :bsn="user.bsn"
                        :profilePicture="user.profilePicture" />
                </div>

                <div class="col-md-8">
                    <AccountBalance :balance="44500" />
                    <TransactionList :transactions="transactions" />
                </div>
            </div>

        </div>
    </div>
</template>