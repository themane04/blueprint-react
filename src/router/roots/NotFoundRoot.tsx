import { Text } from "@chakra-ui/react";

import { paths } from "../routes/utils";

/** The route for the Not Found page, displayed when a user navigates to an undefined route. */
export const notFoundRoot = {
  path: paths.notFound,
  element: (
    <Text>
      Page not found! (Remember to replace this text with a fancy page :) -
      src/router/roots/NotFoundRoot.tsx)
    </Text>
  )
};
