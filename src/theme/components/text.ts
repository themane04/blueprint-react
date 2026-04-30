import { defineStyleConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";

export const Text = defineStyleConfig({
  baseStyle: (props) => ({
    color: mode("gray.800", "gray.100")(props)
  })
});
