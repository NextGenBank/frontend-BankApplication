// src/config.js
export const API_BASE_URL = "http://localhost:8080";

export const API_ENDPOINTS = {
  auth:        `${API_BASE_URL}/auth`,
  currentUser: `${API_BASE_URL}/api/user/me`,
  myAccounts:  `${API_BASE_URL}/api/accounts/my`,
  lookupIBAN:  `${API_BASE_URL}/api/accounts/lookup`,

  // <-- Обратите внимание здесь:
  // вместо старых веток ATM.deposit/ATM.withdraw у нас один ключ "transactions"
  transactions: `${API_BASE_URL}/api/transactions`
};
