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
      errors: {},
      error: null,
      isLoading: false,
      success: null,
    };
  },
  methods: {
    toggleAuthMode() {
      this.isLogin = !this.isLogin;
      this.resetForm();
    },
    resetForm() {
      this.formData = {
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        confirm_password: "",
        bsn: "",
        phone: "",
      };
      this.errors = {};
      this.error = null;
      this.success = null;
      this.isLoading = false;
    },
    async handleSubmit() {
      this.errors = {};
      this.error = null;
      this.success = null;
      const userStore = useUserStore();

      if (!this.isLogin && this.formData.password !== this.formData.confirm_password) {
        this.error = "Passwords do not match";
        return;
      }

      try {
        this.isLoading = true;

        let response;
        if (this.isLogin) {
          response = await axios.post(`${API_ENDPOINTS.auth}/login`, {
            email: this.formData.email,
            password: this.formData.password,
          });
        } else {
          response = await axios.post(`${API_ENDPOINTS.auth}/register`, {
            firstName: this.formData.first_name,
            lastName: this.formData.last_name,
            email: this.formData.email,
            password: this.formData.password,
            bsn: this.formData.bsn,
            phone: this.formData.phone,
          });
        }

        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          setAuthToken(response.data.token);
          userStore.setUser(response.data.user);
        }

        this.success = this.isLogin
          ? "Login successful"
          : "Registration successful! You can now log in.";

        if (this.isLogin && response.data.user) {
          const { role, status } = response.data.user;

          if (role === "CUSTOMER" && status === "APPROVED") {
            this.$router.push("/customerDashboard");
          } else if (role === "CUSTOMER") {
            this.$router.push("/");
          } else if (role === "EMPLOYEE") {
            this.$router.push("/employeeDashboard");
          } else {
            this.$router.push("/");
          }
        } else {
          this.toggleAuthMode();
        }
      } catch (err) {
        if (err.response?.status === 400 && err.response.data) {
          const data = err.response.data;

          if (typeof data === "object" && data.error) {
            this.error = data.error; // example: { error: "Email already registered" }
          } else if (typeof data === "object") {
            this.errors = data; // validation errors
          } else {
            this.error = data; // fallback
          }
        } else {
          this.error = "Authentication error";
        }
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <Loading v-if="isLoading" />
  <Notification v-if="success" :isError="false" @close="success = null">{{ success }}</Notification>

  <div class="container d-flex align-items-center justify-content-center min-vh-100">
    <div class="card shadow-lg p-4" style="width: 100%; max-width: 500px; border-radius: 20px;">
      <h2 class="text-center mb-4 fw-bold">{{ isLogin ? "Login" : "Register" }}</h2>

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
            <div v-if="errors.firstName" class="text-danger small">{{ errors.firstName }}</div>
          </div>

          <div class="mb-3">
            <label class="form-label fw-semibold">Last Name</label>
            <input v-model="formData.last_name" type="text" class="form-control" required />
            <div v-if="errors.lastName" class="text-danger small">{{ errors.lastName }}</div>
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Email</label>
          <input v-model="formData.email" type="email" class="form-control" required />
          <div v-if="errors.email" class="text-danger small">{{ errors.email }}</div>
        </div>

        <div class="mb-3">
          <label class="form-label fw-semibold">Password</label>
          <input v-model="formData.password" type="password" class="form-control" required />
          <div v-if="errors.password" class="text-danger small">{{ errors.password }}</div>
        </div>

        <div v-if="!isLogin" class="mb-3">
          <label class="form-label fw-semibold">Confirm Password</label>
          <input v-model="formData.confirm_password" type="password" class="form-control" required />
        </div>

        <div v-if="!isLogin" class="mb-3">
          <label class="form-label fw-semibold">BSN</label>
          <input v-model="formData.bsn" type="text" class="form-control" required />
          <div v-if="errors.bsn" class="text-danger small">{{ errors.bsn }}</div>
        </div>

        <div v-if="!isLogin" class="mb-3">
          <label class="form-label fw-semibold">Phone Number</label>
          <input v-model="formData.phone" type="tel" class="form-control" required />
          <div v-if="errors.phone" class="text-danger small">{{ errors.phone }}</div>
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
