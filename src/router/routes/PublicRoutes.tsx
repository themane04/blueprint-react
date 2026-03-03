import type { RouteObject } from "react-router-dom";

import { Homepage } from "../../pages/homepage/Homepage.tsx";

import paths from "./paths.ts";

/** Public routes that can be accessed without authentication. */
export const publicRoutes: RouteObject[] = [
  {
    path: paths.public.root,
    element: <Homepage />
  }
];
