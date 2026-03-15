import type { AxiosError } from "axios";

import type { BackendErrorResponse } from "../../services/http";

import { backendMessageMap } from "./backendMessageMap.ts";
import type { FrontendError, Options } from "./types.ts";

/**
 * Type guard for FrontendError
 * @param err - The error to check
 * @returns True if the error is a FrontendError, false otherwise
 */
function isFrontendError(err: unknown): err is FrontendError {
  return (
    typeof err === "object" && err !== null && "frontendError" in err && "key" in err
  );
}

/**
 * Handles API errors and displays appropriate messages.
 * @param err - The error to handle
 * @param options - Options for handling the error
 * @returns False indicating the error was handled
 */
export function handleApiError(
  err: AxiosError<BackendErrorResponse> | FrontendError,
  options: Options
): void {
  const { showError, fieldErrorSetter, authFailedMessage } = options;

  if ((err as AxiosError)?.response?.status === 401) {
    return;
  }

  if (isFrontendError(err)) {
    showError(err.key);
    return;
  }

  const apiError = err.response?.data?.error;

  if (!apiError) {
    showError("error:unexpected");
    return;
  }

  if (apiError.type === "ValidationError" && apiError.fields) {
    Object.entries(apiError.fields).forEach(([field, messages]) => {
      const backendMsg = messages[0];
      const mapped = backendMessageMap[backendMsg];
      if (fieldErrorSetter) fieldErrorSetter(field);
      showError(mapped || "error:unexpected");
    });
    return;
  }

  if (apiError.type === "AuthenticationFailed") {
    showError(authFailedMessage || "auth:login.invalidCredentials");
    return;
  }

  if (apiError.type === "UnhandledError") {
    const raw = apiError.message?.trim();
    const mapped = raw ? backendMessageMap[raw] : null;
    showError(mapped || "error:unexpected");
    return;
  }

  showError("error:unexpected");
}
