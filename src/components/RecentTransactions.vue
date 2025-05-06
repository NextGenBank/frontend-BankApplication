<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-semibold mb-4 border-b pb-2">Recent Transactions</h3>
    <ul class="divide-y divide-gray-200">
      <li
        v-for="tx in transactions"
        :key="tx.id"
        class="py-2 flex justify-between items-center text-sm text-gray-700"
      >
        <span class="w-1/3 text-gray-500">{{ tx.date }}</span>
        <span class="w-1/3 font-medium">{{ tx.name }}</span>
        <span class="w-1/3 text-right font-semibold text-green-600">€{{ tx.amount }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const transactions = [
  { id: 1, date: '2025-04-28', name: 'Alice Johnson', amount: 200 },
  { id: 2, date: '2025-04-27', name: 'John Smith', amount: 340 },
  { id: 3, date: '2025-04-26', name: 'Emma Brown', amount: 120 },
]
</script>
