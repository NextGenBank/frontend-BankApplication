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
      setAuthToken(null);
    },
    restoreFromToken() {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token);
        this.isAuthenticated = true;
      }
    },
  },
});
