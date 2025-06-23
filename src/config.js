// src/config/index.js
export const API_BASE_URL = "http://localhost:8080";

export const API_ENDPOINTS = {
  auth: `${API_BASE_URL}/auth`,
  currentUser: `${API_BASE_URL}/api/user/me`,
  myAccounts: `${API_BASE_URL}/api/accounts/my`,
  lookupIBAN: `${API_BASE_URL}/api/accounts/lookup`,
  lookupAllIbans: `${API_BASE_URL}/api/accounts/all-iban-users`,

  transfer: () => `${API_BASE_URL}/api/transactions/transfer`,

  // ATM endpoints
  atm: `${API_BASE_URL}/api/transactions/atm`,

  // Employee endpoints
  usersByStatus: status => `${API_BASE_URL}/api/employees/status?status=${status}`,
  approveUser: id => `${API_BASE_URL}/api/employees/approve/${id}`,
  rejectUser: id => `${API_BASE_URL}/api/employees/reject/${id}`,
  switchFunds: () => `${API_BASE_URL}/api/transactions/switch`,
  externalTransfer: () => `${API_BASE_URL}/api/transactions/external-transfer`
};
