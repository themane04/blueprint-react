import type { JSX } from "react";
import { Outlet } from "react-router-dom";

export const AppLayout = (): JSX.Element => {
  return <Outlet />;
};
