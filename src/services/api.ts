import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: '/api', // Using Vite proxy for development
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Request ID counter for logging
let requestId = 0;

/**
 * REQUEST INTERCEPTOR
 * - Ensures credentials (cookies) are sent with requests
 * - Adds request ID for tracking
 * - Logs requests in development
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Ensure credentials (cookies) are sent with requests
    config.withCredentials = true;

    // Add request ID for tracking
    config.headers['X-Request-ID'] = `req_${++requestId}_${Date.now()}`;

    // Log requests in development
    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, {
        requestId: config.headers['X-Request-ID'],
        data: config.data,
      });
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 * - Logs responses in development
 * - Handles global authentication errors (401, 403)
 * - Handles rate limiting (429)
 * - Handles server errors (500+)
 * - Provides user-friendly error messages
 */
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log successful responses in development
    if (import.meta.env.DEV) {
      console.log(
        `[API Response] ${response.config.method?.toUpperCase()} ${response.config.url}`,
        {
          status: response.status,
          requestId: response.config.headers['X-Request-ID'],
          data: response.data,
        }
      );
    }
    return response;
  },
  (error: AxiosError) => {
    const status = error.response?.status;
    const url = error.config?.url;
    const requestId = error.config?.headers['X-Request-ID'];

    // Log errors
    console.error(`[API Error] ${error.config?.method?.toUpperCase()} ${url}`, {
      status,
      requestId,
      message: error.message,
      response: error.response?.data,
    });

    // Handle specific error cases
    if (status === 401 || status === 403) {
      // Authentication/Authorization errors
      console.warn('[API] Authentication failed');
      // Redirect is intentionally disabled so feature modules can handle auth failures gracefully.
    } else if (status === 429) {
      // Rate limiting
      console.warn('[API] Rate limit exceeded');
      // The error message from backend will be shown to user
    } else if (status && status >= 500) {
      // Server errors
      console.error('[API] Server error occurred');
      // Could show a global error notification here
    } else if (error.code === 'ECONNABORTED') {
      // Timeout
      console.error('[API] Request timeout');
    } else if (!error.response) {
      // Network error
      console.error('[API] Network error - server might be down');
    }

    return Promise.reject(error);
  }
);

export default api;
