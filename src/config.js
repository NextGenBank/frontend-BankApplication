// src/config/index.js
export const API_BASE_URL = "http://localhost:8080";

export const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/auth`,
  currentUser: `${API_BASE_URL}/api/user/me`,
  myAccounts: `${API_BASE_URL}/api/accounts/my`,
  lookupIBAN: `${API_BASE_URL}/api/accounts/lookup`,

  // ATM endpoints
  deposit:  `${API_BASE_URL}/api/atm/deposit`,
  withdraw: `${API_BASE_URL}/api/atm/withdraw`
};
