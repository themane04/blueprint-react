import "@chakra-ui/react";
import "react";

declare module "@chakra-ui/react" {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- interface required for declaration merging into chakra-ui module
  interface IconProps {
    variant?: string;
  }
}
