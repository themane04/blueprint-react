/**
 * Axios instance with:
 *  Cookie-based authentication (withCredentials)
 *  Automatic JWT refresh using /auth/refresh
 *  Queued request retry logic during token refresh
 *  Normalized frontend-friendly error objects for network, 404 and fallback errors
 *
 * This client is used across the entire app to ensure all requests share:
 *  consistent error handling
 *  automatic handling of expired access tokens
 *  transparent retry-after-refresh behavior
 */
import axios, { type AxiosError, type InternalAxiosRequestConfig } from "axios";

import { environment } from "../../config";
import { events } from "../../lib";
import { API_ENDPOINTS } from "./endpoints.ts";
import { FrontendError } from "./frontendError.ts";
import type { BackendErrorResponse } from "./types.ts";

const api = axios.create({
  baseURL: environment.backendApiUrl,
  withCredentials: true
});

/**
 * Tracks whether a token refresh request is already in progress.
 * Ensures multiple simultaneous 401 failures do NOT trigger multiple refresh calls.
 */
let isRefreshing = false;

/**
 * Queue of callbacks for requests waiting for the token refresh to finish.
 * Every request that hits 401 while refresh is ongoing is paused until refresh completes.
 */
let pendingRequests: ((tokenRefreshed: boolean) => void)[] = [];

/**
 * Global request interceptor:
 *  Sets 'Content-Type' to 'multipart/form-data' for FormData payloads
 *  Can be extended for additional global request logic (e.g., auth headers)
 *  Returns the modified config or rejects on error
 */
api.interceptors.request.use(
  (config) => {
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    }

    return config;
  },
  (error) => {
    throw error;
  }
);

/**
 * Global response interceptor:
 *  Handles network-level errors (no response)
 *  Detects expired access tokens (401 + AuthenticationFailed)
 *  Performs automatic refresh flow and retries original request
 *  Normalizes remaining backend errors into frontendError objects
 */
api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    if (!error.response) {
      throw new FrontendError("error:network");
    }

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    const status = error.response.status;
    const apiError = (error.response.data as BackendErrorResponse)?.error;

    if (status === 429 || apiError?.type === "Throttled") {
      const message = apiError?.detail?.detail ?? null;

      events.emit("throttled", {
        message,
        endpoint: originalRequest.url
      });

      throw new FrontendError("error:throttled", message ?? undefined);
    }

    const authEndpoints = API_ENDPOINTS.auth;

    const authBypass = [
      authEndpoints.login,
      authEndpoints.register,
      authEndpoints.logout,
      authEndpoints.refresh
    ];

    if (authBypass.some((p) => originalRequest.url?.includes(p))) {
      throw error;
    }

    const isExpired = status === 401 && apiError?.type === "AuthenticationFailed";

    /**
     * Handles expired access tokens:
     *  Ensures refresh happens only once at a time
     *  Queues any additional failed requests until refresh completes
     *  Retries original request after successful refresh
     *  Rejects queued requests if refresh fails
     */
    if (isExpired && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingRequests.push((success) => {
            if (success) resolve(api(originalRequest));
            else reject(new FrontendError("error:unexpected"));
          });
        });
      }

      isRefreshing = true;

      try {
        isRefreshing = false;

        pendingRequests.forEach((cb) => cb(true));
        pendingRequests = [];

        return api(originalRequest);
      } catch {
        isRefreshing = false;

        pendingRequests.forEach((cb) => cb(false));
        pendingRequests = [];

        throw new FrontendError("error:unexpected");
      }
    }

    /**
     * Known backend errors (ValidationError, AuthenticationFailed)
     * are passed through unchanged so they can be handled by the calling UI layer.
     */
    if (
      apiError?.type === "ValidationError" ||
      apiError?.type === "AuthenticationFailed" ||
      apiError?.type === "UnhandledError"
    ) {
      throw error;
    }
    if (status === 404) {
      throw new FrontendError("error:notFound");
    }

    /**
     * Fallback frontend error.
     * Used when the backend returns an unexpected error structure.
     */
    throw new FrontendError("error:unexpected");
  }
);

export default api;
