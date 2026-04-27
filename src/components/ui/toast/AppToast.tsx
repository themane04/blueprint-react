import { Alert, AlertDescription, Icon } from "@chakra-ui/react";
import type { JSX } from "react";

import type { AppToastProps } from "./types.ts";
import { toastStatusColors, toastStatusIcons } from "./utils";

/**
 * Custom toast notification component rendered by AppToastOptions.
 * Displays a status icon and translated description inside a styled Alert.
 * @param props - The toast props. See AppToastProps for the full type definition.
 * @returns A styled Alert containing a status icon and description.
 */
export const AppToast = (props: AppToastProps): JSX.Element => {
  const { status = "info", description } = props;

  const color = toastStatusColors[status];
  const IconComponent = toastStatusIcons[status];

  return (
    <Alert
      bg="red.500"
      borderRadius="sm"
      gap={1}
      boxShadow="md"
      alignItems="center"
    >
      {/* Status icon */}
      <Icon
        as={IconComponent}
        fill={color}
      />

      {/* Message */}
      <AlertDescription
        color="white"
        fontSize="sm"
      >
        {description}
      </AlertDescription>
    </Alert>
  );
};
