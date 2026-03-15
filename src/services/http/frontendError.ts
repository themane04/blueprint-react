/** Custom error class for frontend-specific errors. */
export class FrontendError extends Error {
  frontendError = true;
  key: string;
  details?: string;

  constructor(key: string, message?: string) {
    super(message ?? key);
    this.key = key;
    this.details = message;
    this.name = "FrontendError";
  }
}
