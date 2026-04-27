import { AppLayout } from "../../layouts";
import { publicRoutes } from "../routes";
import { paths } from "../routes/utils";

/** The root route for the main application area. */
export const publicRoot = {
  path: paths.public.root,
  element: <AppLayout />,
  children: publicRoutes
};
