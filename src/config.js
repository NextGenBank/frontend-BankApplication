export const API_BASE_URL = "http://localhost:8080";

export const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/auth`,
  currentUser: `${API_BASE_URL}/api/user/me`,
  myAccounts: `${API_BASE_URL}/api/accounts/my`,
  lookupIBAN: `${API_BASE_URL}/api/accounts/lookup`,

  /* Employee */
  usersByStatus: (status) => `${API_BASE_URL}/api/employees/customers/status?status=${status}`,
  approveUser: (userId) => `${API_BASE_URL}/api/employees/customers/${userId}/approve`,
  rejectUser: (userId) => `${API_BASE_URL}/api/employees/customers/${userId}/reject`
};
