import { AppLayout } from "../../layouts/AppLayout.tsx";
import paths from "../routes/paths.ts";
import { publicRoutes } from "../routes/PublicRoutes.tsx";

/** The root route for the main application area. */
const publicRoot = {
  path: paths.public.root,
  element: <AppLayout />,
  children: publicRoutes
};

export default publicRoot;
