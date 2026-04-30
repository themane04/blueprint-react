import type { ReactNode } from "react";

import type { toastStatusColors } from "./utils";

export type AppToastProps = {
  status?: keyof typeof toastStatusColors;
  description: ReactNode;
};
