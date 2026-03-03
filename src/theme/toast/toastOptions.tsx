import { type UseToastOptions } from "@chakra-ui/react";

import { AppToast } from "../../components/ui/toast";

export const toastOptions: UseToastOptions = {
  duration: 3000,
  position: "top",

  render: ({ status, description }) => (
    <AppToast
      status={status}
      description={description}
    />
  )
};
