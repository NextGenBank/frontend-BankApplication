<script>
import { useUserStore } from "@/stores/user";
import { onMounted } from "vue";

export default {
  setup() {
    const userStore = useUserStore();

    // restore auth state on page reload if token exists
    onMounted(() => {
      const token = localStorage.getItem("token");
      if (token && !userStore.isAuthenticated) {
        // opt, fetch user data from backend if needed
        userStore.isAuthenticated = true;
      }
    });

    const handleLogout = () => {
      userStore.logout();
    };

    return {
      userStore,
      handleLogout,
    };
  },
};
</script>

<template>
  <!-- Hide navbar if user is EMPLOYEE (they use sidebar instead) -->
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light"
    v-if="!userStore.user || userStore.user.role !== 'EMPLOYEE'"
  >
    <div class="container-fluid">
      <RouterLink to="/" class="navbar-brand">NextGenBank</RouterLink>

      <div class="navbar-nav ms-auto">
        <template v-if="userStore.isAuthenticated">
          <RouterLink class="nav-item nav-link" to="/customerdashboard">Dashboard</RouterLink>
          <RouterLink class="nav-item nav-link" to="/customertransactions">Transactions</RouterLink>
          <RouterLink class="nav-item nav-link" to="/customerprofile">Profile</RouterLink>
          <button class="nav-item nav-link btn btn-link" @click="handleLogout">Logout</button>
        </template>

        <template v-else>
          <RouterLink class="nav-item nav-link" to="/auth">Login/Register</RouterLink>
        </template>
      </div>
    </div>
  </nav>

  <div class="container">
    <main>
      <RouterView />
    </main>
  </div>
</template>
