import type { ReactNode } from "react";

import type { TOAST_STATUS_COLORS } from "../../../theme/constants.ts";

export type AppToastProps = {
  status?: keyof typeof TOAST_STATUS_COLORS;
  description: ReactNode;
};
