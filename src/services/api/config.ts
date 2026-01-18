// Housing API Configuration
export const API_BASE_URL = 'http://housingms.runasp.net';

// Token storage key
export const AUTH_TOKEN_KEY = 'housing_api_token';

// Get stored token
export const getStoredToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Store token
export const storeToken = (token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

// Remove token
export const removeToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

// Default headers for API requests
export const getDefaultHeaders = (): HeadersInit => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  const token = getStoredToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};
