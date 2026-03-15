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
import axios, { type AxiosError } from "axios";

import { environment } from "../../config";
import { events } from "../../lib";

import { FrontendError } from "./frontendError.ts";
import type { BackendErrorResponse } from "./types.ts";

const api = axios.create({
  baseURL: environment.backendApiUrl,
  withCredentials: true
});

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

  (error: AxiosError) => {
    if (!error.response) {
      throw new FrontendError("error:network");
    }

    const status = error.response.status;
    const apiError = (error.response.data as BackendErrorResponse)?.error;

    if (status === 429 || apiError?.type === "Throttled") {
      const message = apiError?.detail?.detail ?? null;

      events.emit("throttled", {
        message,
        endpoint: error.config?.url
      });

      throw new FrontendError("error:throttled", message ?? undefined);
    }

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

    throw new FrontendError("error:unexpected");
  }
);

export default api;
