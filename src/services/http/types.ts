/**
 * Normalized shape of backend error responses.
 *
 * Structure matches all API error formats:
 *  `type`: high-level error category (e.g. ValidationError, AuthenticationFailed)
 *  `detail`: optional descriptive message for non-field errors
 *  `fields`: optional dictionary of field-specific validation messages
 *  `message`: optional general error message
 *
 * The structure uses optional properties because backend error objects
 * may vary depending on the endpoint and error context.
 */
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
