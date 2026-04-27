/** Production environment configuration. */

const backendApiUrl: string = import.meta.env.VITE_BACKEND_API_URL as string;

export const environment = {
  backendApiUrl: backendApiUrl
};
