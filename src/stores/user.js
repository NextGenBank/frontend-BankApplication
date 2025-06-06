import { defineStore } from "pinia";
import { setAuthToken } from "@/utils/auth";
import axios from "axios";
import { API_ENDPOINTS } from "@/config";

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
    async restoreFromToken() {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          setAuthToken(token);
          const res = await axios.get(API_ENDPOINTS.currentUser);
          this.user = res.data;
          this.isAuthenticated = true;
        } catch (error) {
          console.error("Failed to restore session:", error);
          this.logout();
        }
      }
    },
  },
});
