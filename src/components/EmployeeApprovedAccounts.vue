<script setup>
import EmployeeStatusAccounts from '@/components/EmployeeStatusAccounts.vue'
import EmployeeSidebar from './EmployeeSidebar.vue';
</script>

<template>
  <div class="flex min-h-screen">
    <EmployeeSidebar />
    <div class="flex-1">
      <EmployeeStatusAccounts status="APPROVED" title="Approved Accounts" :showActions="false" />
    </div>
  </div>
</template>