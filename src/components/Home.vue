<script>
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
import Loading from "@/components/Loading.vue"; 

export default {
  components: { Loading },
  setup() {
    const userStore = useUserStore();
    const isLoaded = ref(false);

    onMounted(() => {
      setTimeout(() => {
        isLoaded.value = true;
      }, 100); // slight delay to ensure userStore is ready
    });

    return { userStore, isLoaded };
  },
};
</script>

<template>
  <div class="container py-5 text-center">
    <h1 class="mb-4 fw-bold">Welcome to NextGenBank!</h1>

    <!-- Use loading spinner -->
    <Loading v-if="!isLoaded" />

    <!-- Show PENDING message -->
    <div
      v-else-if="userStore.user?.role === 'CUSTOMER' && userStore.user?.status === 'PENDING'"
      class="card mx-auto shadow-sm"
      style="max-width: 500px; border-radius: 15px; background-color: #f0f9ff;"
    >
      <div class="card-body">
        <h5 class="card-title text-primary fw-bold">Account Pending Approval</h5>
        <p class="card-text">
          Your account is currently under review. Please wait until an employee approves it.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: #1b4332;
}
</style>
