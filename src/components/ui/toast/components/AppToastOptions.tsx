import { type UseToastOptions } from "@chakra-ui/react";

import { AppToast } from "../index.ts";

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
