import type { JSX } from "react";
import { Outlet } from "react-router-dom";

/**
 * Root layout wrapper applied to all app routes.
 * @returns A fragment containing the header and the active route outlet.
 */
export const AppLayout = (): JSX.Element => {
  return <Outlet />;
};
