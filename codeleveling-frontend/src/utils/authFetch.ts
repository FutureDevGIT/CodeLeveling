// src/utils/authFetch.ts

import { getAccessToken, getRefreshToken, setTokens, logoutUser } from './auth';

export const authFetch = async (url: string, options: RequestInit = {}) => {
  let token = getAccessToken();

  const authHeaders = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
  };

  let response = await fetch(url, { ...options, headers: authHeaders });

  // If access token expired, try refresh
  if (response.status === 401) {
    const refreshToken = getRefreshToken();

    if (refreshToken) {
        const refreshResponse = await fetch('http://localhost:8000/api/token/refresh/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        const refreshData = await refreshResponse.json();

        if (refreshResponse.ok && refreshData.access) {
          setTokens(refreshData.access, refreshToken);
          response = await fetch(url, {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${refreshData.access}`,
            },
          });
        } else {
          logoutUser();
          throw new Error('Session expired. Please log in again.');
        }
      } else {
        logoutUser();
        throw new Error('No refresh token available. Please log in again.');
      }
    }

    return response;
  };