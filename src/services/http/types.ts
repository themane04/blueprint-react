/** Normalized shape of backend error responses. Feel free to adjust based on your backend */
export type BackendErrorResponse = {
  error?: {
    type?: string;
    detail?: {
      detail?: string;
    };
    fields?: Record<string, string[]>;
    message?: string;
  };
};

/**
 * Normalized shape of backend success message responses.
 * Used for endpoints that return a simple message upon success.
 */
export type BackendMessageResponse = {
  message: string;
};

/**
 * Generic type for successful API responses.
 * Wraps the actual data returned from the backend.
 */
export type SuccessResponse<T> = {
  success: boolean;
  data: T;
};
