<script>
import Notification from "./Notification.vue";
import Loading from "./Loading.vue";
import { setAuthToken } from "@/utils/auth";
import { useUserStore } from "@/stores/user";
import { API_ENDPOINTS } from "@/config";
import axios from "axios";

export default {
  name: "Auth",
  components: {
    Notification,
    Loading,
  },
  data() {
    return {
      isLogin: true,
      formData: {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        bsn: "",
        phone: "",
      },
      error: null,
      isLoading: false,
      success: null,
    };
  },
  methods: {
    toggleAuthMode() {
      this.isLogin = !this.isLogin;
      this.error = null;
      this.success = null;
      this.isLoading = false;
      this.formData = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        bsn: "",
        phone: "",
      };
    },
    async handleSubmit() {
      const userStore = useUserStore();

      // Validate password match before sending to backend
      if (!this.isLogin && this.formData.password !== this.formData.confirm_password) {
        this.error = "Passwords do not match";
        return;
      }

      try {
        this.error = null;
        this.success = null;
        this.isLoading = true;

        let response;

        if (this.isLogin) {
          // Login request
          response = await axios.post(`${API_ENDPOINTS.auth}/login`, {
            email: this.formData.email,
            password: this.formData.password,
          });
        } else {
          // Register request (don't send confirm_password)
          response = await axios.post(`${API_ENDPOINTS.auth}/register`, {
            firstName: this.formData.first_name,
            lastName: this.formData.last_name,
            email: this.formData.email,
            password: this.formData.password,
            bsn: this.formData.bsn,
            phone: this.formData.phone,
          });
        }

        this.success = this.isLogin
          ? "Login successful"
          : "Registration successful! You can now log in.";

        // Handle token and user info after login
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setAuthToken(response.data.token);
          userStore.setUser(response.data.user);
        }

        if (this.isLogin) {
          this.$router.push("/");
        } else {
          this.toggleAuthMode(); // switch to login mode after register
        }
      } catch (error) {
        console.error(error);
        this.error = error.response?.data?.message || "Authentication error";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <Loading v-if="isLoading" />

  <Notification v-if="success" :isError="false" @close="success = null">
    {{ success }}
  </Notification>

  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card shadow-lg p-4" style="width: 100%; max-width: 500px; border-radius: 20px;">
      <h2 class="text-center mb-4 fw-bold">
        {{ isLogin ? "Login" : "Register" }}
      </h2>

      <p class="text-center">
        <button class="btn btn-link text-decoration-none" @click="toggleAuthMode">
          {{ isLogin ? "Need an account?" : "Already have an account?" }}
        </button>
      </p>

      <form @submit.prevent="handleSubmit">
        <div v-if="!isLogin">
          <div class="mb-3">
            <label class="form-label fw-semibold">First Name</label>
            <input v-model="formData.first_name" type="text" class="form-control" required />
          </div>
          <div class="mb-3">
            <label class="form-label fw-semibold">Last Name</label>
            <input v-model="formData.last_name" type="text" class="form-control" required />
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Email</label>
          <input v-model="formData.email" type="email" class="form-control" required />
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Password</label>
          <input v-model="formData.password" type="password" class="form-control" required />
        </div>

        <div v-if="!isLogin" class="mb-3">
          <label class="form-label fw-semibold">Confirm Password</label>
          <input v-model="formData.confirm_password" type="password" class="form-control" required />
        </div>

        <div v-if="!isLogin" class="mb-3">
          <label class="form-label fw-semibold">BSN</label>
          <input v-model="formData.bsn" type="text" class="form-control" required />
        </div>

        <div v-if="!isLogin" class="mb-3">
          <label class="form-label fw-semibold">Phone Number</label>
          <input v-model="formData.phone" type="tel" class="form-control" required />
        </div>

        <button type="submit" class="btn btn-success w-100 btn-lg">
          {{ isLogin ? "Login" : "Register" }}
        </button>
      </form>

      <Notification v-if="error" :isError="true" @close="error = null" class="mt-3">
        {{ error }}
      </Notification>
    </div>
  </div>
</template>

<style scoped></style>
