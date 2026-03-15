import type { JSX } from "react";
import { RouterProvider } from "react-router-dom";

import { useServiceWorker } from "./hooks";
import router from "./router";

export const App = (): JSX.Element => {
  useServiceWorker();

  return <RouterProvider router={router} />;
};
