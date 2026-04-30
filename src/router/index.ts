import { createBrowserRouter } from "react-router-dom";

import { catchAllRoot, notFoundRoot, publicRoot } from "./roots";

/** The main router configuration for the application. */
export const router = createBrowserRouter([publicRoot, notFoundRoot, catchAllRoot]);
