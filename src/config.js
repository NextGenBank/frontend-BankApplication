export const API_BASE_URL = "http://localhost:8080";

export const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/auth`,
  currentUser: `${API_BASE_URL}/api/user/me`,
  myAccounts: `${API_BASE_URL}/api/accounts/my`,
  lookupIBAN: `${API_BASE_URL}/api/accounts/lookup`,

  usersByStatus: status => `${API_BASE_URL}/api/employees/status?status=${status}`,
  approveUser: id => `${API_BASE_URL}/api/employees/approve/${id}`,
  rejectUser: id => `${API_BASE_URL}/api/employees/reject/${id}`,
  switchFunds: () => `${API_BASE_URL}/api/transactions/switch`
};
