import { defineStore } from "pinia";
import { setAuthToken } from "@/utils/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    isAuthenticated: false,
  }),
  actions: {
    setUser(user) {
      this.user = user;
      this.isAuthenticated = true;
    },
    logout() {
      this.user = null;
      this.isAuthenticated = false;
      localStorage.removeItem("token");
      setAuthToken(null); // clear token from Axios headers
    },
  },
});
