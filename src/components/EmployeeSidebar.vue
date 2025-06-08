<template>
  <aside class="w-72 bg-green-200 p-6 flex flex-col justify-between min-h-screen">
    <div>
      <h2 class="text-white text-2xl font-bold mb-6">Overview</h2>
      <ul class="space-y-3">
        <li><router-link to="/employeedashboard" class="sidebar-link" active-class="active-link">Dashboard</router-link>
        </li>
        <li><router-link to="/employeetransactions" class="sidebar-link"
            active-class="active-link">Transactions</router-link></li>
        <li><router-link to="/employeetransfer" class="sidebar-link" active-class="active-link">Transfer</router-link>
        </li>
        <li><router-link to="/employeecustomers" class="sidebar-link" active-class="active-link">Customers</router-link>
        </li>
        <li><router-link to="/employeecreateaccount" class="sidebar-link" active-class="active-link" exact>Create
            account</router-link></li>
        <li><router-link to="/employeepending" class="sidebar-link" active-class="active-link">Pending Accounts</router-link>
        </li>
        <li><router-link to="/employeeapproved" class="sidebar-link" active-class="active-link">Approved Accounts</router-link>
        </li>
        <li><router-link to="/employeerejected" class="sidebar-link" active-class="active-link">Rejected Accounts</router-link>
        </li>
      </ul>
    </div>
    <button class="bg-red-600 text-white py-2 px-5 rounded mt-10" @click="handleLogout">Logout</button>


  </aside>
</template>

<script>
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

export default {
  setup() {
    const userStore = useUserStore();
    const router = useRouter();

    onMounted(() => {
      const token = localStorage.getItem("token");
      if (token && !userStore.isAuthenticated) {
        userStore.restoreFromToken(); // ensure full user object is restored
      }
    });

    const handleLogout = () => {
      userStore.logout();
      router.push("/auth");
    };

    return {
      userStore,
      handleLogout,
    };
  },
};
</script>

<style scoped>
.sidebar-link {
  display: block;
  width: 100%;
  padding: 0.5rem 1.25rem;
  background-color: white;
  border-radius: 0.5rem;
  text-align: left;
  transition: background-color 0.3s, color 0.3s;
}

.sidebar-link:hover {
  background-color: #86efac;
  /* Light green on hover */
}

.active-link {
  background-color: #16a34a;
  /* Darker green */
  color: white;
}
</style>
