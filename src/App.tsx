import type { JSX } from "react";
import { RouterProvider } from "react-router-dom";

import { useServiceWorker } from "./hooks";
import { router } from "./router";

/**
 * Root application component.
 * Bootstraps auth state on mount by calling /me.
 * Shows a splash screen until auth check is complete.
 * @returns The router with all the pages
 */
export const App = (): JSX.Element => {
  useServiceWorker();

  return <RouterProvider router={router} />;
};
