import { type UseToastOptions } from "@chakra-ui/react";

import { AppToast } from "../index.ts";

/**
 * Default toast configuration used by useI18nToast.
 * Centralises duration, position, and the custom AppToast renderer
 * so all toasts across the app share the same appearance.
 * @returns A UseToastOptions object with the shared toast configuration.
 */
export const AppToastOptions = (): UseToastOptions => ({
  duration: 3000,
  position: "top",
  render: ({ status, description }) => (
    <AppToast
      status={status}
      description={description}
    />
  )
});
