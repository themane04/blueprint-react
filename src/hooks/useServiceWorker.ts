import { useEffect } from "react";

/**
 * Registers a service worker from the specified path when the window loads.
 * @param path - The path to the service worker file. Defaults to "/service-worker.js".
 */
export function useServiceWorker(path: string = "/service-worker.js"): void {
  /** Registers the service worker on window load event. */
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    const registerSW = (): void => {
      navigator.serviceWorker
        .register(path)
        .catch((err) => console.error("SW registration failed:", err));
    };

    window.addEventListener("load", registerSW);

    return (): void => {
      window.removeEventListener("load", registerSW);
    };
  }, [path]);
}
